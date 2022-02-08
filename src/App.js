import logo from './images/ColorIcon.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';

/* otros componentes */
import ListClient from './components/listClient.js'
import FormClient from './components/formClient.js'
import CardClient from './components/card.js'




function App() {
  const [page, setPage] = useState("home");

  {if(page == 'home'){
    return(
      <Container>
        <Row>
          <Col><h1 className='text-center'>SISTEMA DE CLIENTES</h1></Col>
        </Row>
        <Row className='m-5'>
          <Col xs="2" sm="2" lg="1">
            <img src={logo} class="img-rounded" alt="" width={50} />
          </Col>
          <Col xs="6" sm="6" lg="2">
            <Button variant="primary" className='m-2' type="submit" onClick={() => setPage('form')}>
                NUEVO CLIENTE
            </Button>
          </Col>
          <Col xs="6" sm="6" lg="2">
            <Button variant="primary" className='m-2' type="submit" onClick={() => setPage('view')}>
                TARJETAS
            </Button>
          </Col>
          <Col xs="6" sm="6" lg="2">
            <Button variant="primary" className='m-2' type="submit" onClick={() => setPage('home')}>
                HOME
            </Button>
          </Col>
          <ListClient />
        </Row>
      </Container>
    )
  }}
  {if(page == 'view'){
    return(
      <Container>
        <Row className='m-5'>
          <Col xs="6" sm="6" lg="2">
            <Button variant="primary" className='m-2' type="submit" onClick={() => setPage('form')}>
                NUEVO CLIENTE
            </Button>
          </Col>
          <Col xs="6" sm="6" lg="2">
            <Button variant="primary" className='m-2' type="submit" onClick={() => setPage('home')}>
                HOME
            </Button>
          </Col>
          <CardClient />
        </Row>
      </Container>
    )
  }}
  {if(page == 'form'){
    return(
      <Container>
        <Row className='m-5'>
          <Col xs="6" sm="6" lg="2">
            <Button variant="primary" className='m-2' type="submit" onClick={() => setPage('form')}>
                NUEVO CLIENTE
            </Button>
          </Col>
          <Col xs="6" sm="6" lg="2">
            <Button variant="primary" className='m-2' type="submit" onClick={() => setPage('home')}>
              HOME
            </Button>
          </Col>
              <FormClient />
        </Row>
      </Container>
    )
  }}
}

export default App;
