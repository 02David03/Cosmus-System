import React, {Component}  from 'react';
import { withRouter } from 'react-router-dom';
import fire from "../../../config/Fire";
import "./styles.css";


class GalaxiaAdd extends Component{
    
    constructor(props){
        super(props);
        this.getInput = this.getInput.bind(this);
        this.setInput = this.setInput.bind(this);
        this.state = {
                nome : "",
                dist_terra : "",
                qt_sistema : 0
        }
    }

    getInput(event) {
        if (event.target.name === "nome"){
            this.setState({nome : event.target.value})
        } else if (event.target.name === "dist_terra"){
            this.setState({dist_terra : event.target.value})
        } else if (event.target.name === "sistema_plan"){
            this.setState({sistema_plan : event.target.value})
        }
    }

    redirectToGalaxy = () => {
        const {history} = this.props;
        if (history) history.push('/Galaxia');
    }

    setInput() {
        const db = fire.firestore();
        const newPlanet = db.collection("galaxia").doc();
        newPlanet.set( 
           this.state
        );
        this.redirectToGalaxy();  
    }   

    
    render(){ 
        return(
            <div className = "edicao">
                <form onSubmit = {this.setInput} >
                    <div className = "Title"> Nome: </div>
                    <div className = "Input"> <input type = "text" name = "nome" value = {this.state.nome} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Distância da terra: </div> 
                    <div className = "Input"> <input type="text" name = "dist_terra" value = {this.state.dist_terra} onChange = {this.getInput}/>  </div> <br/>
                    <div className = "edit"> <input type="submit"/></div> 
                </form>
            </div>
        )
    }
}

export default withRouter(GalaxiaAdd);