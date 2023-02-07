import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react"
import { Modal, NavLink } from "react-bootstrap"
import { toast } from "react-toastify"
import { X } from "react-feather"

import { HotelId } from "../../App"
import useFetchWithAuth from "../useFetchWithAuth"


// Start:: form
const EmployeeForm = ({ pAccessLevels, pName, pAddress, pMobile, pEmail, onClosed }) => {
    const buttonRef = useRef();

    useEffect(() => {
        buttonRef.current.focus();
        
        document.addEventListener('keydown', (event) => {
          if (event.keyCode === 27) {
            onClosed();
          }
        });

        return () => {
          document.removeEventListener('keydown', onClosed);
        };
    }, []);

    function getAccessLevel(accessLevelArray) {
		let names = '';

		accessLevelArray && accessLevelArray.map((item) => {
            names === "" ? names = item.name : names = names + ', ' + item.name
		});

        return names;
    }

    const handleClose = () => {
        onClosed();
    }

    return (
        <form>
            <Modal.Body>
                <div className="row mb-2">
                    <div className="col-12">
                        <label className="form-label mr-2">Name :</label>
                        <label className="form-label">{ pName }</label>
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-12">
                        <label className="form-label mr-2">Role :</label>
                        <label className="form-label">{ getAccessLevel(pAccessLevels) }</label>
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-xs-12 col-md-6">
                        <label className="form-label mr-2">Mobile no. :</label>
                        <label className="form-label">{ pMobile }</label>
                    </div>

                    <div className="col-xs-12 col-md-6">
                        <label className="form-label mr-2">Email :</label>
                        <label className="form-label">{ pEmail }</label>
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-12">
                        <label className="form-label mr-2">Address :</label>
                        <label className="form-label">{ pAddress }</label>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button
                    ref = { buttonRef }
                    type = "button"
                    className = "btn btn-danger"
                    onClick = { handleClose } >
                    Close
                </button>
            </Modal.Footer>
        </form> 
    );
};
// End:: form

// Start:: Component
const EmployeeView = forwardRef((props, ref) => {    
    const hotelId = useContext(HotelId);
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/employees/${hotelId}/${props.pId}`
    });

    useEffect(() => {
        showModal && doFetch();
        error && toast.error(error);
    }, [props.pId, showModal]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        props.onClosed();
    };


    useImperativeHandle(ref, () => {
        return {
            handleShowModal
        }
    });

    return (
        <>
            {/* Start:: View modal */}
            { data &&
                <Modal 
                    show = { showModal }>

                    <Modal.Header>
                        <Modal.Title>View employee</Modal.Title>
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal}>
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>

                    <EmployeeForm 
                        pAccessLevels = { data.accessLevels }
                        pName = { data.name }
                        pAddress = { data.address }
                        pMobile = { data.mobile }
                        pEmail = { data.email }
                        onClosed = { handleCloseModal } />
                    
                </Modal> }
            {/* End:: View modal */}
        </>
    );
})
// End:: Component

export default EmployeeView;