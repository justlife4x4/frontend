import { React, useContext, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Modal, NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { X, Paperclip } from 'react-feather';

import { HotelId } from '../../App';
import { planSchema } from '../../schemas';
import useFetchWithAuth from '../useFetchWithAuth';

import 'react-toastify/dist/ReactToastify.css';


// Start:: form
const PlanForm = ({ onSubmited, onClose }) => {
    const hotelId = useContext(HotelId);
    const inputRef = useRef();
    const { loading, error, doInsert } = useFetchWithAuth({
        method: 'GET',
        url: `/plans/${hotelId}`
    });
    
    useEffect(() => {
        !loading && inputRef.current.focus()
    }, [error, loading]);
    
    const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
        initialValues: {
            keyInputName: '',
            keyInputDescription: ''
        },
        validationSchema: planSchema,
        onSubmit: async (values, action) => {
            const payload = {   
                            'name': values.keyInputName.toUpperCase(), 
                            'description': values.keyInputDescription, 
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

    return (
        <form onSubmit={handleSubmit}>
            <Modal.Body>
                <div className="row mb-3">
                    <div className="col-12">
                        <label className="form-label" 
                            htmlFor="keyInputName">Name</label>
                        
                        <input
                            type="text" 
                            name="keyInputName"
                            placeholder="name"
                            className="form-control"
                            autoComplete="off"
                            maxLength={100}
                            ref={inputRef}
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
                                htmlFor={"keyInputDescription"}>Description</label>
                        <textarea 
                            placeholder="description"
                            className="form-control"
                            autoComplete="off"
                            name={"keyInputDescription"}
                            rows={"5"}
                            maxLength={10000}
                            disabled={loading}
                            value={values.keyInputDescription} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.keyInputDescription && 
                            touched.keyInputDescription ? 
                                (<small className="text-danger">{errors.keyInputDescription}</small>) : 
                                    null}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button 
                    type="reset"
                    className="btn btn-danger"
                    disabled={loading}
                    onClick={(e) => {onClose(e)}} >
                    Close
                </button>

                <button 
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}>

                    {!loading && "Confirm"}
                    {loading && 
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Working
                        </>}
                </button>
            </Modal.Footer>
        </form>                   
    );
};
// End:: form

// Start:: Component
const PlanAdd = ({ onAdded }) => {
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
                    name={"keyButtonAdd"}
                    className="btn btn-info hover:drop-shadow-xl ml-2" 
                    size="md" 
                    onClick={handleShowModal}>
                    <Paperclip className="feather-16"/>
                </button>
            </OverlayTrigger>
            {/* End:: Add buttom */}

            {/* Start:: Add modal */}
            <Modal 
                show={showModal}>

                <Modal.Header>
                    <Modal.Title>Add plan</Modal.Title>
                    <NavLink className="nav-icon" href="#" onClick={handleCloseModal}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>

                <PlanForm 
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

export default PlanAdd;