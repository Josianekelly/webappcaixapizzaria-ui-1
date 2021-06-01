import React from 'react'
import URL_API from '../../service/service-api';
import { withRouter} from 'react-router-dom';

class ListaLancamento extends React.Component {
    static displayName = "Lista Lançamentos de Caixa";

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
            fetch(URL_API + '/api/caixalancamentos' + id, {method : 'delete'})
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
                    {caixalancamentos.reverse().map(caixalancamento =>
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
        
                {contents}
            </div>
        );
    }

    async populaCaixaLancamentoData() {
        
        var idcx = this.props.match.params["id"]
        const response = await fetch(URL_API + '/api/caixalancamentos/caixa/'+idcx+'/lancamento');
        const data = await response.json();
        this.setState({caixalancamentos : data, loading: false});
    }
}
export default withRouter(ListaLancamento)
