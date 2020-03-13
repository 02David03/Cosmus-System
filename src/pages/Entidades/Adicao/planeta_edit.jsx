import React, {Component}  from 'react';

import fire from "../../../config/Fire";

export default class Planets extends Component{
    constructor(props){
        super(props);
        this.state = {
                nome : "",
                tamanho : "",
                peso : "",
                vel_rotacao : "",
                como_planeta : ""
        }
        
        this.getInput = this.getInput.bind(this);
        this.setInput = this.setInput.bind(this);
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
        } else if (event.target.name === "como_planeta"){
            this.setState({como_planeta : event.target.value})
        }
    }

    setInput() {
        const db = fire.firestore()
        const newPlanet = db.collection("planets").doc()
        newPlanet.set( 
           this.state
        );        
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
                    <div className = "Input"> <input type="text" name = "como_planeta" value = {this.state.nome.como_planeta} onChange = {this.getInput} /> </div> <br/>
                    <div className = "edit"> <input type="submit"/></div> 
                </form>
            </div>
        )
    }
}