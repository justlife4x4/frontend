import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react"
import { Modal, NavLink } from "react-bootstrap"
import { useFormik } from "formik"
import { toast } from "react-toastify"
import { X } from "react-feather"

import { HotelId } from "../../App"
import { employeeSchema } from "../../schemas"
import AccessLevelSelect from "../AccessLevelSelect"
import useFetchWithAuth from "../useFetchWithAuth"


// Start:: form
const EmployeeForm = ({ pAccessLevels, pId, pName, pAddress, pMobile, pEmail, onSubmited, onClosed }) => {
    const hotelId = useContext(HotelId)
    const inputRef = useRef()
    const [validateOnChange, setValidateOnChange] = useState(false)
    const { loading, error, doUpdate } = useFetchWithAuth({
        url: `/employees/${hotelId}/${pId}`
    })

    useEffect(() => {
        !loading && inputRef.current.focus()
        
        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 27) {
                onClosed()
            }
        })

        return () => {
            document.removeEventListener('keydown', onClosed)
        }
    }, [])


    const { values, errors, touched, setFieldValue, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            keyInputAccessLevels: pAccessLevels,
            keyInputName: pName,
            keyInputAddress: pAddress,
            keyInputMobile: pMobile,
            keyInputEmail: pEmail
        },
        validationSchema: employeeSchema,
        onSubmit: async (values) => {
            const payload = {   
                'accessLevels': values.keyInputAccessLevels,
                'name': values.keyInputName.toUpperCase(), 
                'address': values.keyInputAddress.toUpperCase(), 
                'mobile': values.keyInputMobile.toString(), 
                'email': values.keyInputEmail.toLowerCase()
            }

            await doUpdate(payload)
        
            if (error === null) {
                resetForm()
                onSubmited()
            } else {
                toast.error(error)
            }
        }
    })

    const handleClose = () => {
        setValidateOnChange(false)
        resetForm()
        onClosed()
    }

    return (
        <form>
            <Modal.Body>
                <div className="row mb-2">
                    <div className="col-12">
                        <label className="form-label" 
                            htmlFor="keyInputAccessLevels">Role</label>

                        <AccessLevelSelect
                            name = { 'keyInputAccessLevels' }
                            value = { values.keyInputAccessLevels } 
                            disabled ={ true } 
                            onChange={ (value) => { setFieldValue('keyInputAccessLevels', value) } }/>

                        { errors.keyInputAccessLevels && 
                            touched.keyInputAccessLevels ? 
                                (<small className="text-danger">{ errors.keyInputAccessLevels }</small>) : 
                                    null }
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-12">
                        <label className="form-label" 
                            htmlFor="keyInputName">Name</label>

                        <input 
                            type="text" 
                            id="keyInputName"
                            className="form-control"
                            placeholder="Name" 
                            autoComplete="off"
                            maxLength = { 100 }
                            disabled = { true }
                            value = { values.keyInputName } 
                            onChange = { handleChange } />

                        { errors.keyInputName && 
                            touched.keyInputName ? 
                                (<small className="text-danger">{ errors.keyInputName }</small>) : 
                                    null }
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-12">
                        <label className="form-label" 
                            htmlFor="keyInputAddress">Address</label>

                        <textarea 
                            id="keyInputAddress"
                            placeholder="Address"
                            className="form-control"
                            rows = { "5" }
                            maxLength = { "256" }
                            disabled = { loading || error !== null }
                            ref = { inputRef }
                            value = { values.keyInputAddress } 
                            onChange = { handleChange } />

                    { errors.keyInputAddress && 
                        touched.keyInputAddress ? 
                            (<small className="text-danger">{ errors.keyInputAddress }</small>) : 
                                null }
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" 
                            htmlFor="keyInputBed">Mobile no.</label>

                        <input 
                            type="number"
                            id="keyInputMobile"
                            className="form-control"
                            placeholder="Mobile no." 
                            autoComplete="off"
                            maxLength = { 256 }
                            disabled = { loading || error !== null }
                            value = { values.keyInputMobile } 
                            onChange = { handleChange } />

                        { errors.keyInputMobile && 
                            touched.keyInputMobile ? 
                                (<small className="text-danger">{ errors.keyInputMobile }</small>) : 
                                    null }
                    </div>

                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" 
                            htmlFor="keyInputEmail">Email</label>

                        <input 
                            type="text"
                            id="keyInputEmail"
                            className="form-control"
                            placeholder="Email" 
                            maxLength = { 100 }
                            disabled = { loading || error !== null }
                            value = { values.keyInputEmail } 
                            onChange = { handleChange } />

                        { errors.keyInputEmail && 
                            touched.keyInputEmail ? 
                                (<small className="text-danger">{ errors.keyInputEmail }</small>) : 
                                    null }
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-danger"
                    disabled = { loading }
                    onClick = { handleClose } >
                    Close
                </button>
                
                <button 
                    type="button"
                    className="btn btn-success"
                    disabled = { loading } 
                    onClick = { handleSubmit } >

                    { !loading && "Confirm" }
                    { loading && 
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Working
                                </> }
                </button>
            </Modal.Footer>
        </form> 
    )
}
// End:: form


// Start:: Component
const EmployeeEdit = forwardRef(( props, ref ) => {    
    const hotelId = useContext(HotelId)
    const [showModal, setShowModal] = useState(false)
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/employees/${hotelId}/${props.pId}`
    })

    useEffect(() => {
        showModal && doFetch()
        error && toast.error(error)
    }, [props.pId, showModal])


    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        props.onClosed()
    }

    const handleSave = () => { 
        setShowModal(false)
        props.onEdited()
    }

    useImperativeHandle(ref, () => {
        return {
            handleShowModal
        }
    })

    return (
        <>
            {/* Start:: Edit modal */}
            { data &&
                <Modal 
                    show = { showModal } >

                    <Modal.Header>
                        <Modal.Title>Edit employee</Modal.Title>
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal}>
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>

                    <EmployeeForm 
                        pId = { data._id }    
                        pAccessLevels = { data.accessLevels }
                        pName = { data.name }
                        pAddress = { data.address }
                        pMobile = { data.mobile }
                        pEmail = { data.email }
                        onSubmited = { handleSave } 
                        onClosed = { handleCloseModal } />
                    
                </Modal>}
            {/* End:: Edit modal */}
        </>
    );
})
// End:: Component

export default EmployeeEdit