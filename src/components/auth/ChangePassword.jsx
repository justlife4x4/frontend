import React, { useContext, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Modal, NavLink } from "react-bootstrap";
import { toast } from "react-toastify";
import { X, Key } from "react-feather";

import { HotelId } from "../../App";
import { useStateContext } from "../../contexts/ContextProvider";
import { changePasswordSchema } from "../../schemas";
import useFetchWithAuth from "../useFetchWithAuth";


// Start:: form
const ChangePasswordForm = ({pEmployeeId, onSubmited, onClose}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const inputRef = useRef();
    const { loading, error, doUpdate } = useFetchWithAuth({
        url: `${contextValues.changePasswordAPI}/${hotelId}/${pEmployeeId}`
    });
    
    useEffect(() => {
        !loading && inputRef.current.focus();
    }, [loading, error]);

    const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
        initialValues: {
            keyInputOldPassword: "",
            keyInputNewPassword: "",
            keyInputReEnterNewPassword: "",
        },
        validationSchema: changePasswordSchema,
        onSubmit: async (values, action) => {
            const payload = {   
                            "oldPassword": values.keyInputOldPassword, 
                            "newPassword": values.keyInputNewPassword 
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
        <form onSubmit={handleSubmit}>
            <Modal.Body>
                <div className="row mb-3">
                    <div className="col-12">
                        <label className="form-label" 
                            htmlFor="keyInputOldPassword">Old password</label>
                        
                        <input
                            type="password" 
                            name="keyInputOldPassword"
                            placeholder="old password"
                            className="form-control"
                            autoComplete="off"
                            maxLength={100}
                            ref={inputRef}
                            disabled={loading}
                            value={values.keyInputOldPassword}
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.keyInputOldPassword && 
                            touched.keyInputOldPassword ? 
                                (<small className="text-danger">{ errors.keyInputOldPassword }</small>) : 
                                    null}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12">
                        <label className="form-label" 
                                htmlFor={"keyInputNewPassword"}>New password</label>
                        <input 
                            type="password" 
                            name={"keyInputNewPassword"}
                            placeholder="new password"
                            className="form-control"
                            autoComplete="off"
                            maxLength={100}
                            disabled={loading}
                            value={values.keyInputNewPassword} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.keyInputNewPassword && 
                            touched.keyInputNewPassword ? 
                                (<small className="text-danger">{errors.keyInputNewPassword}</small>) : 
                                    null}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12">
                        <label className="form-label" 
                                htmlFor={"keyInputReEnterNewPassword"}>Re enter new password</label>
                        <input 
                            type="password" 
                            name={"keyInputReEnterNewPassword"}
                            placeholder="re enter new password"
                            className="form-control"
                            autoComplete="off"
                            maxLength={100}
                            disabled={loading}
                            value={values.keyInputReEnterNewPassword} 
                            onChange={handleChange}
                            onBlur={handleBlur} />

                        {errors.keyInputReEnterNewPassword && 
                            touched.keyInputNewPassword ? 
                                (<small className="text-danger">{errors.keyInputReEnterNewPassword}</small>) : 
                                    null}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button 
                    type="reset"
                    className="btn btn-danger"
                    disabled={loading}
                    onClick={onClose} >
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
const ChangePassword = ({pEmployeeId, onEdited}) => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error, doChangePassword } = useFetchWithAuth({
        url: `${contextValues.changePasswordAPI}/${hotelId}/${pEmployeeId}`
    });
    
    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading, pEmployeeId, showModal]);

    const {values, errors, handleBlur, handleChange, touched, handleSubmit} = useFormik({
        initialValues: {
            keyInputOldPassword: "",
            keyInputNewPassword: "",
            keyInputReEnterNewPassword: "",
        },
        validationSchema: changePasswordSchema,
        onSubmit: async (values, action) => {
            const payload = {   
                            "oldPassword": values.keyInputOldPassword, 
                            "newPassword": values.keyInputNewPassword 
                        };

            await doChangePassword(payload)

            if (error === null) {
                action.resetForm();
                handleSave();
            } else {
                toast.error(error);
            }
        }
    });

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        toast.success("Data successfully updated");
        setShowModal(false);
        onEdited();
    };

    return (
        <div className="text-left">
            {/* Start:: Change password link */}
			<a className="dropdown-item" href="#" onClick={handleShowModal}>
				<Key size={16}/>
				&nbsp;Change password
			</a>
            {/* End:: Change password link */}

            {/* Start:: Mod modal */}
            <Modal 
                show={showModal}>
                <Modal.Header>
                    <Modal.Title>Change password</Modal.Title>
                    <NavLink className="nav-icon" href="#" onClick={handleCloseModal}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>

                <ChangePasswordForm
                    pEmployeeId={pEmployeeId}
                    onSubmited={handleSave} 
                    onClose={handleCloseModal} />
            </Modal>
            {/* End:: Mod modal */}

        </div>  
    );
};
// End:: Component

export default ChangePassword