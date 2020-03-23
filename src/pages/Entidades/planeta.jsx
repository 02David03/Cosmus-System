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
        })
        var sistemas = [];
        await db.collection("sistema_planetario").get().then(querySnapshot =>{
            querySnapshot.forEach(doc => {
                sistemas.push({...doc.data(), ...{id:doc.id}});
            });
        })

        var document = this.state.documents;
        for (let index = 0; index < document.length; index++) {
            var sistema = false;
            for (let x = 0; x < sistemas.length; x++) {
                if (document[index].sistema_planetario_nome === sistemas[x].nome) sistema = true;
                else continue;                
            }
            if (sistema) continue;
            else document[index].sistema_planetario_nome = "";
        }
    this.setState({documents : document})
    };

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
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <Link to = "/"><button className ="btn"><i className="fa fa-home"></i> Home</button></Link>
                <ul>
                    {planet.map( item => (
                        <li key = {item.id} className = "card">
                            <div className = "planet-name"> {item.nome}</div> <br/>
                            <div className = "card-text"> Tamanho: </div> 
                            <div className = "card-planet"> {item.tamanho}  </div> <br/>
                            <div className = "card-text"> Peso: </div> 
                            <div className = "card-planet"> {item.peso} </div> <br/>
                            <div className = "card-text"> Velocidade de rotação: </div> 
                            <div className = "card-planet"> {item.vel_rotacao} </div> <br/>
                            <div className = "card-text"> Composição: </div> 
                            <div className = "card-planet"> {item.comp_planeta} </div> <br/>
                            <div className = "card-text"> Sistema Planetario: </div> 
                            <div className = "card-planet"> {item.sistema_planetario_nome} </div> <br/>
                            <div className = "botoes"> 
                                <Link to = { `Planeta_edit/${item.id}`} > <button  className = "edit">  Editar   </button> </Link>
                                <button className = "delete" onClick = {() => this.delete(item)}> Excluir </button>
                            </div>
                        </li>
                    ))}
                    <div className = "card"> <Link to = "/Planeta_add" className = "addBtn"> + </Link> </div>
                </ul>
            </div>
        )
    }
    
}

export default withRouter(Planets);
