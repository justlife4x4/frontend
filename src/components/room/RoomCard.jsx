import { React, useContext, useEffect, useState } from 'react';
import { Table, Card, Dropdown } from 'react-bootstrap';

import { HotelId } from '../../App';
import RoomEdit from './RoomEdit';
import RoomDelete from './RoomDelete';
import useFetchWithAuth from '../useFetchWithAuth';

import 'react-toastify/dist/ReactToastify.css';

const RoomCard = ({ pCategoryId, pId, pNo, pTariff, pDiscount, pBed, pPerson, onEdited, onDeleted }) => {
    const hotelId = useContext(HotelId);
    const [categoryName, setCategoryName] = useState('');
    const { data, loading, error, doFetch } = useFetchWithAuth({
        url: `/roomCategories/${hotelId}/${pCategoryId}`
    });

    useEffect(() => {
        doFetch();
    }, [pCategoryId]);

    useEffect(() => {
        data && setCategoryName(data.name)
    }, [data, error, loading]);

    return (
        <>
            { data && 
                <Card className="border">
                    <Card.Body className="pt-3 pl-1 pb-1 pr-1 m-0">
                        <Card.Subtitle>
                            <div className="row">
                                <div className="col-md-10">
                                    <h4 className="text-muted">
                                        <span className="badge bg-secondary">{pNo}</span> - {categoryName}
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
                                                <RoomEdit 
                                                    pId={pId} 
                                                    onEdited={onEdited} />
                                            </Dropdown.Item>

                                            <Dropdown.Item href="#" className="m-0 pl-2">
                                                <RoomDelete 
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
            }
        </>
    );
}

export default RoomCard;