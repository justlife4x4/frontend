import {React, useContext, useEffect, useState} from 'react';
import {Breadcrumb, Container} from 'react-bootstrap';
import {toast} from 'react-toastify';

import {HotelId} from '../App';
import {useStateContext} from '../contexts/ContextProvider';
import PlanSearch from '../components/plan/PlanSearch';
import PlanAdd from '../components/plan/PlanAdd';
import PlanCard from '../components/plan/PlanCard';
import Paging from '../components/Paging';
import useFetchWithAuth from '../components/useFetchWithAuth';


const Plans = () => {
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
        url: `/plans/${hotelId}`,
        params: {
            search: search
        }
    });

    useEffect(() => {
        doFetch();
        setChanged(false);
    }, [changed, search]);

    useEffect(() => {
        error && toast.error(error);
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
        toast.success('Data successfully deleted');
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

    const createCol = (data = undefined, colIdx = 0) => {
        const colKey = `col_${colIdx}`;
        const cardKey = `card_${data.id}`;

        return (
            <div className="col-xl-4 col-md-4 m-0" key={colKey}>
                <PlanCard key={cardKey} 
                    pId={data._id} 
                    pName={data.name}
                    pDescription={data.description}
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
                <Breadcrumb.Item active>Plan</Breadcrumb.Item>
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
                                        <h3>Plan</h3>        
                                    </div>
                                    <div className="col-xs-12 col-md-8">
                                        <div className="input-group justify-content-end mt-2">
                                            <PlanSearch 
                                                onSearchChange={handleSearch} />

                                            <PlanAdd 
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

        </>
    );
}
 
export default Plans;
