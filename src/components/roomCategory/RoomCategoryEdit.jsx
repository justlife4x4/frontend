import { React, useContext, useEffect, useRef, useState } from 'react';
import { Modal, NavLink } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { X, Edit3 } from 'react-feather';

import { HotelId } from '../../App';
import { roomCategorySchema } from '../../schemas';
import useFetch from '../useFetchWithAuth';

import 'react-toastify/dist/ReactToastify.css';

// Start:: form
const RoomCategoryForm = ({ id, name, tariff, discount, bed, person, onSubmited, onClose }) => {
    const hotelId = useContext(HotelId);
    const inputRef = useRef();
    const { loading, error, doUpdate } = useFetch({
        url: `/roomCategories/${hotelId}/${id}`
    });
    
    useEffect(() => {
        !loading && inputRef.current.focus()
    }, [loading, error]);

    const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
        initialValues: {
            keyInputName: name,
            keyInputTariff: tariff,
            keyInputDiscount: discount,
            keyInputBed: bed,   
            keyInputPerson: person
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
                            onBlur = { handleBlur} />

                    {errors.keyInputName && 
                        touched.keyInputName ? 
                            (<small className="text-danger">{ errors.keyInputName }</small>) : 
                                null}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor="keyInputTariff">Tariff</label>
                        <input 
                            type="number" 
                            id="keyInputTariff"
                            placeholder="tariff"
                            className="form-control"
                            ref={inputRef}
                            disabled={loading || error !== null}
                            value={values.keyInputTariff} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                    {errors.keyInputTariff && 
                        touched.keyInputTariff ? 
                            (<small className="text-danger">{errors.keyInputTariff}</small>) : 
                                null}
                    </div>

                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor="keyInputDiscount">Maximum discount</label>
                        <input 
                            type="number" 
                            id="keyInputDiscount"
                            placeholder="discount" 
                            className="form-control"
                            disabled={loading || error !== null}
                            value={values.keyInputDiscount} 
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                        
                        {errors.keyInputDiscount && 
                            touched.keyInputDiscount ? 
                                (<small className="text-danger">{errors.keyInputDiscount}</small>) : 
                                    null}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor="keyInputBed">Extra bed tariff</label>
                        <input 
                            type="number"
                            id="keyInputBed"
                            placeholder="extra bed tariff" 
                            className="form-control"
                            disabled={loading || error !== null}
                            value={values.keyInputBed} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.keyInputBed && 
                            touched.keyInputBed ? 
                                (<small className="text-danger">{ errors.keyInputBed }</small>) : 
                                    null}
                    </div>

                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor="keyInputPerson">Extra person tariff</label>
                        <input 
                            type="number"
                            id="keyInputPerson"
                            placeholder="ext. person tariff" 
                            className="form-control"
                            disabled={loading || error !== null}
                            value={values.keyInputPerson} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.keyInputPerson && 
                            touched.keyInputPerson ? 
                                (<small className="text-danger">{ errors.keyInputPerson }</small>) : 
                                    null}
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button
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
const RoomCategoryEdit = ({ pId, onEdited }) => {
    const hotelId = useContext(HotelId);
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error, doFetch } = useFetch({
        url: `/roomCategories/${hotelId}/${pId}`
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
                    <Modal.Title>Edit room category</Modal.Title>
                    <NavLink 
                        className="nav-icon" href="#" 
                        onClick={(e) => {handleCloseModal()}}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>

                {data &&
                    <RoomCategoryForm 
                        id={pId}
                        name={data.name}
                        tariff={data.tariff}
                        discount= {data.maxDiscount}
                        bed={data.extraBedTariff}
                        person={data.extraPersonTariff}
                        onSubmited={handleSave} 
                        onClose={handleCloseModal} />}
            </Modal>
            {/* End:: Edit modal */}

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"/>
        </div>  
    );
}
// End:: Component

export default RoomCategoryEdit;