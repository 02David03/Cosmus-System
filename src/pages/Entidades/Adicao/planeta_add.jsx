import React, {Component}  from 'react';
import { withRouter } from 'react-router-dom';
import fire from "../../../config/Fire";


class PlanetAdd extends Component{
    
    constructor(props){
        super(props);
        this.getInput = this.getInput.bind(this);
        this.setInput = this.setInput.bind(this);
        this.state = {
                nome : "",
                tamanho : "",
                peso : "",
                vel_rotacao : "",
                comp_planeta : "",
        }
    }
    
    getInput(event) {
        if (event.target.name === "nome"){
            this.setState({nome : event.target.value})
        } else if (event.target.name === "tamanho") {
            this.setState({tamanho : event.target.value})
        } else if (event.target.name === "peso"){
            this.setState({peso : event.target.value})
        } else if (event.target.name === "vel_rotacao") {
            this.setState({vel_rotacao : event.target.value})
        } else if (event.target.name === "comp_planeta"){
            this.setState({comp_planeta : event.target.value})
        }

    }
    redirectToPlanet = () => {
        const {history} = this.props;
        if (history) history.push('/Planeta');
    }

    setInput() {
        const db = fire.firestore();
        const newPlanet = db.collection("planets").doc();
        newPlanet.set( 
           this.state
        );
        this.redirectToPlanet();  
    }   

    
    render(){ 
        return(
            <div className = "edicao">
                <form onSubmit = {this.setInput} >
                    <div className = "Title"> Nome: </div>
                    <div className = "Input"> <input type = "text" name = "nome" value = {this.state.nome} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Tamanho: </div> 
                    <div className = "Input"> <input type="text" name = "tamanho" value = {this.state.tamanho} onChange = {this.getInput}/>  </div> <br/>
                    <div className = "Title"> Massa: </div> 
                    <div className = "Input"> <input type="text" name = "peso" value = {this.state.peso} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Velocidade de rotação: </div> 
                    <div className = "Input"> <input type="text" name = "vel_rotacao" value = {this.state.vel_rotacao} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Composição: </div> 
                    <div className = "Input"> <input type="text" name = "comp_planeta" value = {this.state.comp_planeta} onChange = {this.getInput} /> </div> <br/>
                    <div className = "edit"> <input type="submit"/></div> 
                </form>
            </div>
        )
    }
}

export default withRouter(PlanetAdd);