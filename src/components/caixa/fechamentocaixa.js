import React from 'react';
import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import URL_API from '../../service/service-api'
import { withRouter} from 'react-router-dom';
//import { response } from 'express';

export class Caixacontrole {
    construtor(){
        this.state = {
            datahorafechamento: null,
            valorfinalcaixa: null
        }
    }
}

class FechamentoCaixa extends React.Component {

    constructor(props) {
        super(props);
        this.state = {caixacontrole: new Caixacontrole(), loading: true };
        this.inicialize();
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSalve = this.handleSalve.bind(this);
    }

    async inicialize() {

        var idcx = this.props.match.params["id"]
    
        if (idcx > 0) {
            const response = await fetch(URL_API + '/api/caixacontroles/' + idcx);
            const data = await response.json();
            
            this.state.id = data.id
            this.state.datahoraabertura = data.datahoraabertura
            this.state.idfuncionario = data.idfuncionario
            this.state.valorfundocaixa = data.valorfundocaixa
            
            this.setState({ title: "Edit", caixacontrole: data, loading: false });

//            alert('id>0' + this.state )
        }
        else {
            this.state = { title: "Create", caixacontrole: new Caixacontrole(), loaging: false };
        }
    } 

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/caixa-controle")
    }

    async handleSalve(event) {
        event.preventDefault();
        const idcx = this.props.match.params["id"]
        const novoObject = {
          id: idcx, 
          datahoraabertura: this.state.datahoraabertura,
          idfuncionario: this.state.idfuncionario,
          valorfundocaixa: this.state.valorfundocaixa,
          datahorafechamento: this.state.datahorafechamento,
          valorfinalcaixa: this.state.valorfinalcaixa,
          flagcaixafechado: 1
        }

        const dataput = JSON.stringify(novoObject)
        alert('novo objeto:' + dataput);
        if (idcx > 0) {
          await fetch(URL_API + '/api/caixacontroles/' + idcx, {
            method: "PUT",
            body: dataput,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          this.props.history.push("/caixa-controle");
        } else {
          await fetch(URL_API + 'api/caixacontroles/', {
            method: "POST",
            body: dataput,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          this.props.history.push("/caixa-controle");
        }
      }

    render() {
        return(
            <div class="container-fluid">

                <ToastContainer />
                <div class="card-form mx-auto shadow -lg p-5 mb-5 mt-5 bg-white rounded animate_animated animate_zoomIn">
                   
                        <h3 className="font-weight-bold">Fechamento de Caixa</h3>
                  
                    <br />
                    <Form onSubmit={this.handleSalve}>
                        <div className="row">
                        <div className="col-12">
                            <FormGroup>
                                <Label>Data/Hora Fechamento:</Label>
                                <Input
                                    required="required"
                                    name="datahorafechamento"
                                    type="datetime-local"
                                    onChange={e => this.setState({ datahorafechamento: e.target.value })}
                                />
                            </FormGroup>
                            <br />
                            <FormGroup>
                                <Label>Valor Final:</Label>
                                <Input
                                    required="required"
                                    name="valorfinalcaixa"
                                    type="float"
                                    onChange={e => this.setState({ valorfinalcaixa: e.target.value })}
                                />
                            </FormGroup>

                            <br />
                            <Button className="offset-md-8 col-md-4 btn-lg btn-dark btn-block" type="submit" value="Enviar">Confirmar</Button>
                        </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
export default withRouter(FechamentoCaixa)