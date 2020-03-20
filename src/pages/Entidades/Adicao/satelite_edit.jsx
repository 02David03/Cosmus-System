import React, {Component}  from 'react';
import { withRouter } from 'react-router-dom';
import fire from "../../../config/Fire";


class SateliteEdit extends Component{
    
    constructor(props){
        super(props);
        this.getInput = this.getInput.bind(this);
        this.setInput = this.setInput.bind(this);
        this.state = {
                nome : "",
                peso : "",
                tamanho : "",
                composicao : "",
                orbita : "",
        }
    }
    
    getInput(event) {
        if (event.target.name === "nome"){
            this.setState({nome : event.target.value})
        } else if (event.target.name === "peso"){
            this.setState({peso : event.target.value})
        } else if (event.target.name === "tamanho") {
            this.setState({tamanho : event.target.value})
        } else if (event.target.name === "composicao"){
            this.setState({composicao : event.target.value})
        } else if (event.target.name === "orbita"){
            this.setState({orbita : event.target.value})
        }

    }
    redirectToSatelite = () => {
        const {history} = this.props;
        if (history) history.push('/Satelite-Natural');
    }

    setInput() {
        const db = fire.firestore();
        const newPlanet = db.collection("satelite").doc(this.props.match.params.id);
        newPlanet.set( 
           this.state
        );
        this.redirectToSatelite();  
    }   

    
    render(){ 
        return(
            <div className = "edicao">
                <form onSubmit = {this.setInput} >
                    <div className = "Title"> Nome: </div>
                    <div className = "Input"> <input type = "text" name = "nome" value = {this.state.nome} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Massa: </div> 
                    <div className = "Input"> <input type="text" name = "peso" value = {this.state.peso} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Tamanho: </div> 
                    <div className = "Input"> <input type="text" name = "tamanho" value = {this.state.tamanho} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Composição: </div> 
                    <div className = "Input"> <input type="text" name = "composicao" value = {this.state.composicao} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Planeta orbitado: </div> 
                    <div className = "Input"> <input type="text" name = "orbita" value = {this.state.orbita} onChange = {this.getInput} /> </div> <br/>
                    <div className = "edit"> <input type="submit"/></div> 
                </form>
            </div>
        )
    }
}

export default withRouter(SateliteEdit);