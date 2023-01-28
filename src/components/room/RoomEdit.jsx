import { React, useContext, useEffect, useState } from 'react';
import { Modal, NavLink } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { X, Edit3 } from 'react-feather';

import { HotelId } from '../../App';
import { roomSchema } from '../../schemas';
import RoomCategorySelect from '../RoomCategorySelect';
import useFetchWithAuth from '../useFetchWithAuth';

import 'react-toastify/dist/ReactToastify.css';

// Start:: form
const RoomForm = ({ pId, pCategoryId, pNo, pTariff, pDiscount, pBed, pPerson, onSubmited, onClose }) => {
    const hotelId = useContext(HotelId);
    const { loading, error, doUpdate } = useFetchWithAuth({
        url: `/rooms/${hotelId}/${pId}`
    });

    const { values, errors, handleBlur, handleChange, touched, setFieldValue, handleSubmit } = useFormik({
        initialValues: {
            keyInputCategoryId: pCategoryId,
            keyInputNo: pNo,
            keyInputTariff: pTariff,
            keyInputDiscount: pDiscount,
            keyInputBed: pBed,   
            keyInputPerson: pPerson
        },
        validationSchema: roomSchema,
        onSubmit: async (values, action) => {
            const payload = {   
                                'categoryId': values.keyInputCategoryId,
                                'no': values.keyInputNo.toUpperCase(), 
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
                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor="keyInputCategoryName">Category</label>
                        <RoomCategorySelect
                            name={'keyInputCategoryName'}
                            value={values.keyInputCategoryId} 
                            disabled={true} 
                            onChange={(value) => {setFieldValue('keyInputCategoryId', value)}}/>
                    </div>

                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor="keyInputNo">Room No.</label>
                        <input 
                            type='text' 
                            id='keyInputNo'
                            placeholder='Room no.' 
                            className='form-control'
                            disabled={true}
                            value={values.keyInputNo} />
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor="keyInputTariff">Tariff</label>
                        <input 
                            type='number' 
                            id='keyInputTariff'
                            placeholder='Tariff'
                            className='form-control'
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
                            type='number' 
                            id='keyInputDiscount'
                            placeholder='Maximum discount'
                            className='form-control'
                            disabled={loading || error !== null}
                            value={values.keyInputDiscount} 
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        
                        {errors.keyInputDiscount && 
                            touched.keyInputDiscount ? 
                                (<small className="text-danger">{ errors.keyInputDiscount }</small>) : 
                                    null}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor="keyInputBed">Extra bed tariff</label>
                        <input 
                            type='number'
                            id='keyInputBed'
                            placeholder='Extra bed tariff'
                            className='form-control'
                            disabled={loading || error !== null}
                            value={values.keyInputBed} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.keyInputBed && 
                            touched.keyInputBed ? 
                                (<small className="text-danger">{errors.keyInputBed}</small>) : 
                                    null}
                    </div>

                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor="keyInputPerson">Extra person tariff</label>
                        <input 
                            type='number'
                            id='keyInputPerson'
                            placeholder='Extra person tariff'
                            className='form-control'
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
                    className='btn btn-danger'
                    type='button'
                    disabled={loading}
                    onClick={(e) => {onClose(e)}} >
                    Close
                </button>
                
                <button 
                    className='btn btn-success'
                    type='button'
                    disabled={loading} 
                    onClick={handleSubmit} >

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
const RoomEdit = ({ pId, onEdited }) => {
    const hotelId = useContext(HotelId);
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/rooms/${hotelId}/${pId}`
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
                show={showModal}>

                <Modal.Header>
                    <Modal.Title>Edit room</Modal.Title>
                    <NavLink 
                        className="nav-icon" href="#" 
                        onClick={(e) => {handleCloseModal()} }>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>

                {data &&
                    <RoomForm 
                        pId={pId}    
                        pCategoryId={data.categoryId}
                        pNo={data.no}
                        pTariff={data.tariff}
                        pDiscount={data.maxDiscount}
                        pBed={data.extraBedTariff}
                        pPerson={data.extraPersonTariff}
                        onSubmited={handleSave} 
                        onClose={handleCloseModal} />}
            </Modal>
            {/* End:: Edit modal */}

            <ToastContainer
                position = 'bottom-right'
                theme = 'colored'
                autoClose = {5000}
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

export default RoomEdit;