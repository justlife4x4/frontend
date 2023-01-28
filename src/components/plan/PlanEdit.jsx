import { React, useContext, useEffect, useRef, useState } from 'react';
import { Modal, NavLink } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { X, Edit3 } from 'react-feather';

import { HotelId } from '../../App';
import { planSchema } from '../../schemas';
import useFetchWithAuth from '../useFetchWithAuth';

import 'react-toastify/dist/ReactToastify.css';


// Start:: form
const PlanForm = ({ pId, pName, pDescription, onSubmited, onClose }) => {
    const hotelId = useContext(HotelId);
    const inputRef = useRef();
    const { loading, error, doUpdate } = useFetchWithAuth({
        url: `/plans/${hotelId}/${pId}`
    });
    
    useEffect(() => {
        !loading && inputRef.current.focus()
    }, [loading, error]);

    const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
        initialValues: {
            keyInputName: pName,
            keyInputDescription: pDescription,
        },
        validationSchema: planSchema,
        onSubmit: async (values, action) => {
            const payload = {   
                                'name': values.keyInputName.toUpperCase(), 
                                'description': values.keyInputDescription 
                            };

            await doUpdate(payload);
        
            if (error === null) {
                action.resetForm();
                onSubmited();
            } else {
                toast.error(error);
            }
        }
    });

    return (
        <form>
            <Modal.Body>
                <div className="row mb-2">
                    <div className="col-xs-12 col-md-12">
                        <label className="form-label" 
                            htmlFor="keyInputName">Name</label>
                        
                        <input 
                            type="text" 
                            id="keyInputName"
                            placeholder="name"
                            className="form-control"
                            autoComplete="off"
                            maxLength={100}
                            value={values.keyInputName}
                            disabled={true}
                            onChange={handleChange}
                            onBlur={handleBlur} />

                    {errors.keyInputName && 
                        touched.keyInputName ? 
                            (<small className="text-danger">{errors.keyInputName}</small>) : 
                                null}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-12">
                        <label className="form-label" htmlFor="keyInputDescription">Description</label>
                        <textarea 
                            id="keyInputDescription"
                            placeholder="description"
                            className="form-control"
                            rows={"5"}
                            ref={inputRef}
                            disabled={loading || error !== null}
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
                    onClick={(e) => {onClose(e)}}>
                    Close
                </button>
                
                <button 
                    className="btn btn-success"
                    onClick={handleSubmit}
                    disabled={loading} >

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
const PlanEdit = ({ pId, onEdited }) => {
    const hotelId = useContext(HotelId);
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/plans/${hotelId}/${pId}`
    });

    useEffect(() => {
        doFetch();
    }, [pId]);

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading, pId, showModal]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        onEdited();
        setShowModal(false);
    }

    return (
        <div className="text-left">
            {/* Start:: Edit buttom */}
            <span 
                className="pr-5" 
                onClick={(e) => {handleShowModal()}}>
                <Edit3 className="feather-16 mr-3"/>Edit
            </span>
            {/* End:: Edit buttom */}

            {/* Start:: Edit modal */}
            <Modal 
                show={ showModal }>

                <Modal.Header>
                    <Modal.Title>Edit plan</Modal.Title>
                    <NavLink 
                        className="nav-icon" href="#" 
                        onClick={(e) => {handleCloseModal()}}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>

                { data &&
                    <PlanForm 
                        pId={pId}
                        pName={data.name}
                        pDescription={data.description}
                        onSubmited={handleSave} 
                        onClose={handleCloseModal} />
                }
            </Modal>
            {/* End:: Edit modal */}

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

export default PlanEdit;