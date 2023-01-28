import { React, useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Modal, NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { X, Paperclip } from 'react-feather';

import { HotelId } from '../../App';
import { employeeSchema } from '../../schemas';
import AccessLevelSelect from '../AccessLevelSelect';
import useFetchWithAuth from '../useFetchWithAuth';

import 'react-toastify/dist/ReactToastify.css';

// Start:: form
const EmployeeForm = ({ onSubmited, onClose }) => {
    const hotelId = useContext(HotelId);
    const [add, setAdd] = useState(true);
    const { loading, error, doInsert } = useFetchWithAuth({
        url: `/employees/${hotelId}`
    });

    const { values, errors, handleBlur, handleChange, touched, setFieldValue, handleSubmit, resetForm } = useFormik({
        initialValues: {
            keyInputAccessLevels: '',
            keyInputName: '',
            keyInputAddress: '',
            keyInputMobile: '',
            keyInputEmail: ''
        },
        validationSchema: employeeSchema,
        onSubmit: async (values, action) => {
            const payload = {   
                            'accessLevels': values.keyInputAccessLevels, 
                            'name': values.keyInputName.toUpperCase(), 
                            'address': values.keyInputAddress.toUpperCase(), 
                            'mobile': values.keyInputMobile.toString(), 
                            'email': values.keyInputEmail.toLowerCase() 
                        };
                        
            await doInsert(payload);
        
            if (error === null) {
                action.resetForm();
                onSubmited();
            } else {
                toast.error(error);
            }
        }
    });

    const handleClose = () => {
        console.log("close");
        resetForm(); 
        setAdd(false); 
        onClose();
    }

    return (
        <>
            {add &&
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="row mb-3">
                            <div className="col-12">
                                <label className="form-label" 
                                        htmlFor={"keyInputAccessLevels"}>Access level</label>

                                <AccessLevelSelect 
                                    name={"keyInputAccessLevels"}
                                    onChange={(value) => {setFieldValue("keyInputAccessLevels", value)}} />

                                {errors.keyInputAccessLevelId && 
                                    touched.keyInputAccessLevels ? 
                                        (<small className="text-danger">{errors.keyInputAccessLevels}</small>) : 
                                            null}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12">
                                <label className="form-label" 
                                    htmlFor={"keyInputName"}>Name</label>

                                <input 
                                    type="text" 
                                    name={"keyInputName"}
                                    placeholder="Name"
                                    className="form-control"
                                    autoComplete="off"
                                    maxLength={100}
                                    disabled={loading} 
                                    value={values.keyInputName} 
                                    onChange={handleChange}
                                    onBlur={handleBlur} />

                                {errors.keyInputName && 
                                    touched.keyInputName ? 
                                        (<small className="text-danger">{errors.keyInputName}</small>) : 
                                            null}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12">
                                <label className="form-label" 
                                        htmlFor={"keyInputAddress"}>Address</label>
                                <textarea
                                    name={"keyInputAddress"}
                                    rows={"5"}
                                    placeholder="Address"
                                    className="form-control"
                                    autoComplete="off"
                                    maxLength={1000}
                                    disabled={loading}
                                    value={values.keyInputAddress} 
                                    onChange={handleChange}
                                    onBlur={handleBlur} />

                                {errors.keyInputAddress && 
                                    touched.keyInputAddress ? 
                                        (<small className="text-danger">{errors.keyInputAddress}</small>) : 
                                            null}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-xs-12 col-md-6">
                                <label className="form-label" 
                                    htmlFor={"keyInputMobile"}>Mobile no.</label>
                                    
                                <input
                                    type="number"
                                    name={"keyInputMobile"}
                                    placeholder="Mobile no." 
                                    className="form-control"
                                    autoComplete="off"
                                    maxLength={10}
                                    disabled={loading}
                                    value={values.keyInputMobile} 
                                    onChange={handleChange}
                                    onBlur={handleBlur} />

                                { errors.keyInputMobile && 
                                    touched.keyInputMobile ? 
                                        (<small className="text-danger">{errors.keyInputMobile}</small>) : 
                                            null }
                            </div>

                            <div className="col-xs-12 col-md-6">
                                <label className="form-label" htmlFor={"keyInputEmail"}>Email</label>
                                <input 
                                    type="text"
                                    placeholder="Email" 
                                    className="form-control"
                                    autoComplete="off"
                                    name={"keyInputEmail"}
                                    maxLength={100}
                                    disabled={loading}
                                    value={values.keyInputEmail} 
                                    onChange={handleChange}
                                    onBlur={handleBlur} />

                                {errors.keyInputEmail && 
                                    touched.keyInputEmail ? 
                                        (<small className="text-danger">{errors.keyInputEmail}</small>) : 
                                            null}    
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button 
                            className="btn btn-danger"
                            disabled={loading}
                            onClick={handleClose} >
                            Close
                        </button>

                        <button 
                            type="submit"
                            className="btn btn-success"
                            disabled={loading} >

                            {!loading && "Confirm"}
                            {loading && 
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Working
                                </>}
                        </button>
                    </Modal.Footer>
                </form>}
        </>            
    );
};
// End:: form

// Start:: Component
const EmployeeAdd = ({ onAdded }) => {
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleSave = () => {
        onAdded();  
        setShowModal(false);
    }

    return (
        <div className="text-left">
            {/* Start:: Add buttom */}
            <OverlayTrigger
                overlay={<Tooltip>new</Tooltip>}>
                <button 
                    className="btn btn-info hover:drop-shadow-xl ml-2" 
                    size="md" 
                    onClick = {handleShowModal} >
                    <Paperclip className="feather-16"/>
                </button>
            </OverlayTrigger>
            {/* End:: Add buttom */}

            {/* Start:: Add modal */}
            <Modal 
                show={showModal} >

                <Modal.Header>
                    <Modal.Title>Add employee</Modal.Title>
                    <NavLink className="nav-icon" href="#" onClick={handleCloseModal}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>

                <EmployeeForm
                    onSubmited={handleSave} 
                    onClose={handleCloseModal}/>
            </Modal>
            {/* End:: Add modal */}

            <ToastContainer
                position="bottom-right"
                theme="colored"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover />

        </div>  
    );
}
// End:: Component

export default EmployeeAdd;