import React, {Component}  from 'react';
import "./styles.css";
import fire from "../../config/Fire";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Sistema_plan extends Component{

    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
        this.state = {
            documents : [],
        }

    }

    async componentDidMount(){
        const db = fire.firestore()
        var documento = [];
        await db.collection("sistema_planetario").get().then(querySnapshot =>{
            querySnapshot.forEach(doc => {
                documento.push({...doc.data(), ...{id:doc.id}});
            });
            this.setState({documents : documento})
        });
        for (let index = 0; index < this.state.documents.length; index++) {
            if(this.state.documents[index].galaxia_id !== undefined){
                await db.collection("galaxia").doc(this.state.documents[index].galaxia_id).get().then((doc) => {
                    console.log(this.state.documents[index].galaxia_id)
                    if (!doc.exists) {
                        db.collection("sistema_planetario").doc(this.state.documents[index].id).delete();
                    };
                });
            }
        }
        var planetas = [];
        var estrelas = [];
        await db.collection("planets").get().then(querySnapshot =>{
            querySnapshot.forEach(doc => {
                planetas.push({...doc.data(), ...{id:doc.id}});
            });
        })
        await db.collection("estrela").get().then(querySnapshot =>{
            querySnapshot.forEach(doc => {
                estrelas.push({...doc.data(), ...{id:doc.id}});
            });
        })

        var document = this.state.documents;
        for (let index = 0; index < document.length; index++) {
            var star = 0;
            var planet = 0;
            for (let x = 0; x < planetas.length; x++) {
                if (document[index].nome === planetas[x].sistema_planetario_nome) planet++;
                else continue;                
            }
            document[index].cont_plan = planet;
            for (let x = 0; x < estrelas.length; x++) {
                if (document[index].nome === estrelas[x].sistema_planetario_nome) star++;
                else continue;                
            }
            document[index].cont_star = star;
        }
        this.setState({documents : document})
    };

    delete(e) {

        const db = fire.firestore()
        db.collection("sistema_planetario").doc(e.id).delete();
        db.collection("sistema_planetario").get().then(querySnapshot =>{
            var documento = [];
                querySnapshot.forEach(doc => {
                documento.push({...doc.data(), ...{id:doc.id}});
            });
            this.setState({documents : documento})
        });
    } 
    
     
    render(){
        const orbitas = this.state.documents;
        
        return(
            <div className = "planeta">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <Link to = "/"><button className ="btn"><i className="fa fa-home"></i> Home </button></Link>
                <ul>
                    {orbitas.map( item => (
                        <li key = {item.id} className = "card">
                            <div className = "planet-name"> {item.nome}</div> <br/>
                            <div className = "card-text"> Idade: </div> 
                            <div className = "card-planet"> {item.idade}  </div> <br/>
                            <div className = "card-text"> Numero de Planetas: </div> 
                            <div className = "card-planet"> {item.cont_plan} </div> <br/>
                            <div className = "card-text"> Numero de Estrelas: </div> 
                            <div className = "card-planet"> {item.cont_star} </div> <br/>
                            <Link to = "/Galaxia"> <div className = "card-text"> Galaxia: </div> </Link> 
                            <div className = "card-planet"> {item.galaxia_nome} </div> <br/> 
                            <div className = "botoes"> 
                                <Link to = { `/Sistema-Planetario_edit/${item.id}`} > <button  className = "edit">  Editar   </button> </Link>
                                <button className = "delete" onClick = {() => this.delete(item)}> Excluir </button>
                            </div>
                        </li>
                    ))}
                    <div className = "card"> <Link to = "/Sistema-Planetario_add" className = "addBtn"> + </Link> </div>
                </ul>
            </div>
        )
    }  
}

export default withRouter(Sistema_plan);
