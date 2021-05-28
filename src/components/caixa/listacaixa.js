import React, { Component } from 'react'
import URL_API from '../../service/service-api';
import { withRouter } from 'react-router-dom';


class ListaCaixa extends Component {
    static displayName = "Lista de Abertura/Fechamento de Caixas";

    constructor() {
        super();
        this.state = { caixacontroles: [], loading: true }
    }

    componentDidMount() {
        this.populaCaixacontroleData();
    }

    static handleEdit(id) {
        window.location.href = "/caixa-fechamento/edit/" + id;
    }

    static handleLancamento(id) {
        window.location.href = "/caixa-lancamento/" + id;
    }

    static handleRecebecomanda(id) {
        window.location.href = "/caixa-recebe/" + id;
    }
    static handleLancasangria(id) {
        window.location.href = "/caixa-sangria/" + id;
    }


    static renderCaixacontrolesTabela(caixacontroles) {

        return (
           <div className="row">
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead className="thead-dark">
                    <tr>
                        <th>Código</th>
                        <th>Data/Hora Abertura</th>
                        <th>Func</th>
                        <th>Valor Fundo </th>
                        <th>Data/Hora Fechamento</th>
                        <th>Valor Final </th>
                        <th>Flag Fechado</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {caixacontroles.reverse().map(caixacontrole =>
                        <tr key={caixacontrole.id}>
                            <td> {caixacontrole.id} </td>
                            <td>{caixacontrole.datahoraabertura} </td>
                            <td>{caixacontrole.idfuncionario}</td>
                            <td>{caixacontrole.valorfundocaixa}</td>
                            <td>{caixacontrole.datahorafechamento}</td>
                            <td>{caixacontrole.valorfinalcaixa}</td>
                            <td>{caixacontrole.flagcaixafechado}</td>

                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(caixacontrole.id)}>Fechar Caixa</button> &nbsp;
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={(id) => this.handleLancamento(caixacontrole.id)}>Ver Lancamentos</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={(id) => this.handleRecebecomanda(caixacontrole.id)}>Receber Comanda</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={(id) => this.handleLancasangria(caixacontrole.id)}>Lanca Sangria</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : ListaCaixa.renderCaixacontrolesTabela(this.state.caixacontroles);

        return (
            <div>
                <h1 id="tabelLabel" >Controles de Caixas</h1>
             <br/>
                {contents}
            </div>
        );
    }

    async populaCaixacontroleData() {
        const response = await fetch(URL_API + '/api/caixacontroles');
        const data = await response.json();
        this.setState({ caixacontroles: data, loading: false });
    }
}

export default withRouter(ListaCaixa);