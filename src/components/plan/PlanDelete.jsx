import { React, useContext, useEffect, useRef, useState } from 'react';
import { Modal, NavLink } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { X, Scissors } from 'react-feather';

import { HotelId } from '../../App';
import useFetchWithAuth from '../useFetchWithAuth';

import 'react-toastify/dist/ReactToastify.css';

// Start:: form
const PlanForm = ({ pId, pName, onSubmit, onClose }) => {
    const hotelId = useContext(HotelId);
    const inputRef = useRef();
    const { loading, error, doDelete } = useFetchWithAuth({
        url: `/plans/${hotelId}/${pId}`
    });

    const handleSave = async () => {
        await doDelete();

        if (error === null) {
            onSubmit();
        } else {
            toast.error(error);
        }
    }

    useEffect(() => {
        !loading && inputRef.current.focus();
    }, [loading, error]);

    return (
        <form>
            <Modal.Body>
                <label className="form-label">Are you really want to remove <mark><code>{ pName }</code></mark> ?</label>
            </Modal.Body>
            <Modal.Footer>
                <button 
                    className="btn btn-danger"
                    disabled={loading}
                    ref={inputRef}
                    onClick={(e) => {onClose(e)}}>
                    Close
                </button>

                <button 
                    className="btn btn-success"
                    disabled={loading || error}
                    onClick={(e) => {handleSave()}}>

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
const PlanDelete = ({ pId, onDeleted }) => {
    const hotelId = useContext(HotelId);
    const [showModal, setShowModal] = useState(false)
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
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleSave = () => {
        onDeleted();  
        setShowModal(false);
    }

    return (
        <div className="text-left">
            {/* Start:: Delete menu */}
            <span 
                className="pr-5" 
                onClick={handleShowModal} >
                <Scissors className="feather-16 mr-3"/>Delete
            </span>
            {/* End:: Delete menu */}

            {/* Start:: Delete modal */}
            <Modal 
                size="sm"
                show={showModal}>

                <Modal.Header>
                    <Modal.Title>Delete plan</Modal.Title>
                    <NavLink 
                        className="nav-icon" href="#" 
                        onClick={handleCloseModal}>
                        <i className="align-middle"><X/></i>
                    </NavLink>
                </Modal.Header>

                {data &&
                    <PlanForm 
                        pId={pId} 
                        pName={data.name}
                        onSubmit={handleSave} 
                        onClose={handleCloseModal} />
                }
            </Modal>
            {/* End:: Delete modal */}

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

export default PlanDelete;