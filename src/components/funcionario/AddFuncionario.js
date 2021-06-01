import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import URL_API from '../../service/service-api';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class AddFuncionario extends React.Component {
    constructor(props) {
        super();
        this.state = {
            id: 0,
            fun_nome: '',
            fun_chapeira: '',
            fun_login: '',
            fun_senha: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(evento) {
        const data = JSON.stringify(this.state)
        evento.preventDefault();

        fetch(URL_API + '/api/funcionarios', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        }).then(function (response) {
            toast.success('Dados cadastrados com sucesso')
            return response.json();
        }).catch(function (erro) {
            toast.error('Erro ao cadastrar')
        })
    }

    render() {
        return (
            <div class="container-fluid">
                <ToastContainer />
                <div class="card-form mx-auto shadow -lg p-5 mb-5 bg-white rounded animate_animated animate_zoomIn">
                    <h3 className="font-weight-bold">Funcionários</h3>

                    <br />
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <FormGroup>

                                    <Label htmlFor="nome">Nome:</Label>

                                    <Input
                                        required="required"
                                        name="fun_nome"
                                        type="text"
                                        value={this.state.fun_nome}
                                        onChange={e => this.setState({ fun_nome: e.target.value })}

                                    />
                                    
                                </FormGroup>
                                <br />
                                <FormGroup>
                                    <Label htmlFor="chapeira">Chapeira:</Label>

                                    <Input
                                        required="required"
                                        name="fun_chapeira"
                                        type="text"
                                        value={this.state.fun_chapeira}
                                        onChange={e => this.setState({ fun_chapeira: e.target.value })}

                                    />
                                </FormGroup>
                                <br />
                                <FormGroup>
                                    <Label htmlFor="login">Login:</Label>

                                    <Input
                                        required="required"
                                        name="fun_login"
                                        type="text"
                                        value={this.state.fun_login}
                                        onChange={e => this.setState({ fun_login: e.target.value })}

                                    />
                                </FormGroup>
                                <br />
                                <FormGroup>
                                    <Label htmlFor="senha">Senha:</Label>
                                    <Input
                                        required="required"
                                        name="fun_senha"
                                        type="password"
                                        value={this.state.fun_senha}
                                        onChange={e => this.setState({ fun_senha: e.target.value })}

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