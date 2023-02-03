import {React, useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {Modal, NavLink} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {X, Scissors} from 'react-feather';

import {HotelId} from '../../App';
import useFetchWithAuth from '../useFetchWithAuth';

// Start:: form
const EmployeeForm = ({pId, pName, onSubmited, onClosed}) => {
    const hotelId = useContext(HotelId);
    const inputRef = useRef();
    const { loading, error, doDelete } = useFetchWithAuth({
        url: `/employees/${hotelId}/${pId}`
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
                <label className="form-label">Are you really want to remove <mark><code>{pName}</code></mark> ?</label>
            </Modal.Body>
            <Modal.Footer>
                <button 
                    type="button"   
                    className="btn btn-danger"
                    disabled={loading}
                    ref={inputRef}
                    onClick={onClosed} >
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
const EmployeeDelete = forwardRef((props, ref) => {
    const hotelId = useContext(HotelId);
    const [showModal, setShowModal] = useState(false)
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/employees/${hotelId}/${props.pId}`
    });

    useEffect(() => {
        showModal && doFetch();
    }, [props.pId, showModal]);

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        props.onClosed();
    }

    const handleSave = () => {
        setShowModal(false);
        props.onDeleted();  
    }

    useImperativeHandle(ref, () => {
        return {
            handleShowModal
        }
    });

    return (
        <>
            {/* Start:: Delete modal */}
            {data &&
                <Modal 
                    size="sm"
                    show={showModal}>

                    <Modal.Header>
                        <Modal.Title>Delete employee</Modal.Title>
                        <NavLink 
                            className="nav-icon" href="#" 
                            onClick={handleCloseModal}>
                            <i className="align-middle"><X/></i>
                        </NavLink>
                    </Modal.Header>
                    <EmployeeForm 
                        pId={props.pId} 
                        pName={data.name}
                        onSubmited={handleSave} 
                        onClosed={handleCloseModal} />
            </Modal>}
            {/* End:: Delete modal */}
        </>
    );
})
// End:: Component

export default EmployeeDelete;