import React, {Component}  from 'react';
import "./styles.css";
import fire from "../../config/Fire";

export default class Planets extends Component{
    constructor(props){
        super(props);
        this.state = {
            documents : []
        }
    }
    
    async componentDidMount(){
        const db = fire.firestore()
        db.collection("sistema_planetario").get().then(querySnapshot =>{
        var documento = [];
            querySnapshot.forEach(doc => {
            documento.push({...doc.data(), ...{id:doc.id}});
            console.log(documento);
        });
        this.setState({documents : documento})
    });
    }
     
    render(){
        const sistema_plan = this.state.documents;
        
        return(
            <div className = "planeta">
                <ul>
                    {sistema_plan.map( item => (
                        <li key = {item.id}>
                            <div className = "planet-name"> {item.nome}</div> <br/>
                            <div className = "card-text"> Estrelas: </div> 
                            <div className = "card-planet"> {item.estrela} </div> <br/>
                            <div className = "card-text"> Galaxia: </div> 
                            <div className = "card-planet"> {item.galaxia} </div> <br/>
                            <div className = "card-text"> Idade: </div> 
                            <div className = "card-planet"> {item.idade} </div> <br/>
                            <div className = "card-text"> Planeta: </div> 
                            <div className = "card-planet"> {item.planeta} </div> <br/>
                            <div className = "botoes"> 
                                <a href = "#" className = "edit"> Editar </a> 
                                <a href = "#" className = "delete"> Excluir </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
    
}