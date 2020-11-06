import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

class NovoPedido extends Component{
    constructor(props){
        super(props);

        this.state = {
            pedido: {
                nomeProd: "",
                precoVenda: null,
                catProduto: null,
                idCliente: ""
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() { 
        const { erro } = this.state;

        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Ops! Erro de conexão com o servidor
                </div>
            );
        }
    }

    render() {
        const {redirect} = this.state;

        if(redirect){
            return <Redirect to="/clientes"/>
            // COLOCAR AQUI TBM UM RETURN QUE NEM O DO FORMS DE BAIXO QUE MOSTRA QUE O PEDIDO FOI FEITO
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Cadastrar novo pedido</legend>
                        <div className="pedido-insert">
                            <label htmlFor="nomeProduto">Produto: </label>
                            <br />
                            <input 
                                type="text" 
                                id= "nomeProd" 
                                name="nomeProd"
                                placeholder="Produto" 
                                minLength="3" 
                                maxLength="100" 
                                required 
                                value={this.state.pedido.nomeProd} 
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-insert"> 
                            <label htmlFor="nomeProduto">Preço: </label>
                            <br />
                            <input 
                                type="text" 
                                id= "precoVenda" 
                                name="precoVenda"
                                placeholder="preço" 
                                minLength="3" 
                                maxLength="100" 
                                required 
                                value={this.state.pedido.precoVenda} 
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-insert"> 
                            <label htmlFor="nomeProduto">Categoria: </label>
                            <br />
                            <input 
                                type="text" 
                                id= "catProduto" 
                                name="catProduto"
                                placeholder="categoria" 
                                minLength="3" 
                                maxLength="100" 
                                required 
                                value={this.state.pedido.catProduto} 
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-insert"> 
                            <label htmlFor="nomeProduto">ID do cliente: </label>
                            <br />
                            <input 
                                type="text" 
                                id= "idCliente" 
                                name="idCliente"
                                placeholder="ID do cliente" 
                                minLength="0" 
                                maxLength="10" 
                                required 
                                value={this.state.pedido.idCliente} 
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Cadastrar Pedido
                        </button>
                    </fieldset>
                </form>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            pedido: {...prevState.pedido, [name]: value}//no campo que tem o atributa "name" do value ele armazena o valor da box
        }));
        console.log(value);
    };

    handleSubmit = event => { // Usar isso na rota /id/produtos para usar a rota pro carrinho com metodo post
        fetch(`http://localhost:3003/sistema/novoPedido/${this.state.pedido.idCliente}`, {
            method: "post",
            body: JSON.stringify(this.state.pedido),
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error ) {
                            this.setState({erro: data.error});
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}

export default NovoPedido;