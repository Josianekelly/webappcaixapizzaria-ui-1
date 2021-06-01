import React, { Component } from 'react'
import URL_API from '../../service/service-api';

export class ListaFuncionario extends Component {
    static displayName = "Lista de Funcionarios";

    constructor() {
        super();
        this.state = { funcionarios: [], loading: true }
    }

    componentDidMount() {
        this.populaFuncionarioData();
    }

    static handleEdit(id) {
        window.location.href = "/funcionario/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Deseja deletar funcionario :" + id)) {
            return;
        }
        else {
            fetch(URL_API + '/api/funcionarios' + id, { method: 'delete' })
                .then(json => {
                    alert('Deletado com sucesso!');
                })
        }
    }

    static renderFuncionariosTabela(funcionarios) {

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead className="thead-dark">
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map(funcionario =>
                        <tr key={funcionario.id}>
                            <td> {funcionario.id} </td>
                            <td>{funcionario.fun_nome} </td>

                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(funcionario.id)}>Editar</button> &nbsp;

                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(funcionario.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : ListaFuncionario.renderFuncionariosTabela(this.state.funcionarios);

        return (
            <div>
                <h1 id="tabelLabel" >Funcionarios</h1>
                <p>

                </p>
                {contents}
            </div>
        );
    }

    async populaFuncionarioData() {
        const response = await fetch(URL_API + '/api/funcionarios');
        const data = await response.json();
        this.setState({ funcionarios: data, loading: false });
    }
}
