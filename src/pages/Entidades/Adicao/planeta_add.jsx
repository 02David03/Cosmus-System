import React, {Component}  from 'react';
import { withRouter } from 'react-router-dom';
import fire from "../../../config/Fire";
import "./styles.css";


class PlanetaAdd extends Component{

    constructor(props){
        
        super(props);
        this.getInput = this.getInput.bind(this);
        this.setInput = this.setInput.bind(this);
        this.state = {
                nome : "",
                tamanho : "",
                peso : "",
                vel_rotacao: "",
                sistema_planetario_nome : "",
                sistema_planetario : [],
                comp_planeta: ""
        }
    }

    async componentDidMount() {
        const db = fire.firestore()
        await db.collection("sistema_planetario").get().then(querySnapshot =>{
        var sistema_plan = [];
            querySnapshot.forEach(doc => {
            sistema_plan.push({...doc.data(), ...{id:doc.id}});
            });
            this.setState({sistema_planetario : sistema_plan})
        });
    }

    
    getInput(event) {
        if (event.target.name === "nome"){
            this.setState({nome : event.target.value})
        } else if (event.target.name === "peso"){
            this.setState({peso : event.target.value})
        } else if (event.target.name === "tamanho") {
            this.setState({tamanho : event.target.value})
        } else if (event.target.name === "vel_rotacao"){
            this.setState({vel_rotacao : event.target.value})
        } else if (event.target.name === "sistema_plan") {
            this.setState({sistema_planetario_nome : event.target.value})
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
        const Sistemas = this.state.sistema_planetario;
        return(
            <div className = "edicao">
                <form onSubmit = {this.setInput} >
                    <div className = "Title"> Nome: </div>
                    <div className = "Input"> <input type = "text" name = "nome" value = {this.state.nome} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Peso: </div> 
                    <div className = "Input"> <input type="text" name = "peso" value = {this.state.peso} onChange = {this.getInput}/>  </div> <br/>
                    <div className = "Title"> Tamanho: </div> 
                    <div className = "Input"> <input type="text" name = "tamanho" value = {this.state.tamanho} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Velocidade de Rotação: </div> 
                    <div className = "Input"> <input type="text" name = "vel_rotacao" value = {this.state.vel_rotacao} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Composição do Planeta: </div> 
                    <div className = "Input"> <input type="text" name = "comp_planeta" value = {this.state.comp_planeta} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Sistema Planetario: </div> 
                    <div className = "Input"> <select name="sistema_plan" onChange = {this.getInput}>
                    <option value = "-"> - </option>
                    {Sistemas.map (item => ( <option key = {item.id} name = {item.nome} value = {item.nome}> {item.nome} </option>))} </select> </div> <br/>
                    <div className = "edit"> <input type="submit"/></div> 
                </form>
            </div>
        )
    }
}

export default withRouter(PlanetaAdd);