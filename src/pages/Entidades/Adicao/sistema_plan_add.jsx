import React, {Component}  from 'react';
import { withRouter } from 'react-router-dom';
import fire from "../../../config/Fire";
import "./styles.css";


class Sistema_planAdd extends Component{
    
    constructor(props){
        super(props);
        this.getInput = this.getInput.bind(this);
        this.setInput = this.setInput.bind(this);
        this.state = {
                nome : "",
                id : "",
                planeta : "",
                idade : "",
                estrela : "",
                galaxia : "",
                qtd_estrelas : 0,
                qtd_planetas : 0
        }
    }
    
    getInput(event) {
        if (event.target.name === "nome"){
            this.setState({nome : event.target.value})
        } else if (event.target.name === "id"){
            this.setState({id : event.target.value})
        } else if (event.target.name === "planeta") {
            this.setState({planeta : event.target.value})
        } else if (event.target.name === "idade"){
            this.setState({idade : event.target.value})
        } else if (event.target.name === "estrela"){
            this.setState({estrela : event.target.value})
        } else if (event.target.name === "galaxia"){
            this.setState({galaxia : event.target.value})
        } else if (event.target.name === "qtd_estrelas"){
            this.setState({qtd_estrelas : event.target.value})
        } else if (event.target.name === "qtd_planetas"){
            this.setState({qtd_planetas : event.target.value})
        }
    }
    redirectToSystem = () => {
        const {history} = this.props;
        if (history) history.push('/Sistema-Planetario');
    }

    setInput() {
        const db = fire.firestore();
        const newPlanet = db.collection("sistema_planetario").doc();
        newPlanet.set( 
           this.state
        );
        this.redirectToSystem();  
    }   

    
    render(){ 
        return(
            <div className = "edicao">
                <form onSubmit = {this.setInput} >
                    <div className = "Title"> Nome: </div>
                    <div className = "Input"> <input type = "text" name = "nome" value = {this.state.nome} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Planetas Pertencentes: </div> 
                    <div className = "Input"> <input type="text" name = "planeta" value = {this.state.planeta} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Idade: </div> 
                    <div className = "Input"> <input type="text" name = "idade" value = {this.state.idade} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Estrelas: </div> 
                    <div className = "Input"> <input type="text" name = "estrela" value = {this.state.estrela} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Galaxias: </div> 
                    <div className = "Input"> <input type="text" name = "galaxia" value = {this.state.galaxia} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Quantidade de Estrelas: </div> 
                    <div className = "Input"> <input type="text" name = "qtd_estrelas" value = {this.state.qtd_estrelas} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Quantidade de Planetas: </div> 
                    <div className = "Input"> <input type="text" name = "qtd_planetas" value = {this.state.qtd_planetas} onChange = {this.getInput} /> </div> <br/>
                    <div className = "edit"> <input type="submit"/></div> 
                </form>
            </div>
        )
    }
}

export default withRouter(Sistema_planAdd);