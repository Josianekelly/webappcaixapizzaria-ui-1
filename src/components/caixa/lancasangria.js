import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import URL_API from '../../service/service-api';
import { withRouter} from 'react-router-dom';

class AddCaixaSangria extends React.Component {
    constructor(props) {
        super();
        this.state = {
            id: 0,
            idcaixacontrole: 1,
            comanda: 0,
            datahora: '',
            tipolancamento: 'S',
            valor: 0,
            idformapagamento: 1,
            valorrecebido: 0,
            troco: 0,
            observacao: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(evento) {
        try{
            evento.preventDefault();
            var idcx = this.props.match.params["id"]

            const novoObjeto = {
             id: this.state.id, 
             idcaixacontrole: idcx,
             datahora: this.state.datahora,
             tipolancamento: this.state.tipolancamento,
             valor: this.state.valor,
             idformapagamento: this.state.idformapagamento,
             observacao: this.state.observacao,
             comanda: this.state.comanda
            }

            const data = JSON.stringify(novoObjeto)   

            await fetch(URL_API + '/api/caixalancamentoes', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            })
            toast.success('Sangria registrada com sucesso!')
            this.props.history.push("/caixa-controle");
        } catch (erro) {
            toast.error('Erro ao registrar sangria')
        }
    }
        
    render() {
        return (
            <div class="container-fluid">
                <ToastContainer />
                <div class="card-form mx-auto shadow -lg p-5 mb-5 bg-white rounded animate_animated animate_zoomIn">
                   
                        <h3 className="font-weight-bold">Lançamento de Sangria</h3>
                    
                    <br />

                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <FormGroup>
                                    <Label>Data/Hora:</Label>
                                    <Input
                                        required="required"
                                        name="datahora"
                                        type="datetime-local"
                                        onChange={e => this.setState({ datahora: e.target.value })}
                                    />
                                </FormGroup>
                                <br />
                                <FormGroup>
                                    <Label>Valor:</Label>
                                    <Input
                                        required="required"
                                        name="valor"
                                        type="float"
                                        onChange={e => this.setState({ valor: e.target.value })}
                                    />
                                </FormGroup>
                            </div>
                            <br />
                            <div className="col-12">
                                <br />
                                <Button className="offset-md-8 col-md-4 btn-lg btn-dark btn-block" type="submit" value="Receber">Confimar</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
export default withRouter(AddCaixaSangria)