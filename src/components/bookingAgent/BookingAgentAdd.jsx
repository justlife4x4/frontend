import {React, useEffect, useRef, useState} from 'react';
import {Modal, NavLink, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {useFormik} from 'formik';
import {toast} from 'react-toastify';
import {X, Paperclip} from 'react-feather';

import {bookingAgentSchema} from '../../schemas';
import useFetchWithAuth from '../useFetchWithAuth';

// Start:: form
const BookingAgentForm = ({onSubmited, onClosed}) => {
    const inputRef = useRef();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const { loading, error, doInsert } = useFetchWithAuth({
        url: `/bookingAgents`
    });
    
    useEffect(() => {
        document.addEventListener('keydown', (event) => {
          if (event.keyCode === 27) {
            onClosed();
          }
        });
    
        return () => {
          document.removeEventListener('keydown', onClosed);
        };
    }, []);

    useEffect(() => {
        !loading && inputRef.current.focus();
    }, [loading]);
    
    const {values, errors, touched, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputName: '',
            keyInputDescription: ''
        },
        validationSchema: bookingAgentSchema,
        validateOnChange,
        onSubmit: async (values, action) => {
            setValidateOnChange(true);
            const payload = {   
                            'name': values.keyInputName.toUpperCase(), 
                            'description': values.keyInputDescription, 
                        };

            await doInsert(payload);
        
            if (error === null) {
                resetForm();
                onSubmited();
            } else {
                toast.error(error);
            }
        }
    });

    const handleClose = () => {
        setValidateOnChange(false);
        resetForm(); 
        onClosed();
    }

    return (
        <form>
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
                            onChange={handleChange} />

                        {errors.keyInputName && 
                            touched.keyInputName ? 
                                (<small className="text-danger">{errors.keyInputName}</small>) : null}
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
                            onChange={handleChange} />

                        {errors.keyInputDescription && 
                            touched.keyInputDescription ? 
                                (<small className="text-danger">{errors.keyInputDescription}</small>) : 
                                    null}
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button 
                    type="button"
                    className="btn btn-danger"
                    disabled={loading}
                    onClick={handleClose}>
                    Close
                </button>

                <button 
                    type="button"
                    className="btn btn-success"
                    disabled={loading}
                    onClick={handleSubmit}>

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
const BookingAgentAdd = ({onAdded, onClosed}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        onClosed();
    }

    const handleSave = () => {
        setShowModal(false);
        onAdded();  
    }

    return (
        <div className="text-left">
            {/* Start:: Add buttom */}
            <OverlayTrigger
                overlay={<Tooltip>new</Tooltip>}>
                <button 
                    type="button"
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
                    <Modal.Title>Add booking agent</Modal.Title>
                    <NavLink className="nav-icon" href="#" onClick={handleCloseModal}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>

                <BookingAgentForm 
                    onSubmited={handleSave} 
                    onClosed={handleCloseModal}/>
            </Modal>
            {/* End:: Add modal */}
        </div>  
    );
}
// End:: Component

export default BookingAgentAdd;