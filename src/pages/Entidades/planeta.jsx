import React, {Component}  from 'react';
import "./styles.css";
import fire from "../../config/Fire";
import { Link } from 'react-router-dom';

export default class Planets extends Component{
    constructor(props){
        super(props);
        this.state = {
            documents : [],
        }
    }
    
    async componentDidMount(){
        const db = fire.firestore()
        db.collection("planets").get().then(querySnapshot =>{
        var documento = [];
            querySnapshot.forEach(doc => {
            documento.push({...doc.data(), ...{id:doc.id}});
        });
        this.setState({documents : documento})
    });
    }

    
     
    render(){
        const planet = this.state.documents;
        
        return(
            <div className = "planeta">
                <ul>
                    {planet.map( planet => (
                        <li className = "card" key = {planet.id}>
                            <div className = "planet-name"> {planet.nome}</div> <br/>
                            <div className = "card-text"> Tamanho: </div> 
                            <div className = "card-planet"> {planet.tamanho}  </div> <br/>
                            <div className = "card-text"> Massa: </div> 
                            <div className = "card-planet"> {planet.peso} </div> <br/>
                            <div className = "card-text"> Velocidade de rotação: </div> 
                            <div className = "card-planet"> {planet.vel_rotacao} </div> <br/>
                            <div className = "card-text"> Composição: </div> 
                            <div className = "card-planet"> {planet.como_planeta} </div> <br/>
                            <div className = "botoes"> 
                                <a href = "#" className = "edit"> Editar </a> 
                                <a href = "#" className = "delete"> Excluir </a>
                            </div>
                        </li>
                    ))}
                    <div className = "card"> <Link to = "./planet_edit" className = "addBtn"> + </Link> </div>
                </ul>
            </div>
        )
    }
    
}