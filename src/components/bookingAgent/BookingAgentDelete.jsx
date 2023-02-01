import {React, useEffect, useRef, useState} from 'react';
import {Modal, NavLink} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {X, Scissors} from 'react-feather';

import useFetchWithAuth from '../useFetchWithAuth';


// Start:: form
const BookingAgentForm = ({pId, name, onSubmited, onClosed}) => {
    const inputRef = useRef();
    const { loading, error, doDelete } = useFetchWithAuth({
        url: `/bookingAgents/${pId}`
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
    }, [loading, error]);

    const handleSave = async () => {
        await doDelete();

        if (error === null) {
            onSubmited();
        } else {
            toast.error(error);
        }
    }

    return (
        <form>
            <Modal.Body>
                <label className="form-label">Are you really want to remove <mark><code>{ name.toUpperCase() }</code></mark> ?</label>
            </Modal.Body>
            <Modal.Footer>
                <button 
                    type="button"
                    className="btn btn-danger"
                    disabled={loading}
                    ref={inputRef}
                    onClick={onClosed}>
                    Close
                </button>

                <button 
                    type="button"
                    className="btn btn-success"
                    disabled={loading || error}
                    onClick={handleSave} >

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
const BookingAgentDelete = ({pId, onDeleted, onClosed}) => {
    const [showModal, setShowModal] = useState(false)
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/bookingAgents/${pId}`
    });

    useEffect(() => {
        showModal && doFetch();
    }, [pId, showModal]);
    
    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        onClosed();
    }

    const handleSave = () => {
        setShowModal(false);
        onDeleted();  
    }

    return (
        <div className="text-left">
            {/* Start:: Delete menu */}
            <span 
                className="pr-5" 
                onClick={handleShowModal}>
                <Scissors className="feather-16 mr-3"/>Delete
            </span>
            {/* End:: Delete menu */}

            {/* Start:: Delete modal */}
            {data &&
                <Modal 
                    size="sm"
                    show={showModal}>

                    <Modal.Header>
                        <Modal.Title>Delete booking agent</Modal.Title>
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal}>
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    
                    <BookingAgentForm 
                        pId={pId} 
                        name={data.name}
                        onSubmited={handleSave} 
                        onClosed={handleCloseModal} />
                </Modal>}
            {/* End:: Delete modal */}
        </div>  
    );
}
// End:: Component

export default BookingAgentDelete;