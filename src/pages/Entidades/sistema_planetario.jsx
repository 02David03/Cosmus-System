import React, {Component}  from 'react';
import "./styles.css";
import fire from "../../config/Fire";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Sistema_planetario extends Component{

    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
        this.state = {
            documents : [],
        }

    }
    
    async componentDidMount(){
        const db = fire.firestore()
        db.collection("sistema_planetario").get().then(querySnapshot =>{
        var documento = [];
            querySnapshot.forEach(doc => {
            documento.push({...doc.data(), ...{id:doc.id}});
        });
        this.setState({documents : documento})
    });
    }

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
        const estrela = this.state.documents;
        
        return(
            <div className = "planeta">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <Link to = "/"><button class="btn"><i class="fa fa-home"></i> Home</button></Link>
                <ul>
                    {estrela.map( item => (
                        <li key = {item.id} className = "card">
                            <div className = "planet-name"> {item.nome}</div> <br/>
                            <div className = "card-text"> Planetas Pertencentes: </div> 
                            <div className = "card-planet"> {item.planeta}  </div> <br/>
                            <div className = "card-text"> Idade: </div> 
                            <div className = "card-planet"> {item.idade} </div> <br/>
                            <div className = "card-text"> Estrelas Pertencentes: </div> 
                            <div className = "card-planet"> {item.estrela} </div> <br/>
                            <div className = "card-text"> Galaxias Pertencentes: </div> 
                            <div className = "card-planet"> {item.galaxia} </div> <br/>
                            <div className = "card-text"> Quantidade de Estrelas: </div> 
                            <div className = "card-planet"> {item.qtd_estrelas} </div> <br/>
                            <div className = "card-text"> Quantidade de Planetas: </div> 
                            <div className = "card-planet"> {item.qtd_planetas} </div> <br/>
                            <div className = "botoes"> 
                                <Link to = { `Sistema-Planetario_edit/${item.id}`} > <button  className = "edit">  Editar   </button> </Link>
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

export default withRouter(Sistema_planetario);
