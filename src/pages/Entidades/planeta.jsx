import React, {Component}  from 'react';
import "./styles.css";
import fire from "../../config/Fire";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Planets extends Component{

    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
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

    delete(e) {
        const db = fire.firestore()
        db.collection("planets").doc(e.id).delete();
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
                    {planet.map( item => (
                        <li className = "card">
                            <div className = "planet-name"> {item.nome}</div> <br/>
                            <div className = "card-text"> Tamanho: </div> 
                            <div className = "card-planet"> {item.tamanho}  </div> <br/>
                            <div className = "card-text"> Massa: </div> 
                            <div className = "card-planet"> {item.peso} </div> <br/>
                            <div className = "card-text"> Velocidade de rotação: </div> 
                            <div className = "card-planet"> {item.vel_rotacao} </div> <br/>
                            <div className = "card-text"> Composição: </div> 
                            <div className = "card-planet"> {item.como_planeta} </div> <br/>
                            <div className = "botoes"> 
                                <a href = "#" className = "edit"> Editar </a> 
                                <button className = "delete" onClick = {() => this.delete(item)}> Excluir </button>
                            </div>
                        </li>
                    ))}
                    <div className = "card"> <Link to = "./planet_edit" className = "addBtn"> + </Link> </div>
                </ul>
            </div>
        )
    }
    
}

export default withRouter(Planets);
