import React, {Component}  from 'react';
import { withRouter } from 'react-router-dom';
import fire from "../../../config/Fire";


class EstrelaAdd extends Component{
    
    constructor(props){
        super(props);
        this.getInput = this.getInput.bind(this);
        this.setInput = this.setInput.bind(this);
        this.state = {
                nome : "",
                dist_terra : "",
                tamanho : "",
                Idade : "",
                planeta_orbitante : "",
                satelite_orbitante : "",
                sistema_planetario : "",
                tipo : ""
        }
    }
    
    getInput(event) {
        if (event.target.name === "nome"){
            this.setState({nome : event.target.value})
        } else if (event.target.name === "dist_terra"){
            this.setState({dist_terra : event.target.value})
        } else if (event.target.name === "tamanho") {
            this.setState({tamanho : event.target.value})
        } else if (event.target.name === "idade"){
            this.setState({Idade : event.target.value})
        } else if (event.target.name === "planeta_orbitante"){
            this.setState({planeta_orbitante : event.target.value})
        } else if (event.target.name === "satelite_orbitante"){
            this.setState({satelite_orbitante : event.target.value})
        } else if (event.target.name === "tipo"){
            this.setState({tipo : event.target.value})
        }
    }
    redirectToStar = () => {
        const {history} = this.props;
        if (history) history.push('/Estrela');
    }

    setInput() {
        const db = fire.firestore();
        const newPlanet = db.collection("estrela").doc();
        newPlanet.set( 
           this.state
        );
        this.redirectToStar();  
    }   

    
    render(){ 
        return(
            <div className = "edicao">
                <form onSubmit = {this.setInput} >
                    <div className = "Title"> Nome: </div>
                    <div className = "Input"> <input type = "text" name = "nome" value = {this.state.nome} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Distância da terra: </div> 
                    <div className = "Input"> <input type="text" name = "dist_terra" value = {this.state.dist_terra} onChange = {this.getInput}/>  </div> <br/>
                    <div className = "Title"> Tamanho: </div> 
                    <div className = "Input"> <input type="text" name = "tamanho" value = {this.state.tamanho} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Idade: </div> 
                    <div className = "Input"> <input type="text" name = "idade" value = {this.state.Idade} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Planeta Orbitante: </div> 
                    <div className = "Input"> <input type="text" name = "planeta_orbitante" value = {this.state.planeta_orbitante} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Satelite Orbitante: </div> 
                    <div className = "Input"> <input type="text" name = "satelite_orbitante" value = {this.state.satelite_orbitante} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Tipo de Estrela: </div> 
                    <div className = "Input"> <input type="text" name = "tipo" value = {this.state.tipo} onChange = {this.getInput} /> </div> <br/>
                    <div className = "edit"> <input type="submit"/></div> 
                </form>
            </div>
        )
    }
}

export default withRouter(EstrelaAdd);