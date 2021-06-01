import React from 'react';
import './Login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import MontaDropDownLogin from './montadropdownlogin';
import { alert } from 'bootstrap';
import URL_API from '../../service/service-api'
//import { response } from 'express';

export class Login extends React.Component {
    constructor() {
        super();
        this.state = { senha: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(evento) {
        alert('cliquei log in:' + this.state.senha);
        //        alert('senha banco:' + Item.fun  )
        const idfun = 1;
        const urlfun = URL_API + '/api/funcionarios/' + idfun;
        fetch(urlfun).then(response => {
            return response.json();
        }).then(data => {
            const senhadb = document.querySelector("fun_senha");
            alert(senhadb)
            //              atribuirCampos(data)
        })
        //        alert(data)
    }

    //    async atribuirCampos(data) {
    //        const senha = await document.querySelector("fun_senha");
    //        Alert(senha)
    //        
    //    }

    render() {
        return (
            <body>
                <div className="row-fluid">
                    <div class="card mx-auto shadow -lg p-5 mb-5 bg-white rounded animate_animated animate_zoomIn">
                        <Form className="login-form" onSubmit={this.handleSubmit}>

                            <h3 className="text-center font-weight-bold">Acesso ao sistema</h3>

                            <br />
                            <FormGroup>
                                <Label>Login</Label>
                                <div className="form-group">
                                    {< MontaDropDownLogin />}
                                </div>
                            </FormGroup>
                            <br />

                            <FormGroup>
                                <Label>Senha</Label>
                                <Input name="senha" type="password" placeholder="Insira sua senha" onChange={e => this.setState({ senha: e.target.value })}></Input>
                            </FormGroup>
                            <br />
                           
                                <Button className="col-md-12 btn-lg btn-dark btn-block" type="submit" value="Enviar">Acessar</Button>
                           
                        </Form>
                    </div>
                </div>

            </body>
        );
    }
}
