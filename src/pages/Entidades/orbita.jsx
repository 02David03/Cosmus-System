import React, {Component}  from 'react';
import "./styles.css";
import fire from "../../config/Fire";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Orbita extends Component{

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
        await db.collection("orbita").get().then(querySnapshot =>{
            querySnapshot.forEach(doc => {
                documento.push({...doc.data(), ...{id:doc.id}});
            });
            this.setState({documents : documento})
        });
        
        for (let index = 0; index < this.state.documents.length; index++) {
            console.log(this.state.documents[index].id);
            if(this.state.documents[index].planeta_id !== ""){
                db.collection("planets").doc(this.state.documents[index].planeta_id).get().then((doc) => {
                    if (!doc.exists) {
                        db.collection("orbita").doc(this.state.documents[index].id).delete();
                    };
                });
            }
            if(this.state.documents[index].estrela_id !== ""){
                db.collection("estrela").doc(this.state.documents[index].estrela_id).get().then((doc) => {
                    if (!doc.exists) {
                        db.collection("orbita").doc(this.state.documents[index].id).delete();
                    }
                });
            }
            if(this.state.documents[index].satelite_id !== ""){
                db.collection("satelite").doc(this.state.documents[index].satelite_id).get().then((doc) => {
                    if (!doc.exists) {
                        db.collection("orbita").doc(this.state.documents[index].id).delete();
                    }
                });
            }
        }
        documento = [];
        await db.collection("orbita").get().then(querySnapshot =>{
            querySnapshot.forEach(doc => {
                documento.push({...doc.data(), ...{id:doc.id}});
            });
        });
        this.setState({documents : documento})
    };

    delete(e) {

        const db = fire.firestore()
        db.collection("orbita").doc(e.id).delete();
        db.collection("orbita").get().then(querySnapshot =>{
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
                <Link to = "/"><button class="btn"><i class="fa fa-home"></i> Home</button></Link>
                <ul>
                    {orbitas.map( item => (
                        <li key = {item.id} className = "card">
                            <div className = "planet-name"> {item.nome}</div> <br/>
                            <Link to = "Planeta"> <div className = "card-text"> Planeta: </div> </Link> 
                            <div className = "card-planet"> {item.planeta_name}  </div> <br/>
                            <Link to = "/Estrela"> <div className = "card-text"> Estrela: </div> </Link> 
                            <div className = "card-planet"> {item.estrela_name} </div> <br/>
                            <Link to = "/Satelite-Natural"> <div className = "card-text"> Satélite Natural: </div> </Link>
                            <div className = "card-planet"> {item.satelite_name} </div> <br/>
                            <div className = "botoes"> 
                                <Link to = { `Sistema-Planetario_edit/${item.id}`} > <button  className = "edit">  Editar   </button> </Link>
                                <button className = "delete" onClick = {() => this.delete(item)}> Excluir </button>
                            </div>
                        </li>
                    ))}
                    <div className = "card"> <Link to = "/Orbitas_add" className = "addBtn"> + </Link> </div>
                </ul>
            </div>
        )
    }
    
}

export default withRouter(Orbita);
