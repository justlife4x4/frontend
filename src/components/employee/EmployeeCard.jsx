import { React } from 'react';
import { Table, Card, Dropdown } from 'react-bootstrap';

import EmployeeEdit from './EmployeeEdit';
import EmployeeDelete from './EmployeeDelete';

import 'react-toastify/dist/ReactToastify.css';

const EmployeeCard = ({ pAccessLevels, pId, pName, pAddress, pMobile, pEmail, onEdited, onDeleted }) => {
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
            {pId && 
                <Card className="border">
                    <Card.Body className="pt-3 pl-1 pb-1 pr-1 m-0">
                        <Card.Subtitle>
                            <div className="row">
                                <div className="col-md-10">
                                    <h4 className="text-muted">
                                        {pName}
                                    </h4>
                                </div>
                                <div className="col-md-2 text-right">
                                    <Dropdown autoClose="true">
                                        <Dropdown.Toggle 
                                            variant="light" 
                                            size="sm"
                                            align="end"
                                            drop="down"/>

                                        <Dropdown.Menu style={{background: "#e5e5f0"}}>
                                            <Dropdown.Item 
                                                href="#" 
                                                className="pl-2" >
                                                <EmployeeEdit 
                                                    pId={pId} 
                                                    onEdited={onEdited} />
                                            </Dropdown.Item>

                                            <Dropdown.Item href="#" className="m-0 pl-2">
                                                <EmployeeDelete 
                                                    pId={pId} 
                                                    onDeleted={onDeleted} />
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </Card.Subtitle>

                        <Table striped size="sm" className="text-muted mb-0 mt-2">
                            <tbody>
                                <tr>
                                    <td><b>Access level</b></td>
                                    <td className="text-right">{accessLevels(pAccessLevels)}</td>
                                </tr>
                                <tr>
                                    <td><b>Mobile no.</b></td>
                                    <td className="text-right">{pMobile}</td>
                                </tr>
                                <tr>
                                    <td><b>Email</b></td>
                                    <td className="text-right">{pEmail}</td>
                                </tr>
                                <tr>
                                    <td className="text-center" colSpan={"2"}>{pAddress}</td>
                                </tr>
                            </tbody>                            
                        </Table>
                    </Card.Body>
                </Card>
            }
        </>
    );
}

export default EmployeeCard;