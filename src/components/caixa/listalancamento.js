import React, { Component } from 'react'
import URL_API from '../../service/service-api';
import {withRouter} from 'react-router-dom';

export class ListaLancamento extends Component {
    static displayName = "Lista de Lançamentos de Caixa";

    constructor(props) {
        super(props);
        this.state = { caixalancamentos: [], loading: true}
    }

    componentDidMount() {
        this.populaCaixaLancamentoData();
    }

    static handleDelete(id) {
        if (!window.confirm("Deseja deletar lançamento :" + id)) {
            return;
        }
        else {
            fetch(URL_API + '/api/caixalancamentoes' + id, {method : 'delete'})
                .then(json => {
                    alert('Deletado com sucesso!');
                })
        }
    }

    static renderCaixaLancamentoTabela(caixalancamentos) {
        
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
              <thead>
                    <tr>
                        <th>Código</th>
                        <th>Caixa</th>
                        <th>Comanda</th>
                        <th>Data</th>
                        <th>Valor</th>
                        <th>E/S</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {caixalancamentos.map(caixalancamento =>
                        <tr key={caixalancamento.id}>
                            <td>{caixalancamento.id}</td>
                            <td>{caixalancamento.idcaixacontrole}</td>
                            <td>{caixalancamento.comanda}</td>
                            <td>{caixalancamento.datahora}</td>
                            <td>{caixalancamento.valor}</td>
                            <td>{caixalancamento.tipolancamento}</td>

                            <td>
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(caixalancamento.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render () {
        let contents = this.state.loading
        ? <p><em>Carregando...</em></p>
        : ListaLancamento.renderCaixaLancamentoTabela(this.state.caixalancamentos);

        return(
            <div>
                <h1 id="tabelLabel" >Lançamentos do caixa</h1>
                <p>
                    
                </p>
                {contents}
            </div>
        );
    }

    async populaCaixaLancamentoData() {
        
        var idcx = this.props.match.params["id"]
        alert(idcx)
        alert('chamada com filtro:' + URL_API + '/api/caixalancamentoes/caixa/'+idcx+'/lancamento')
        const response = await fetch(URL_API + '/api/caixalancamentoes/caixa/'+idcx+'/lancamento');
        const data = await response.json();
        this.setState({caixalancamentos : data, loading: false});
    }
}
export default withRouter(ListaLancamento)
