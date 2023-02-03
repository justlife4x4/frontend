import {React, useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {Table, Card, Dropdown} from 'react-bootstrap';

import {Edit3, Scissors} from 'react-feather';
import EmployeeEdit from './EmployeeEdit';
import EmployeeDelete from './EmployeeDelete';

const EmployeeCard = forwardRef((props, ref) => {
    const editRef = useRef(null);
    const delRef = useRef(null);
    const [focus, setFocus] = useState(false);
    const [active, setActive] = useState(false);
    const setDeSelect = () => {
        setActive(false);
        setFocus(false);
    };

    useImperativeHandle(ref, () => {
        return {
            setDeSelect
        }
    });

    const handelOpenEdit = () => {
        editRef.current.handleShowModal();
    };

    const handelOpenDel = () => {
        delRef.current.handleShowModal();
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

    return (
        <>
            {/* Start :: card component */}
            <Card className='card-small-element border'
                ref={ref}
                index={props.pIndex}
                border={active ? 'info' : focus ? 'primary' : ''}  
                onMouseEnter={() => setFocus(true)}
                onMouseLeave={() => setFocus(false)} 
                onClick={() => {setActive(!active) 
                    props.onActivated(props.pIndex)}}>

                <Card.Body className="pt-2 pl-1 pb-0 pr-1 m-0">
                    <Card.Subtitle>
                        <div className="row">
                            <div className="col-md-10">
                                <h4>{props.pName}</h4>
                            </div>
                            <div className="col-md-2 text-right">
                                <Dropdown autoClose="true">
                                    <Dropdown.Toggle 
                                        variant="light" 
                                        size="sm"
                                        align="end"
                                        drop="down"/>

                                    <Dropdown.Menu>
                                        <Dropdown.Item 
                                            href="#" 
                                            className="pl-2"
                                            onClick={handelOpenEdit}>
                                            <span 
                                                className="pr-5">
                                                <Edit3 className="feather-16 mr-3"/>Edit
                                            </span>
                                        </Dropdown.Item>

                                        <Dropdown.Item 
                                            href="#" 
                                            className="m-0 pl-2"
                                            onClick={handelOpenDel}>
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

                    <Table size="sm" className="mb-0 mt-2">
                        <tbody>
                            <tr>
                                <td><b>Role</b></td>
                                <td className="text-right">{accessLevels(props.pAccessLevels)}</td>
                            </tr>
                            <tr>
                                <td><b>Mobile no.</b></td>
                                <td className="text-right">{props.pMobile}</td>
                            </tr>
                            <tr>
                                <td><b>Email</b></td>
                                <td className="text-right">{props.pEmail}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>{props.pAddress}</td>
                            </tr>
                        </tbody>                            
                    </Table>
                </Card.Body>
            </Card>
            {/* End :: card component */}

            {/* Start :: edit employee component */}
            <EmployeeEdit 
                ref={editRef}
                pId={props.pId} 
                onEdited={props.onEdited} 
                onClosed={handleClose}/>
            {/* End :: edit employee component */}

            {/* Start :: delete employee component */}
            <EmployeeDelete 
                ref={delRef}
                pId={props.pId} 
                onDeleted={props.onDeleted} 
                onClosed={handleClose} />
            {/* End :: delete employee component */}
        </>
    );
})

export default EmployeeCard;