import React, { Component, setState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap';

export default class ListClient extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: []
    };
    this.handleGetClients();
  }


  

  async handleGetClients(){
    let res = await fetch("http://localhost:5000/api/user/list", {
        method: "GET",
        headers: { 
            "Access-Control-Allow-Origin": '*',
            Accept: 'application/json'
        },
    });
    var data = (await res.json()).data;
    this.setState({tableData: data});
  }


  render() {
    
    const state = this.state;
    const { tableData } = state;

    return(
      <Container>
        <div container m-5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Seg. Nombre</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Nacimiento</th>
                <th>Estatus</th>
                <th>Analista</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(item => {
                return (
                  <tr key={item._id}>
                    <td>{ item.id }</td>
                    <td>{ item.name }</td>
                    <td>{ item.secondName }</td>
                    <td>{ item.email }</td>
                    <td>{ item.phone }</td>
                    <td>{ item.birth.split('T')[0] }</td>
                    <td>{ item.status }</td>
                    <td>{ item.analist }</td>
                  </tr>
                );
              })}
            </tbody>          
          </Table>
        </div>

      </Container>
    )

  }
}
