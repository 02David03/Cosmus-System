import React, {Component}  from 'react';
import "./styles.css";
import fire from "../../config/Fire";
import { Link } from 'react-router-dom';
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
        db.collection("satelite").get().then(querySnapshot =>{
        var documento = [];
            querySnapshot.forEach(doc => {
            documento.push({...doc.data(), ...{id:doc.id}});
        });
        this.setState({documents : documento})
    });
    }

    delete(e) {
        const db = fire.firestore()
        db.collection("satelite").doc(e.id).delete();
        db.collection("satelite").get().then(querySnapshot =>{
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
                            <div className = "card-text"> Peso: </div> 
                            <div className = "card-planet"> {item.peso}  </div> <br/>
                            <div className = "card-text"> Tamanho: </div> 
                            <div className = "card-planet"> {item.tamanho} </div> <br/>
                            <div className = "card-text"> Composição: </div> 
                            <div className = "card-planet"> {item.composicao} </div> <br/>
                            <div className = "botoes"> 
                                <Link to = { `Sistema-Planetario_edit/${item.id}`} > <button  className = "edit">  Editar   </button> </Link>                                
                                <button className = "delete" onClick = {() => this.delete(item)}> Excluir </button>
                            </div>
                        </li>
                    ))}
                    <div className = "card"> <Link to = "/Satelite-Natural_add" className = "addBtn"> + </Link> </div>
                </ul>
            </div>
        )
    }
    
}

export default withRouter(Satelite);
