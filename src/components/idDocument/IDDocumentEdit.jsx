import {React, useEffect, useRef, useState} from 'react';
import {Modal, NavLink} from 'react-bootstrap';
import {useFormik} from 'formik';
import {toast} from 'react-toastify';
import {X, Edit3} from 'react-feather';

import {idDocumentSchema} from '../../schemas';
import useFetchWithAuth from '../useFetchWithAuth';

// Start:: form
const IDDocumentForm = ({pId, pName, pDescription, onSubmited, onClosed}) => {
    const inputRef = useRef();
    const [validateOnChange, setValidateOnChange] = useState(false);
    const {loading, error, doUpdate} = useFetchWithAuth({
        url: `/idDocuments/${pId}`
    });
    
    useEffect(() => {
        !loading && inputRef.current.focus();
        
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

    const {values, errors, touched, handleChange,  handleSubmit, resetForm} = useFormik({
        initialValues: {
            keyInputName: pName,
            keyInputDescription: pDescription,
        },
        validationSchema: idDocumentSchema,
        onSubmit: async (values) => {
            setValidateOnChange(true);
            const payload = {   
                                'name': values.keyInputName.toUpperCase(), 
                                'description': values.keyInputDescription
                            };

            await doUpdate(payload);
        
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
                <div className="row mb-2">
                    <div className="col-xs-12 col-md-12">
                        <label className="form-label" 
                            htmlFor="keyInputName">Name</label>
                        
                        <input 
                            type="text" 
                            id="keyInputName"
                            className="form-control"
                            placeholder="name"
                            autoComplete="off"
                            maxLength={100}
                            disabled={true}
                            value={values.keyInputName}
                            onChange={handleChange}/>

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
                            className="form-control"
                            placeholder="description"
                            rows={"5"}
                            maxLength={"256"}
                            ref={inputRef}
                            disabled={loading}
                            value={values.keyInputDescription} 
                            onChange={handleChange}/>

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
const IDDocumentEdit = ({pId, onEdited, onClosed}) => {
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/idDocuments/${pId}`
    });

    useEffect(() => {
        showModal && doFetch();
    }, [pId, showModal]);

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        onClosed();
    };

    const handleSave = () => {
        setShowModal(false);
        onEdited();
    }

    return (
        <div className="text-left">
            {/* Start:: Edit buttom */}
            <span 
                className="pr-5" 
                onClick={handleShowModal}>
                <Edit3 className="feather-16 mr-3"/>Edit
            </span>
            {/* End:: Edit buttom */}

            {/* Start:: Edit modal */}
            {data &&
                <Modal 
                    show={showModal}>

                    <Modal.Header>
                        <Modal.Title>Edit id document</Modal.Title>
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal}>
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    
                    <IDDocumentForm 
                        pId={pId}
                        pName={data.name}
                        pDescription={data.description}
                        onSubmited={handleSave} 
                        onClosed={handleCloseModal} />
                </Modal>}
            {/* End:: Edit modal */}
        </div>  
    );
}
// End:: Component

export default IDDocumentEdit;