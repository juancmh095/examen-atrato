import React, { Component, setState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Card } from 'react-bootstrap';
import logo from '../images/ColorIcon.png';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import iconPencil from '../assets/icons/pencil.svg';
import Form from 'react-bootstrap/Form';

/* hoja de estilo */
import '../assets/css/card.css';

export default class CardClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClient: []
        };
    
        this.handleChange = this.handleChange.bind(this);
      }


      async handleChange(event) {
        
        let res = await fetch("http://localhost:5000/api/user/list?id="+event.target.value, {
            method: "GET",
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                filters:JSON.stringify({id: Number(event.target.value)})
            }
        });
        const data = await res.json();
        console.log(data.data);
        this.setState({dataClient: data.data});
        
      }

      async updateCard(value){
        console.log(value);
      }

  render() {
    const state = this.state;
    const { dataClient } = state;
    console.log('aqui',dataClient)
    return(
      <Container>
          <Row>
                <Col xs="6" sm="6" lg="3">
                    <Form.Group className="mb-3" controlId="id">
                        <Form.Control type="text" name='id' placeholder="id" onChange={this.handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm="12" xs="12" lg="7">
                    {dataClient.map(item => {
                        return (
                            <Card>
                                <Card.Header>
                                    <Row>
                                        <Col xs="0" sm="2" lg="1">
                                            <img src={logo} class="img-rounded" alt="" width={50} />
                                        </Col>
                                        <Col xs="12" sm="12" lg="6">
                                            <p className='header'>{item.name + ' ' + item.secondName + ' ' + item.appat + ' ' + item.apmat}</p>
                                            <p className='sub-text'>ID: {item.id}</p>
                                        </Col>
                                        <Col xs="12" sm="12" lg="5">
                                        <DropdownButton id="dropdown-basic-button" title="ESTATUS">
                                            <Dropdown.Item >PENDIENTE</Dropdown.Item>
                                            <Dropdown.Item >EN PROCESO</Dropdown.Item>
                                            <Dropdown.Item >COMPLETADO</Dropdown.Item>
                                        </DropdownButton>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col xs="12" sm="12" lg="6" className='area-info'>
                                            <div className='group-info'>
                                                <p className='sub-text'>MAIL</p>
                                                <p className='text-info-client'>{item.email}</p>
                                            </div>
                                            <div className='group-info'>
                                                <p className='sub-text'>FECHA DE NACIMIENTO</p>
                                                <p className='text-info-client'>{item.birth.split('T')[0]}</p>
                                            </div>
                                        </Col>
                                        <Col xs="12" sm="12" lg="6" className='area-card'>
                                            <Col xs="12" sm="12" lg="12" className='sub-area-card'>
                                                <div className='group-info'>
                                                    <p className='sub-text'>FULL NAME</p>
                                                    <p className='text-info-client'>{item.fullName}</p>
                                                </div>
                                                <div className='group-info'>
                                                    <p className='sub-text'>CARD NUMBER</p>
                                                    <p className='text-info-client'>{item.numberCard}</p>
                                                </div>
                                                <Row>
                                                    <Col>
                                                        <div className='group-info'>
                                                            <p className='sub-text'>CVV</p>
                                                            <p className='text-info-client'>{item.cvv}</p>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='group-info'>
                                                            <p className='sub-text'>PIN</p>
                                                            <p className='text-info-client'>{item.pin}</p>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='group-info'>
                                                            <p className='sub-text'>EXP</p>
                                                            <p className='text-info-client'>{item.venc}</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Col>
                                        <Col className='header-info'>
                                            <Button variant="link">EDITAR</Button>
                                        </Col>
                                    </Row>      
                                </Card.Body>
                            </Card>
                        )
                    })}                
                </Col>
            </Row>

      </Container>
    )

  }
}
