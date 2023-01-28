import { React, useContext, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Modal, NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { X, Paperclip } from 'react-feather';

import { HotelId } from '../../App';
import { roomCategorySchema } from '../../schemas';
import useFetch from '../useFetchWithAuth';

import 'react-toastify/dist/ReactToastify.css';

// Start:: form
const RoomCategoryForm = ({ onSubmited, onClose }) => {
    const hotelId = useContext(HotelId);
    const inputRef = useRef();

    const { loading, error, doInsert } = useFetch({
        method: 'GET',
        url: `/roomCategories/${hotelId}`
    });
    
    useEffect(() => {
        !loading && inputRef.current.focus()
    }, [error, loading]);
    
    const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
        initialValues: {
            keyInputName: '',
            keyInputTariff: 0 ,
            keyInputDiscount: 0,
            keyInputBed: 0,
            keyInputPerson: 0
        },
        validationSchema: roomCategorySchema,
        onSubmit: async (values, action) => {
            const payload = {   
                            'name': values.keyInputName, 
                            'tariff': parseFloat(Number.isNaN(values.keyInputTariff) ? 0 : values.keyInputTariff, 10), 
                            'maxDiscount': parseFloat(Number.isNaN(values.keyInputDiscount) ? 0 : values.keyInputDiscount, 10), 
                            'extraBedTariff': parseFloat(Number.isNaN(values.keyInputBed) ? 0 : values.keyInputBed, 10), 
                            'extraPersonTariff': parseFloat(Number.isNaN(values.keyInputPerson) ? 0 : values.keyInputPerson, 10),
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
        <form onSubmit={ handleSubmit }>
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
                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" 
                                htmlFor={"keyInputTariff"}>Tariff</label>
                        <input 
                            type="number" 
                            name={"keyInputTariff"}
                            placeholder="tariff"
                            className="form-control"
                            autoComplete="off"
                            maxLength={8}
                            disabled={loading}
                            value={values.keyInputTariff} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.keyInputTariff && 
                            touched.keyInputTariff ? 
                                (<small className="text-danger">{ errors.keyInputTariff }</small>) : 
                                    null}
                    </div>

                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" 
                            htmlFor={"keyInputDiscount"}>Maximum discount</label>

                        <input 
                            type="number" 
                            name={"keyInputDiscount"}
                            placeholder="maximum discount"
                            className="form-control"
                            autoComplete="off"
                            maxLength={8}
                            disabled={loading} 
                            value={values.keyInputDiscount} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.keyInputDiscount && 
                            touched.keyInputDiscount ? 
                                (<small className="text-danger">{errors.keyInputDiscount}</small>) : 
                                    null}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" 
                            htmlFor={"keyInputBed"}>Extra bed tariff</label>
                        
                        <input
                            type="number"
                            name={"keyInputBed"}
                            placeholder="extra bed tariff" 
                            className="form-control"
                            autoComplete="off"
                            maxLength={8}
                            disabled={loading}
                            value={values.keyInputBed} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.keyInputBed && 
                            touched.keyInputBed ? 
                                (<small className="text-danger">{errors.keyInputBed}</small>) : 
                                    null}
                    </div>

                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor={"keyInputPerson"}>Extra person tariff</label>
                        <input 
                            type="number"
                            name={"keyInputPerson"}
                            placeholder="extra person tariff" 
                            className="form-control"
                            autoComplete="off"
                            maxLength={8}
                            disabled={loading}
                            value={values.keyInputPerson} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.addPerson && 
                            touched.addPerson ? 
                                (<small className="text-danger">{errors.addPerson}</small>) : 
                                    null}    
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button 
                    className="btn btn-danger"
                    disabled={loading}
                    onClick={(e) => {onClose(e)}} >
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
        </form>                   
    );
};
// End:: form

// Start:: Component
const RoomCategoryAdd = ({ onAdded }) => {
    const [showModal, setShowModal] = useState(false);

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
                    name = {"keyButtonAdd"}
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
                    <Modal.Title>Add room category</Modal.Title>
                    <NavLink className="nav-icon" href="#" onClick={handleCloseModal}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>

                <RoomCategoryForm 
                    onSubmited={handleSave} 
                    onClose={handleCloseModal} />
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

export default RoomCategoryAdd;