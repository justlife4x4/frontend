import { React } from 'react';
import { Table, Card, Dropdown } from 'react-bootstrap';

import PlanEdit from './PlanEdit';
import PlanDelete from './PlanDelete';

const PlanCard = ({ pId, pName, pDescription, onEdited, onDeleted }) => {
    return (
        <Card className="border" >
            <Card.Body className="pt-3 pl-1 pb-1 pr-1 m-0">
                <Card.Subtitle>
                        <div className="row">
                            <div className="col-md-9">
                                <h4 className="text-muted">{pName}</h4>
                            </div>
                            <div className="col-md-3 text-right">
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
                                            <PlanEdit 
                                                pId={pId} 
                                                onEdited={onEdited} />
                                        </Dropdown.Item>

                                        <Dropdown.Item href="#" className="m-0 pl-2">
                                            <PlanDelete 
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
                            <td className="text-justify">{pDescription}</td>
                        </tr>
                    </tbody>                            
                </Table>
            </Card.Body>
        </Card>
    );
}

export default PlanCard;