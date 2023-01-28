import { React } from 'react';
import { Table, Card, Dropdown } from 'react-bootstrap';

import RoomCategoryEdit from './RoomCategoryEdit';
import RoomCategoryDelete from './RoomCategoryDelete';

const RoomCategoryCard = ({ pId, pName, pTariff, pDiscount, pBed, pPerson, onEdited, onDeleted }) => {
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
                                            <RoomCategoryEdit 
                                                pId = { pId } 
                                                onEdited = { onEdited } />
                                        </Dropdown.Item>

                                        <Dropdown.Item href="#" className="m-0 pl-2">
                                            <RoomCategoryDelete 
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
                            <td>Room tariff</td>
                            <td className="text-right">{`₹ ${pTariff}`}</td>
                        </tr>
                        <tr>
                            <td>Max. discount</td>
                            <td className="text-right">{`₹ ${pDiscount}`}</td>
                        </tr>
                        <tr>
                            <td>Ext. bed tariff</td>
                            <td className="text-right">{`₹ ${pBed}`}</td>
                        </tr>
                        <tr>
                            <td>Ext. person tariff</td>
                            <td className="text-right">{`₹ ${pPerson}`}</td>
                        </tr>
                    </tbody>                            
                </Table>
            </Card.Body>
        </Card>
    );
}

export default RoomCategoryCard;