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
        db.collection("estrela").get().then(querySnapshot =>{
        var documento = [];
            querySnapshot.forEach(doc => {
            documento.push({...doc.data(), ...{id:doc.id}});
        });
        this.setState({documents : documento})
    });
    }

    delete(e) {
        const db = fire.firestore()
        db.collection("estrela").doc(e.id).delete();
        db.collection("estrela").get().then(querySnapshot =>{
            var documento = [];
                querySnapshot.forEach(doc => {
                documento.push({...doc.data(), ...{id:doc.id}});
            });
            this.setState({documents : documento})
        });
    } 
    
     
    render(){
        const estrela = this.state.documents;
        
        return(
            <div className = "planeta">
                <ul>
                    {estrela.map( item => (
                        <li key = {item.id} className = "card">
                            <div className = "planet-name"> {item.nome}</div> <br/>
                            <div className = "card-text"> Distância da terra: </div> 
                            <div className = "card-planet"> {item.dist_terra}  </div> <br/>
                            <div className = "card-text"> Tamanho: </div> 
                            <div className = "card-planet"> {item.tamanho} </div> <br/>
                            <div className = "card-text"> Idade: </div> 
                            <div className = "card-planet"> {item.idade} </div> <br/>
                            <div className = "card-text"> Planeta orbitante: </div> 
                            <div className = "card-planet"> {item.planeta} </div> <br/>
                            <div className = "card-text"> Satelite orbitante: </div> 
                            <div className = "card-planet"> {item.satelite} </div> <br/>
                            <div className = "card-text"> Sistema Planetario: </div> 
                            <div className = "card-planet"> {item.sistema_plan} </div> <br/>
                            <div className = "card-text"> Tipo de estrela: </div> 
                            <div className = "card-planet"> {item.tipo} </div> <br/>
                            <div className = "botoes"> 
                                <button  className = "edit"> <Link to = { `/Estrela_edit/${item.id}`} > Editar  </Link> </button>
                                <button className = "delete" onClick = {() => this.delete(item)}> Excluir </button>
                            </div>
                        </li>
                    ))}
                    <div className = "card"> <Link to = "/Estrela_add" className = "addBtn"> + </Link> </div>
                </ul>
            </div>
        )
    }
    
}

export default withRouter(Planets);
