import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Breadcrumb } from "react-bootstrap";
import { toast } from "react-toastify";

import { useStateContext } from "../contexts/ContextProvider";
import IDDocumentAdd from "../components/idDocument/IDDocumentAdd";
import IDDocumentCard from "../components/idDocument/IDDocumentCard";
import Paging from "../components/Paging";
import useFetchWithAuth from "../components/useFetchWithAuth";


// Start:: Component
// props parameters
// onSuccess
// onClose

// useImperativeHandle
// changeSearch
// openAdd
// openEdit 
// openDelete
// close
const IDDocuments = forwardRef(( props, ref ) => {
    const contextValues = useStateContext();
    const itemPerRow = contextValues.itemPerRow;
    const itemPerPage = contextValues.itemPerPage;
    const [search, setSearch] = useState("");
    const addRef = useRef(null);
    let cardRefs = useRef([]);
    cardRefs.current = [itemPerRow];
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [dataChanged, setDataChanged] = useState(false);
    const [selectedPage, setSelectedPage] = useState(1);
    const indexOfLastItem = selectedPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const {data, loading, error, doFetch} = useFetchWithAuth({
        url: `${contextValues.idDocumentAPI}`,
        params: {
            search: search
        }
    });

    // Start:: Change search text
    const changeSearch = (text) => {
        setSearch(text);
        setSelectedPage(1);
    };
    // End:: Change search text

    // Start:: Open add modal
    const openAdd = () => {
        addRef.current.handleShowModal();
    };
    // End:: Open add modal

    // Start:: Open edit modal
    const openEdit = () => {
        if (selectedCardIndex !== null) {
            if (selectedCardIndex >= 0) { 
                cardRefs.current.forEach((item, idx) => {
                    if (selectedCardIndex === idx)
                        cardRefs.current[idx] && cardRefs.current[idx].handelOpenEdit();
                });
            } else {
                toast.warning("Nothing selected to edit");
            }
        }
    };
    // End:: Open edit modal

    // Start:: Open delete modal
    const openDelete = () => {
        if (selectedCardIndex !== null) {
            if (selectedCardIndex >= 0) { 
                cardRefs.current.forEach((item, idx) => {
                    if (selectedCardIndex === idx)
                        cardRefs.current[idx] && cardRefs.current[idx].handelOpenDelete();
                });
            } else {
                toast.warning("Nothing selected to delete");
            }
        }
    };
    // End:: Open delete modal

    // Start:: Close modal
    const close = () => {
        props.onClose();
    };
    // End:: Close modal

    // Start:: on data operation successfully
    const handleSuccess = ( operation ) => {
        switch (operation) {
            case "add":
                toast.success("Data successfully added");
                setDataChanged(true);
                props.onSuccess();
                break;

            case "edit":
                toast.success("Data successfully changed");
                setDataChanged(true);
                props.onSuccess();
                break;                

            case "delete":
                toast.success("Data successfully deleted");
                setDataChanged(true);
                props.onSuccess();
                break;                

            default:                
                break;                
        }
    };
    // End:: on data operation successfully

    // Start:: change selection of card element    
    const handleActivated = (index) => {
            setSelectedCardIndex(index);

            cardRefs.current && cardRefs.current.forEach((item, idx) => {
                if (index !== idx)
                    cardRefs.current[idx] && cardRefs.current[idx].handleDeSelect();
            });
    };
    // End:: change selection of card element    

    // Seart:: handle page change
    const handlePaging = (pageNumber) => {
        cardRefs.current = [itemPerRow];
        setSelectedPage(pageNumber);
    };
    // End:: handle page change

    // Start:: show all data in card format
    const displayData = (pData = []) => {
        let rowIdx = 0;
        let colIdx = 0;
        let rowData = [];

        return pData.map((item) => {
            rowData.push(item);
            colIdx++;

            if ((rowData.length === itemPerRow) || (pData.length === colIdx)) {
                const r = rowIdx;
                const d = rowData;

                rowIdx++;
                rowData = [];

                return createRow(d, r);
            } else { 
                return null;
            }
        })
    };

    const createRow = ( pData, rowIdx ) => {
        const rowKey=`row_${rowIdx}`;

        return (
            <div className="row m-0 p-0" key={rowKey}>
                {
                    pData.map((item, idx) => {
                        const itemIdx = (rowIdx * itemPerRow) + idx;
                        return createCol(item, itemIdx);
                    })
                }
            </div>);
    };

    const createCol = (pData = undefined, itemIdx) => {
        const colKey = `col_${pData._id}`;

        return (
            <div className="col-xl-4 col-md-4 m-0" key={colKey}>
                <IDDocumentCard 
                    ref = { (el) => cardRefs.current[itemIdx] = el }
                    pIndex = { itemIdx }
                    pId = { pData._id } 
                    pName = { pData.name }
                    pDescription = { pData.description }
                    onEdited = {() => {handleSuccess("edit")} }
                    onDeleted = {() => handleSuccess("delete") } 
                    onClosed = { close } 
                    onActivated = { handleActivated } />                
            </div>);
    };
    // End:: show all data in card format

    // Start:: forward reff change search and open add/edit/delete modal
    useImperativeHandle(ref, () => {
        return {
            changeSearch, openAdd, openEdit, openDelete, close
        }
    });
    // End:: forward reff change search and open add/edit/delete modal

    // Start:: fetch data list from api
    useEffect(() => {
        (async () => {
            try {
              await doFetch();
              setDataChanged(false);
            } catch (err) {
              console.log("Error occured when fetching data");
            }
          })();
    }, [dataChanged, search, doFetch]);
    // End:: fetch data list from api

    useEffect(() => {
        error && toast.error(error);
    }, [data, error, loading]);

    // Start:: Html
    return ( 
        <>
            {/* Seart :: Bread crumb */}
            <Breadcrumb className="mt-5">
                <Breadcrumb.Item href = "/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href = "/">Master</Breadcrumb.Item>
                <Breadcrumb.Item active>ID document</Breadcrumb.Item>
            </Breadcrumb>
            {/* End :: Bread crumb */}

            {/* Start :: display data */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        {/* Start :: Header & operational panel */}
                        <div className="card-header mx-3">
                        </div>
                        {/* End :: Header & operational panel */}

                        {/* Start :: Display data */}
                        <div className="card-body py-0">
                            { loading &&
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role="status"/>
                                </div> }

                            { !loading && 
                                data && 
                                    displayData(data.slice(indexOfFirstItem, indexOfLastItem)) }
                        </div>
                        {/* End :: Display data */}
                        
                        <div className="card-footer ">
                            <div className="row">
                                {/* Start :: Display data count */}
                                <div className="col-4 text-danger">
                                    {!loading && 
                                        data && 
                                            `display count : ${selectedPage * itemPerPage > data.length ? data.length : selectedPage * itemPerPage} of ${data.length}`}
                                </div>
                                {/* End :: Display data count */}

                                {/* Start :: Pagination */}
                                <div className="col-8 text-muted d-flex justify-content-end">
                                    {!loading && 
                                            data && 
                                                <Paging
                                                    itemPerPage = { itemPerPage }
                                                    totalItem = { data.length }
                                                    selectedPage = { selectedPage }
                                                    onPaging = { handlePaging } />}
                                </div>
                                {/* End :: Pagination */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End :: display data */}

            {/* Start :: add employee component */}
            <IDDocumentAdd 
                ref = { addRef }   
                onAdded = { () => { handleSuccess("add") } }
                onClosed = { close } />
            {/* End :: add employee component */}

        </>
    );
    // End:: Html

});
// End:: Component


export default IDDocuments;
