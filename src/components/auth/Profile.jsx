import {React, useContext, useEffect, useState} from 'react';
import {Modal, NavLink} from 'react-bootstrap';
import {useFormik} from 'formik';
import {ToastContainer, toast} from 'react-toastify';
import {X, User} from 'react-feather';

import {HotelId} from '../../App';
import {employeeSchema} from '../../schemas';
import AccessLevelSelect from '../AccessLevelSelect';
import useFetchWithAuth from '../useFetchWithAuth';

import 'react-toastify/dist/ReactToastify.css';

const CloseButton = ({closeToast}) => (
    <i className="material-icons"
      onClick={closeToast}>
    </i>
  );

// Start:: form
const ProfileForm = ({pAccessLevelId, pId, pName, pAddress, pMobile, pEmail, onSubmited, onClose}) => {
    const hotelId = useContext(HotelId);
    const {loading, error, doUpdate} = useFetchWithAuth({
        url: `/employees/${hotelId}/${pId}`
    });

    const {values, errors, handleBlur, handleChange, touched, setFieldValue, handleSubmit} = useFormik({
        initialValues: {
            keyInputAccessLevelId: pAccessLevelId,
            keyInputName: pName,
            keyInputAddress: pAddress,
            keyInputMobile: pMobile,
            keyInputEmail: pEmail
        },
        validationSchema: employeeSchema,
        onSubmit: async (values, action) => {
            const payload = {   
                                'accessLevelId': values.keyInputAccessLevelId,
                                'name': values.keyInputName.toUpperCase(), 
                                'address': values.keyInputAddress.toUpperCase(), 
                                'mobile': values.keyInputMobile.toString(), 
                                'email': values.keyInputEmail.toLowerCase()
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
                    <div className="col-12">
                        <label className="form-label" htmlFor="keyInputAccessLevelName">Access level</label>
                        <AccessLevelSelect
                            name={'keyInputAccessLevelId'}
                            value={values.keyInputAccessLevelId} 
                            disabled={true} 
                            onChange={(value) => {setFieldValue('keyInputAccessLevelId', value)}}/>

                        {errors.keyInputAccessLevelId && 
                            touched.keyInputAccessLevelId ? 
                                (<small className="text-danger">{errors.keyInputAccessLevelId}</small>) : 
                                    null}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-12">
                        <label className="form-label" htmlFor="keyInputName">Name</label>
                        <input 
                            type="text" 
                            id="keyInputName"
                            placeholder="Name" 
                            className="form-control"
                            disabled={true}
                            value={values.keyInputName} />

                        {errors.keyInputName && 
                            touched.keyInputName ? 
                                (<small className="text-danger">{errors.keyInputName}</small>) : 
                                    null}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-12">
                        <label className="form-label" htmlFor="keyInputAddress">Address</label>
                        <textarea 
                            id="keyInputAddress"
                            placeholder="Address"
                            className="form-control"
                            rows={"5"}
                            disabled={loading || error !== null}
                            value={values.keyInputAddress} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                    {errors.keyInputAddress && 
                        touched.keyInputAddress ? 
                            (<small className="text-danger">{errors.keyInputAddress}</small>) : 
                                null}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor="keyInputBed">Mobile no.</label>
                        <input 
                            type="number"
                            id="keyInputMobile"
                            placeholder="Mobile no." 
                            className="form-control"
                            disabled={loading || error !== null}
                            value={values.keyInputMobile} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.keyInputMobile && 
                            touched.keyInputMobile ? 
                                (<small className="text-danger">{ errors.keyInputMobile }</small>) : 
                                    null}
                    </div>

                    <div className="col-xs-12 col-md-6">
                        <label className="form-label" htmlFor="keyInputEmail">Email</label>
                        <input 
                            type="text"
                            id="keyInputEmail"
                            placeholder="Email" 
                            className="form-control"
                            disabled={loading || error !== null}
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
                    type="reset"
                    className="btn btn-danger"
                    disabled={loading}
                    onClick={(e) => {onClose(e)}} >
                    Close
                </button>
                
                <button 
                    className="btn btn-success"
                    type="button"
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
const Profile = ({pEmployeeId, onEdited}) => {
    const hotelId = useContext(HotelId);
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/employees/${hotelId}/${pEmployeeId}`
    });

    useEffect(() => {
        doFetch();
    }, [pEmployeeId]);

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading, pEmployeeId, showModal]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        toast.success('Data successfully updated');
        setShowModal(false);
        onEdited();
    }

    return (
        <div className="text-left">

            {/* Start:: Profile link */}
			<a className="dropdown-item" href="#" onClick={handleShowModal}>
                <User size={16}/>
				&nbsp;Profile
			</a>
            {/* End:: Profile link */}

            {/* Start:: Edit modal */}
            <Modal 
                show={showModal}>

                <Modal.Header>
                    <Modal.Title>Profile</Modal.Title>
                    <NavLink 
                        className="nav-icon" href="#" 
                        onClick={(e) => {handleCloseModal()}}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>

                {data && 
                    <ProfileForm 
                        pId={pEmployeeId}    
                        pAccessLevelId={data.accessLevelId}
                        pName={data.name}
                        pAddress={data.address}
                        pMobile={data.mobile}
                        pEmail={data.email}
                        onSubmited={handleSave} 
                        onClose={handleCloseModal} />
                }
            </Modal>
            {/* End:: Edit modal */}

            {/* Start :: display message */}
            <ToastContainer
                position="bottom-right"
                theme="colored"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={true}
                rtl={false}
                closeButton={CloseButton}
                pauseOnFocusLoss
                pauseOnHover/>
            {/* End :: display message */}

        </div>  
    );
}
// End:: Component

export default Profile;