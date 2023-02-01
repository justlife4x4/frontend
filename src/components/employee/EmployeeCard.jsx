import {React, useEffect, useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {Table, Card, Dropdown} from 'react-bootstrap';

import EmployeeEdit from './EmployeeEdit';
import EmployeeDelete from './EmployeeDelete';

//const EmployeeCard = ({pAccessLevels, pId, pName, pAddress, pMobile, pEmail, onEdited, onDeleted, onClosed, onActivated}) => {
const EmployeeCard = forwardRef((props, ref) => {
    const cardRef = useRef();
    const [focus, setFocus] = useState(false);
    const [active, setActive] = useState(false);

    const setDeSelect = () => {
        cardRef.current && cardRef.current.setActive(false);
    };

    useImperativeHandle(ref, () => {
        return {
            setDeSelect
        }
      }, []);


    useEffect(() => {
        setActive(props.pSelectionStatus);

        // console.log(active);
    }, [props.pSelectionStatus]);  

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
        <Card className='border'
            id={props.pId}
            border={active ? 'info' : focus ? 'primary' : ''}  
            style={{'cursor': 'pointer'}}
            bg={'light'}
            ref={cardRef}
            onMouseEnter={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)} 
            onClick={() => {setActive(!active) 
                props.onActivated(props.pId, !active)}} >

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
                                        className="pl-2">
                                        <EmployeeEdit 
                                            pId={props.pId} 
                                            onEdited={props.onEdited} 
                                            onClosed={handleClose}/>
                                    </Dropdown.Item>

                                    <Dropdown.Item href="#" className="m-0 pl-2">
                                        <EmployeeDelete 
                                            pId={props.pId} 
                                            onDeleted={props.onDeleted} 
                                            onClosed={handleClose} />
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
                            <td colSpan={"2"}>{props.pAddress}</td>
                        </tr>
                    </tbody>                            
                </Table>
            </Card.Body>
        </Card>
    );  
})

export default EmployeeCard;