import { React, useContext, useEffect, useState } from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import { HotelId } from '../App';
import { useStateContext } from '../contexts/ContextProvider';
import RoomCategorySearch from '../components/roomCategory/RoomCategorySearch';
import RoomCategoryAdd from '../components/roomCategory/RoomCategoryAdd';
import RoomCategoryCard from '../components/roomCategory/RoomCategoryCard';
import Paging from '../components/Paging';
import useFetchWithAuth from '../components/useFetchWithAuth';

import 'react-toastify/dist/ReactToastify.css';


const RoomCategories = () => {
    const hotelId = useContext(HotelId);
    const contextValues = useStateContext();

    const [search, setSearch] = useState('');
    const [selectedPage, setSelectedPage] = useState(1);
    const [changed, setChanged] = useState(false);

    const itemPerRow = contextValues.itemPerRow;
    const itemPerPage = contextValues.itemPerPage;
    const indexOfLastItem = selectedPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;

    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/roomCategories/${hotelId}`,
        params: {
            search: search
        }
    });

    useEffect(() => {
        doFetch();
        setChanged(false);
    }, [changed, search]);

    useEffect(() => {
        setChanged(false);
        error && toast.error(error)
    }, [data, error, loading]);

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
        toast.success('Room category deleted');
        setChanged(true);
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
                const d = rowData;

                rowIdx++;
                rowData = [];

                return createRow(d, r) ;
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
                    data.map((item) => {
                        return createCol(item);
                    })
                }
            </div>);
    }

    const createCol = (data = undefined) => {
        const colKey = `col_${data._id}`;

        return (
            <div className="col-xl-4 col-md-4 m-0" key={colKey}>
                <RoomCategoryCard
                    pId={data._id} 
                    pName={data.name}
                    pTariff={parseFloat(data.tariff, 10).toFixed(2)}
                    pDiscount={parseFloat(data.maxDiscount, 10).toFixed(2)}
                    pBed={parseFloat(data.extraBedTariff, 10).toFixed(2)}
                    pPerson={parseFloat(data.extraPersonTariff, 10).toFixed(2)}
                    onEdited={handleEdited}
                    onDeleted={handleDeleted} />
            </div>);
    }

    return ( 
        <>
            {/* Seart :: Bread crumb */}
            <Breadcrumb className="mt-5">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/">Master</Breadcrumb.Item>
                <Breadcrumb.Item active>Room category</Breadcrumb.Item>
            </Breadcrumb>
            {/* End :: Bread crumb */}

            <div className="row">
                <div className="col-12">
                    <div className="card">

                        {/* Start :: Header & operational panel */}
                        <div className="card-header">
                            <Container>
                                <div className="row">    
                                    <div className="col-xs-12 col-md-4">
                                        <h3>Room categories</h3>        
                                    </div>
                                    <div className="col-xs-12 col-md-8">
                                        <div className="input-group justify-content-end mt-2">
                                            <RoomCategorySearch 
                                                onSearchChange={handleSearch} />

                                            <RoomCategoryAdd 
                                                onAdded={handleAdded} />
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
                            </Container>
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
                        <div className="row px-2 mx-4 d-flex justify-content-end">
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

            {/* Start :: display message */}
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
            {/* End :: display message */}

        </>
    );
}
 
export default RoomCategories;
