import {React, useContext, useEffect, useState, useRef} from 'react';
import {Breadcrumb} from 'react-bootstrap';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify';
import {Paperclip} from 'react-feather';

import {HotelId} from '../App';
import {useStateContext} from '../contexts/ContextProvider';
import EmployeeSearch from '../components/employee/EmployeeSearch';
import EmployeeAdd from '../components/employee/EmployeeAdd';
import EmployeeCard from '../components/employee/EmployeeCard';
import Paging from '../components/Paging';
import useFetchWithAuth from '../components/useFetchWithAuth';

const CloseButton = ({closeToast}) => (
    <i className="material-icons"
      onClick={closeToast}>
    </i>
);

const Employees = () => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();

    const itemPerRow = contextValues.itemPerRow;
    const itemPerPage = contextValues.itemPerPage;

    const searchRef = useRef(null);
    let cardRefs = useRef([]);
    cardRefs.current = [itemPerRow];
    
    const [search, setSearch] = useState('');
    const addRef = useRef(null);
    const [changed, setChanged] = useState(false);
    const [selectedPage, setSelectedPage] = useState(1);
    
    const indexOfLastItem = selectedPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;

    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `/employees/${hotelId}`,
        params: {
            search: search
        }
    });
    
    useEffect(() => {
        doFetch();

        error && toast.error(error.message);
        !loading && searchRef.current.setFocus();
        changed && setChanged(!changed);
        search && setSearch(!search);
    }, [changed, search]);

    const handleSearch = (search) => {
        setSearch(search);
        setSelectedPage(1);
    };

    const handelOpenAdd = () => {
        addRef.current.handleShowModal();
    };

    const handleAdded = () => {
        toast.success('Data successfully added');
        setChanged(true);
    };

    const handleEdited = () => {
        toast.success('Data successfully changed');
        setChanged(true);
   };

    const handleDeleted = () => {
        toast.success('Data successfully deleted');
        setChanged(true);
    };

    const handelActivated = (index) => {
        cardRefs.current.map((item, idx) => {
            if (index !== idx)
                cardRefs.current[idx] && cardRefs.current[idx].setDeSelect();    
        })
    }

    const handleClosed = () => {
        searchRef.current.setFocus();
    };

    const handelPaging = (pageNumber) => {
        cardRefs.current = [itemPerRow];
        setSelectedPage(pageNumber);
    };

    const displayData = (data = []) => {
        let rowIdx = 0;
        let colIdx = 0;
        let rowData = [];

        return data.map((item) => {
            rowData.push(item);
            colIdx++;

            if ((rowData.length === itemPerRow) || (data.length === colIdx)) {
                const r = rowIdx;
                const d = rowData;

                rowIdx++;
                rowData = [];

                return createRow(d, r);
            } else { 
                return null 
            }
        })
    }

    const createRow = (data, rowIdx) => {
        const rowKey=`row_${rowIdx}`;

        return (
            <div className="row m-0 p-0" key={rowKey}>
                {
                    data.map((item, idx) => {
                        const itemIdx = (rowIdx * itemPerRow) + idx; 
                        return createCol(item, itemIdx);
                    })
                }
            </div>);
    }

    const createCol = (data = undefined, itemIdx) => {
        const colKey = `col_${data._id}`;

        return (
            <div className="col-xl-4 col-md-4 m-0" key={colKey}>
                <EmployeeCard 
                    ref={(el)=>cardRefs.current[itemIdx] = el}
                    pIndex={itemIdx}
                    pAccessLevels={data.accessLevels}
                    pId={data._id} 
                    pName={data.name}
                    pAddress={data.address}
                    pMobile={data.mobile}
                    pEmail={data.email}
                    onEdited={handleEdited}
                    onDeleted={handleDeleted} 
                    onClosed={handleClosed} 
                    onActivated={handelActivated}/>                
            </div>);
    }

    return ( 
        <>
            {/* Seart :: Bread crumb */}
            <Breadcrumb className="mt-5">
                <Breadcrumb.Item href = "/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href = "/">Master</Breadcrumb.Item>
                <Breadcrumb.Item active>Employee</Breadcrumb.Item>
            </Breadcrumb>
            {/* End :: Bread crumb */}

            {/* Start :: display data */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        {/* Start :: Header & operational panel */}
                        <div className="card-header mx-3">
                            <div className="row">    
                                <div className="col-xs-12 col-md-4">
                                    <h3>Employees</h3>        
                                </div>
                                <div className="col-xs-12 col-md-8">
                                    <div className="input-group justify-content-end mt-2">
                                        <EmployeeSearch 
                                            onSearchChange={handleSearch}
                                            ref={searchRef}/>
                                            
                                        <OverlayTrigger
                                            overlay={<Tooltip>new</Tooltip>}>
                                            <button 
                                                className="btn btn-info ml-2" 
                                                size="md" 
                                                onClick={handelOpenAdd}>
                                                <Paperclip className="feather-16"/>
                                            </button>
                                        </OverlayTrigger>

                                        {/* <EmployeeAdd 
                                            onAdded={handleAdded}
                                            onClosed={handleClosed}/> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">    
                                <div className="col-12 text-right mt-4 text-muted">
                                    {/* Start :: Display data count */}
                                        {!loading && 
                                            data && 
                                                `display count : ${selectedPage * itemPerPage > data.length ? data.length : selectedPage * itemPerPage} of ${data.length}`}
                                    {/* End :: Display data count */}
                                </div>
                            </div>
                        </div>
                        {/* End :: Header & operational panel */}

                        {/* Start :: Display data */}
                        <div className="card-body m-0 py-0">
                            {loading &&
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role="status"/>
                                </div>}

                            {!loading && 
                                data && 
                                    displayData(data.slice(indexOfFirstItem, indexOfLastItem))}
                        </div>
                        {/* End :: Display data */}
                        
                        {/* Start :: Pagination */}
                        <div className="card-header d-flex justify-content-end mx-3">
                            {!loading && 
                                    data && 
                                        <Paging
                                            itemPerPage={itemPerPage}
                                            totalItem={data.length}
                                            selectedPage={selectedPage}
                                            onPaging={handelPaging} />}
                        </div>
                        {/* End :: Pagination */}
                    </div>
                </div>
            </div>
            {/* End :: display data */}

            {/* Start :: add employee component */}
            <EmployeeAdd 
                ref={addRef}   
                onAdded={handleAdded}
                onClosed={handleClosed}/>
            {/* End :: add employee component */}

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

        </>
    );
}

export default Employees;
