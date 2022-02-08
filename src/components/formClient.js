import React, { Component, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';


export default class FormClient extends Component {

    constructor(props) {
        super(props);
        this.model = {
            name: '',
            secondName: '',
            appat: '',
            apmat: '',
            email: '',
            phone: '',
            birth: '',
            analist: '',
            numberCard:'',
            prov:'',
            cvv:'',
            venc:'',
            pin:'',
            fullName:'',
            id: '',
            status: 'PENDIENTE',
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCard = this.getCard.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
      }
    
      async handleChange(event) {
        if(event.target.name == 'id'){
            this.model[event.target.name] = event.target.value;
            console.log(this.model);
            let res = await fetch("http://localhost:5000/api/user/list?id="+event.target.value, {
                method: "GET",
                headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    filters:JSON.stringify({id: Number(event.target.value)})
                }
            });
            const data = await res.json();
            this.model = data.data[0];
            console.log(data.data[0],this.model);

            document.getElementById('name').value = this.model.name;
            document.getElementById('secondName').value = this.model.secondName;
            document.getElementById('appat').value = this.model.appat;
            document.getElementById('apmat').value = this.model.apmat;
            document.getElementById('email').value = this.model.email;
            document.getElementById('phone').value = this.model.phone;
            document.getElementById('birth').value = this.model.birth;
            document.getElementById('analist').value = this.model.analist;

            document.getElementById('cardNumber').value = this.model.numberCard;
            document.getElementById('cvv').value = this.model.cvv;
            document.getElementById('venc').value = this.model.venc;
            document.getElementById('pin').value = this.model.pin;
        }else{
            this.model[event.target.name] = event.target.value;
        }
      }

      async getCard(event){
        event.preventDefault();
        let res = await fetch("https://randommer.io/api/Card", {
            method: "GET",
            headers: { 
                "Access-Control-Allow-Origin": '*',
                Accept: 'application/json',
                'X-Api-Key': 'f3b80c8d2c6a478e89445e919e625fff' 
            },
        });
        const data = await res.json();
        let fecha = data.date.split('T')[0];
        fecha = fecha.split('-');
        console.log(fecha);
        console.log(data.cardNumber,this.model);

        document.getElementById('cardNumber').value = data.cardNumber;
        document.getElementById('cvv').value = data.cvv;
        document.getElementById('venc').value = fecha[0]+'/'+fecha[1];
        document.getElementById('pin').value = data.pin;
        this.model.numberCard = data.cardNumber;
        this.model.cvv = data.cvv;
        this.model.prov = data.type;
        this.model.pin = data.pin;
        this.model.venc = fecha[0]+'/'+fecha[1];
        this.model.fullName = data.fullName;
      }

      async deleteItem(event){
          var resp =  window.confirm('Seguro que desea eliminar el usuario?');
          if(resp){
              let res = await fetch("http://localhost:5000/api/user/delete?id="+this.model.id, {
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(this.model),
                });
                let resJson = await res.json();
                console.log(resJson);
                if (resJson.err == false) {
                    alert('Usuario eliminado');
                    document.location.reload();
                }else{
                    alert('Error')
                }
            }else{
              document.location.reload();
          }
      }
    
      async handleSubmit(event) {
          console.log(JSON.stringify(this.model));
        event.preventDefault();
        if(Number(this.model.id) > 0){
            console.log('se edita');
            let res = await fetch("http://localhost:5000/api/user/edit?id="+this.model.id, {
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(this.model),
                });
                let resJson = await res.json();
                console.log(resJson);
                if (resJson.err == false) {
                    alert('Usuario actualizado');
                    document.location.reload();
                }else{
                    alert('Error')
                }
        }else{
            console.log('no edita');
            try {
                let res = await fetch("http://localhost:5000/api/user/add", {
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(this.model),
                });
                let resJson = await res.json();
                console.log(resJson);
                if (resJson.err == false) {
                    alert('Usuario agregado');
                    this.model = {
                        name: '',
                        secondName: '',
                        appat: '',
                        apmat: '',
                        email: '',
                        phone: '',
                        birth: '',
                        analist: '',
                        numberCard:'',
                        prov:'',
                        cvv:'',
                        venc:'',
                        pin:'',
                        fullName:''
                    };
                    document.location.reload();
                } else {
                  alert('Error');
                }
              } catch (err) {
                console.log(err);
              }
        }
      }

  render() {
    
    return(
      <Container>
          <Form onSubmit={this.handleSubmit} className="m-3">
            <Row>
                <Col xs="6" sm="6" lg="6">
                    <Form.Group className="mb-3" controlId="id">
                        <Form.Control type="text" name='id' placeholder="id" onChange={this.handleChange} />
                    </Form.Group>
                </Col>
                <Col xs="3" sm="3" lg="2">
                    <Button variant="danger" onClick={this.deleteItem}>
                        Eliminar
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                    <Col xs="12" sm="12" lg="6">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Control type="text" name='name' placeholder="Nombre" onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                    <Col xs="12" sm="12" lg="6">
                        <Form.Group className="mb-3" controlId="secondName">
                            <Form.Control type="text" name='secondName' placeholder="Segundo Nombre" onChange={this.handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col xs="12" sm="12" lg="6">
                        <Form.Group className="mb-3" controlId="appat">
                            <Form.Control type="text" name='appat' placeholder="Apellido Paterno" onChange={this.handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col xs="12" sm="12" lg="6">
                        <Form.Group className="mb-3" controlId="apmat">
                            <Form.Control type="text" name='apmat' placeholder="Apellido Materno" onChange={this.handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col xs="12" sm="12" lg="6">
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Control type="email" name='email' placeholder="Email" onChange={this.handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col xs="12" sm="12" lg="6">
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Control type="text" name='phone' placeholder="Telefono" onChange={this.handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col xs="12" sm="12" lg="6">
                        <Form.Group className="mb-3" controlId="birth">
                            <Form.Control type="date" name='birth' placeholder="Fecha de nacimiento" onChange={this.handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col xs="12" sm="12" lg="6">
                        <Form.Group className="mb-3" controlId="analist">
                            <Form.Control type="text" name='analist' placeholder="Analista" onChange={this.handleChange}/>
                        </Form.Group>
                    </Col>
                    
                </Row>

                <Row>
                    <Col xs="10" sm="10" lg="4">
                        <Form.Group className="mb-3" controlId="cardNumber">
                            <Form.Control type="text" id='cardNumber' name='cardNumber' value={this.model.cardNumber} placeholder="Numero de tarjeta" />
                        </Form.Group>
                    </Col>
                    <Col xs="2" sm="2" lg="2">
                        <Button variant="primary" onClick={this.getCard}>
                            Generar
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" sm="4" lg="2">
                        <Form.Group className="mb-3" controlId="venc">
                            <Form.Control type="text" id='venc' name='venc' value={this.model.venc} placeholder="Vencimiento" />
                        </Form.Group>
                    </Col>
                    <Col xs="6" sm="4" lg="2">
                        <Form.Group className="mb-3" controlId="cvv">
                            <Form.Control type="text" id='cvv' name='cvv' value={this.model.cvv} placeholder="cvv" />
                        </Form.Group>
                    </Col>
                    <Col xs="6" sm="4" lg="2">
                        <Form.Group className="mb-3" controlId="pin">
                            <Form.Control type="text" id='pin' name='pin' value={this.model.pin} placeholder="pin" />
                        </Form.Group>
                    </Col>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Row>

             </Form>

      </Container>
    )

  }
}
