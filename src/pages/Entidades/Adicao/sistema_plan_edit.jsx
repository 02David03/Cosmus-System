import React, {Component}  from 'react';
import { withRouter } from 'react-router-dom';
import fire from "../../../config/Fire";
import "./styles.css";


class SistemaAdd extends Component{
    
    constructor(props){
        super(props);
        this.getInput = this.getInput.bind(this);
        this.setInput = this.setInput.bind(this);
        this.state = {
            nome : "",
            idade : "",
            Galaxias : [],
            galaxia_nome : "",
            galaxia_id : "",
            cont_plan : 0,
            cont_star : 0
        }
    }

    async componentDidMount(){
        const db = fire.firestore()
        db.collection("galaxia").get().then(querySnapshot =>{
        var galaxias = [];
            querySnapshot.forEach(doc => {
            galaxias.push({...doc.data(), ...{id:doc.id}});
            });
            this.setState({Galaxias : galaxias})
        });
    }
    
    getInput(event) {
        if (event.target.name === "nome"){
            this.setState({nome : event.target.value})
        } else if (event.target.name === "idade"){
            this.setState({idade : event.target.value})
        } else if (event.target.name === "Galaxia") {
            const res = event.target.value.split(" ", 2);
            this.setState({galaxia_id : res[0]})
            this.setState({galaxia_nome : res[1]})
        }
    }
    redirectToSist = () => {
        const {history} = this.props;
        if (history) history.push('/Sistema-Planetario');
    }

    setInput() {
        if (this.state.galaxia_nome === ""){
            alert("Não é possível criar um sistema Planetário sem uma Galáxia")
        } else {
            const db = fire.firestore()
            const newPlanet = db.collection("sistema_planetario").doc(this.props.match.params.id);
            newPlanet.set( 
                this.state
            );
            this.redirectToSist();  
        }
    }   

    render(){ 
        const Galaxias = this.state.Galaxias;
        return(
            <div className = "edicao">
                <form onSubmit = {this.setInput} >
                    <div className = "Title"> Nome: </div>
                    <div className = "Input"> <input type = "text" name = "nome" value = {this.state.nome} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Idade: </div>
                    <div className = "Input"> <input type = "text" name = "idade" value = {this.state.idade} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Input"> <select name = "Galaxia" onChange = {this.getInput}>
                    <option value = ""> - </option>
                    {Galaxias.map (item => (<option key = {item.id} name = {item.nome} value = {item.id + " " + item.nome} > {item.nome}</option>))} </select></div> <br/>
                    <div className = "edit"> <input type="submit"/></div> 
                </form>
            </div>
        )
    }
}

export default withRouter(SistemaAdd);