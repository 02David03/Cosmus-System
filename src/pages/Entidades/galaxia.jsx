import React, {Component}  from 'react';
import "./styles.css";
import fire from "../../config/Fire";
import {Link} from "react-router-dom"
import { withRouter } from 'react-router-dom';

class Satelite extends Component{

    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
        this.state = {
            documents : [],
        }

    }
    
    async componentDidMount(){
        const db = fire.firestore()
        db.collection("galaxia").get().then(querySnapshot =>{
        var documento = [];
            querySnapshot.forEach(doc => {
            documento.push({...doc.data(), ...{id:doc.id}});
        });
        this.setState({documents : documento})
    });
    
    var sistemas = [];
    await db.collection("sistema_planetario").get().then(querySnapshot =>{
        querySnapshot.forEach(doc => {
            sistemas.push({...doc.data(), ...{id:doc.id}});
        });
    })

    var document = this.state.documents;
    for (let index = 0; index < document.length; index++) {
        var sistema = 0;
        for (let x = 0; x < sistemas.length; x++) {
            if (document[index].id === sistemas[x].galaxia_id) sistema++;
            else continue;                
        }
        document[index].qt_sistema = sistema;
    }
    this.setState({documents : document})
    };
    


    delete(e) {
        const db = fire.firestore()
        db.collection("galaxia").doc(e.id).delete();
        db.collection("galaxia").get().then(querySnapshot =>{
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
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <Link to = "/"><button className ="btn"><i className="fa fa-home"></i> Home</button></Link>
                <ul>
                    {estrela.map( item => (
                        <li key = {item.id} className = "card">
                            <div className = "planet-name"> {item.nome}</div> <br/>
                            <div className = "card-text"> Distância da terra: </div> 
                            <div className = "card-planet"> {item.dist_terra}  </div> <br/>
                            <div className = "card-text"> Quantidade de Sistemas: </div> 
                            <div className = "card-planet"> {item.qt_sistema} </div> <br/>
                            <div className = "botoes"> 
                                <Link to = { `Galaxia_edit/${item.id}`} > <button  className = "edit">  Editar   </button> </Link>
                                <button className = "delete" onClick = {() => this.delete(item)}> Excluir </button>
                            </div>
                        </li>
                    ))}
                    <div className = "card"> <Link to = "/Galaxia_add" className = "addBtn"> + </Link> </div>
                </ul>
            </div>
        )
    }
    
}

export default withRouter(Satelite);
