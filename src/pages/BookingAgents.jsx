import {React, useEffect, useState, useRef} from 'react';
import {Breadcrumb} from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify';

import {useStateContext} from '../contexts/ContextProvider';
import BookingAgentSearch from '../components/bookingAgent/BookingAgentSearch';
import BookingAgentAdd from '../components/bookingAgent/BookingAgentAdd';
import BookingAgentCard from '../components/bookingAgent/BookingAgentCard';
import Paging from '../components/Paging';
import useFetchWithAuth from '../components/useFetchWithAuth';

const CloseButton = ({closeToast}) => (
    <i className="material-icons"
      onClick={closeToast}>
    </i>
);

const BookingAgents = () => {
    const contextValues = useStateContext();
    const searchRef = useRef(null);

    const [search, setSearch] = useState('');
    const [selectedPage, setSelectedPage] = useState(1);
    const [changed, setChanged] = useState(false);

    const itemPerRow = contextValues.itemPerRow;
    const itemPerPage = contextValues.itemPerPage;
    const indexOfLastItem = selectedPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `/bookingAgents`,
        params: {
            search: search
        }
    });

    useEffect(() => {
        doFetch();
    }, [changed, search]);

    useEffect(() => {
        setChanged(false);
        error && toast.error(error.message);
        !loading && searchRef.current.setFocus();
    }, [data, loading, error]);

    const handleSearch = (search) => {
        setSearch(search);
        setSelectedPage(1);
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

    const handleClosed = () => {
        searchRef.current.setFocus();
    };

    const handelPaging = (pageNumber) => {
        setSelectedPage(pageNumber)
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
                const c = colIdx;
                const d = rowData;

                rowIdx++;
                rowData = [];

                return createRow(d, r, c);
            } else { 
                return null 
            }
        })
    }

    const createRow = (data, rowIdx, colIdx) => {
        const rowKey = `row_${rowIdx}`;
        let idx = colIdx - data.length;

        return (
            <div className="row m-0 p-0" key={rowKey}>
                {
                    data.map((item) => {
                        const c = idx;
                        const d = item;

                        idx++;

                        return createCol(d, c);
                    })
                }
            </div>);
    }

    const createCol = (data = undefined) => {
        const colKey = `col_${data._id}`;

        return (
                <div className="col-xl-4 col-md-4 m-0" key={colKey}>
                    <BookingAgentCard
                        pId={data._id} 
                        pName={data.name}
                        pDescription={data.description}
                        onEdited={handleEdited}
                        onDeleted={handleDeleted}
                        onClosed={handleClosed} />
                </div>
            );
    }

    return ( 
        <>
            {/* Seart :: Bread crumb */}
            <Breadcrumb className="mt-5">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/">Master</Breadcrumb.Item>
                <Breadcrumb.Item active>Booking agent</Breadcrumb.Item>
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
                                    <h3>Booking agents</h3>        
                                </div>
                                <div className="col-xs-12 col-md-8">
                                    <div className="input-group justify-content-end mt-2">
                                        <BookingAgentSearch
                                            onSearchChange={handleSearch}
                                            ref={searchRef}/>

                                        <BookingAgentAdd 
                                            onAdded={handleAdded}
                                            onClosed={handleClosed}/>
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
 
export default BookingAgents;
