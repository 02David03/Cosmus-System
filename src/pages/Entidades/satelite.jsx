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
        db.collection("satelite").get().then(querySnapshot =>{
        var documento = [];
            querySnapshot.forEach(doc => {
            documento.push({...doc.data(), ...{id:doc.id}});
            console.log(documento);
        });
        this.setState({documents : documento})
    });
    }
     
    render(){
        const satelite = this.state.documents;
        
        return(
            <div className = "planeta">
                <ul>
                    {satelite.map( item => (
                        <li key = {item.id}>
                            <div className = "planet-name"> {item.nome}</div> <br/>
                            <div className = "card-text"> Distancia da terra: </div> 
                            <div className = "card-planet"> {item.dist_terra}  </div> <br/>
                            <div className = "card-text"> Tamanho: </div> 
                            <div className = "card-planet"> {item.tamanho} </div> <br/>
                            <div className = "card-text"> Peso: </div> 
                            <div className = "card-planet"> {item.peso} </div> <br/>
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