import React, {Component}  from 'react';
import { withRouter } from 'react-router-dom';
import fire from "../../../config/Fire";
import "./styles.css";


class OrbitaEdit extends Component{
    
    constructor(props){
        super(props);
        this.getInput = this.getInput.bind(this);
        this.setInput = this.setInput.bind(this);
        this.state = {
            nome : "",
            Planetas: [],
            planeta_id : "",
            planeta_name : "",
            Estrelas: [],
            estrela_id : "",
            estrela_name : "",
            Satelites: [],
            satelite_id : "",
            satelite_name :""
        }
    }

    async componentDidMount(){
        const db = fire.firestore()
        db.collection("planets").get().then(querySnapshot =>{
        var planetas = [];
            querySnapshot.forEach(doc => {
            planetas.push({...doc.data(), ...{id:doc.id}});
            });
            this.setState({Planetas : planetas})
        });
        db.collection("estrela").get().then(querySnapshot =>{
            var estrelas = [];
                querySnapshot.forEach(doc => {
                estrelas.push({...doc.data(), ...{id:doc.id}});
            });
            this.setState({Estrelas : estrelas})
        });
        db.collection("satelite").get().then(querySnapshot =>{
            var satelites = [];
                querySnapshot.forEach(doc => {
                satelites.push({...doc.data(), ...{id:doc.id}});
            });
            this.setState({Satelites : satelites})
        });
    }
    
    getInput(event) {
        if (event.target.name === "nome"){
            this.setState({nome : event.target.value})
        } else if (event.target.name === "planetas") {
            const res = event.target.value.split(" ", 2);
            this.setState({planeta_id : res[0]})
            this.setState({planeta_name : res[1]})
        } else if (event.target.name === "estrelas"){
            const res = event.target.value.split(" ", 2);
            this.setState({estrela_id : res[0]})
            this.setState({estrela_name : res[1]})
        } else if (event.target.name === "satelites") {
            const res = event.target.value.split(" ", 2);
            this.setState({satelite_name : res[1]})
            this.setState({satelite_id : res[0]})
        }
    }
    redirectToOrbit = () => {
        const {history} = this.props;
        if (history) history.push('/Orbitas');
    }

    setInput() {
        const id = window.location.href.split("/",5);
        const db = fire.firestore()
        const newPlanet = db.collection("orbita").doc(id[4]);
        newPlanet.set( 
           this.state
        );
        this.redirectToOrbit();  
    }   

    render(){ 
        const Planetas = this.state.Planetas;
        const Estrelas = this.state.Estrelas;
        const Satelites = this.state.Satelites;
        return(
            <div className = "edicao">
                <form onSubmit = {this.setInput} >
                    <div className = "Title"> Nome: </div>
                    <div className = "Input"> <input type = "text" name = "nome" value = {this.state.nome} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Planeta: </div>
                    <div className = "Input"> <select name = "planetas" onChange = {this.getInput}>
                    <option value = ""> - </option>
                    {Planetas.map (item => (<option key = {item.id} name = {item.nome} value = {item.id + " " + item.nome} > {item.nome}</option>))} </select></div> <br/>
                    <div className = "Title"> Estrela: </div> 
                    <div className = "Input"> <select name = "estrelas" onChange = {this.getInput}>
                    <option value = "-"> - </option>
                    {Estrelas.map (item => (<option key = {item.id} name = {item.nome} value = {item.id + " " + item.nome}> {item.nome}</option>))} </select></div> <br/>
                    <div className = "Title"> Satelites: </div> 
                    <div className = "Input"> <select name = "satelites" onChange = {this.getInput}>
                    <option value = "-"> - </option>
                    {Satelites.map (item => (<option key = {item.id} name = {item.nome} value = {item.id + " " + item.nome}> {item.nome}</option>))} </select></div> <br/>
                    <div className = "edit"> <input type="submit"/></div> 
                </form>
            </div>
        )
    }
}

export default withRouter(OrbitaEdit);