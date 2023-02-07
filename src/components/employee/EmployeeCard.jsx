import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Table, Card, Dropdown } from "react-bootstrap";

import { Edit3, Scissors } from "react-feather";
import EmployeeView from "./EmployeeView";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeDelete from "./EmployeeDelete";

const EmployeeCard = forwardRef((props, ref) => {
    const viewRef = useRef(null);
    const editRef = useRef(null);
    const deleteRef = useRef(null);
    const [focus, setFocus] = useState(false);
    const [active, setActive] = useState(false);

    const setDeSelect = () => {
        setActive(false);
        setFocus(false);
    };

    const handelOpenView = () => {
        viewRef && viewRef.current.handleShowModal();
    };

    const handelOpenEdit = () => {
        editRef && editRef.current.handleShowModal();
    };

    const handelOpenDel = () => {
        deleteRef && deleteRef.current.handleShowModal();
    };

    const handleClose = () => {
        props.onClosed();
    }

    const accessLevels = (accessLevelObject) => {
        var accessLevel = '';

        accessLevelObject.map((item) => {
            if (accessLevel.trim().length === 0 ) {
                accessLevel = item.name;
            } else {
                accessLevel = `${accessLevel}, ${item.name}`;
            }
        });

        return accessLevel;
    }

    function subStr(str, len) {
        return str.length > len ? str.substr(1, len) + " ..." : str
    }

    useImperativeHandle(ref, () => {
        return {
            setDeSelect, handelOpenEdit, handelOpenDel
        }
    });

    return (
        <>
            {/* Start :: card component */}
            <Card className='border'
                ref = { ref }
                index = { props.pIndex }
                border = { active ? 'info' : focus ? 'primary' : '' }  
                onMouseEnter = { () => setFocus(true) }
                onMouseLeave = { () => setFocus(false) } 
                onClick = { (e) => { 
                                        if (e.detail === 1) {
                                            setActive(!active) 
                                            props.onActivated(props.pIndex)
                                        }    
                                        else if (e.detail === 2) {
                                            handelOpenView()
                                        }  
                                   } } >

                <Card.Body className="pt-3 pl-1 pb-1 pr-1 m-0 card-element">
                    <Card.Subtitle>
                        <div className="row">
                            <div className="col-md-10">
                                <h4>{ subStr(props.pName, 20) }</h4>
                            </div>
                            <div className="col-md-2 text-right">
                                <Dropdown autoClose="true">
                                    <Dropdown.Toggle 
                                        variant="light" 
                                        size="sm"
                                        align="end"
                                        drop="down" />

                                    <Dropdown.Menu>
                                        <Dropdown.Item 
                                            href="#" 
                                            className="pl-2"
                                            onClick = { handelOpenEdit } >
                                            <span 
                                                className="pr-5">
                                                <Edit3 className="feather-16 mr-3"/>Edit
                                            </span>
                                        </Dropdown.Item>

                                        <Dropdown.Item 
                                            href="#" 
                                            className="m-0 pl-2"
                                            onClick = { handelOpenDel } >
                                                <span 
                                                    className="pr-5">
                                                    <Scissors className="feather-16 mr-3"/>Delete
                                                </span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </Card.Subtitle>

                    <Table striped size="sm" className="text-muted mb-0 mt-2">
                        <tbody>
                            <tr>
                                <td><b>Role</b></td>
                                <td className="text-right">{ subStr(accessLevels(props.pAccessLevels), 20) }</td>
                            </tr>
                            <tr>
                                <td><b>Mobile no.</b></td>
                                <td className="text-right">{ props.pMobile }</td>
                            </tr>
                            <tr>
                                <td><b>Email</b></td>
                                <td className="text-right">{ props.pEmail }</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>{ subStr(props.pAddress, 45) }</td>
                            </tr>
                        </tbody>                            
                    </Table>
                </Card.Body>
            </Card>
            {/* End :: card component */}

            {/* Start :: view employee component */}
            <EmployeeView
                ref = { viewRef }
                pId = { props.pId } 
                onClosed = { handleClose } />
            {/* End :: view employee component */}

            {/* Start :: edit employee component */}
            <EmployeeEdit 
                ref = { editRef }
                pId = { props.pId } 
                onEdited = { props.onEdited } 
                onClosed = { handleClose } />
            {/* End :: edit employee component */}

            {/* Start :: delete employee component */}
            <EmployeeDelete 
                ref = { deleteRef }
                pId = { props.pId } 
                onDeleted = { props.onDeleted } 
                onClosed = { handleClose } />
            {/* End :: delete employee component */}
        </>
    );
})

export default EmployeeCard;