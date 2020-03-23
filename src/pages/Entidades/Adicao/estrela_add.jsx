import React, {Component}  from 'react';
import { withRouter } from 'react-router-dom';
import fire from "../../../config/Fire";
import "./styles.css";


class EstrelaAdd extends Component{

    constructor(props){
        
        super(props);
        this.getInput = this.getInput.bind(this);
        this.setInput = this.setInput.bind(this);
        this.state = {
                nome : "",
                dist_terra : "",
                tamanho : "",
                Idade : "",
                sistema_planetario_nome : "",
                sistema_planetario : [],
                tipo : "",
                morte : ""
        }
    }

    async componentDidMount() {
        const db = fire.firestore()
        await db.collection("sistema_planetario").get().then(querySnapshot =>{
        var sistema_plan = [];
            querySnapshot.forEach(doc => {
            sistema_plan.push({...doc.data(), ...{id:doc.id}});
            });
            this.setState({sistema_planetario : sistema_plan})
        });
    }

    
    getInput(event) {
        if (event.target.name === "nome"){
            this.setState({nome : event.target.value})
        } else if (event.target.name === "dist_terra"){
            this.setState({dist_terra : event.target.value})
        } else if (event.target.name === "tamanho") {
            this.setState({tamanho : event.target.value})
        } else if (event.target.name === "idade"){
            this.setState({Idade : event.target.value})
        } else if (event.target.name === "tipo"){
            this.setState({tipo : event.target.value})
        } else if (event.target.name === "sistema_plan") {
            this.setState({sistema_planetario_nome : event.target.value})
        } else if (event.target.name === "morte"){
            this.setState({morte : event.target.value})
        }
    }

    redirectToStar = () => {
        const {history} = this.props;
        if (history) history.push('/Estrela');
    }

    handleCheckboxChange = event =>
    this.setState({ morte : event.target.checked })

    setInput() {
        const db = fire.firestore();
        const newPlanet = db.collection("estrela").doc();
        newPlanet.set( 
           this.state
        );
        this.redirectToStar();  
    }   

 
    
    render(){ 
        const Sistemas = this.state.sistema_planetario;
        return(
            <div className = "edicao">
                <form onSubmit = {this.setInput} >
                    <div className = "Title"> Nome: </div>
                    <div className = "Input"> <input type = "text" name = "nome" value = {this.state.nome} onChange = {this.getInput} /> </div> <br/>
                    <div className = "Title"> Distância da terra: </div> 
                    <div className = "Input"> <input type="text" name = "dist_terra" value = {this.state.dist_terra} onChange = {this.getInput}/>  </div> <br/>
                    <div className = "Title"> Tamanho: </div> 
                    <div className = "Input"> <input type="text" name = "tamanho" value = {this.state.tamanho} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Idade: </div> 
                    <div className = "Input"> <input type="text" name = "idade" value = {this.state.Idade} onChange = {this.getInput}/> </div> <br/>
                    <div className = "Title"> Sistema Planetario: </div> 
                    <div className = "Input"> <select name="sistema_plan" onChange = {this.getInput}>
                    <option value = "-"> - </option>
                    {Sistemas.map (item => ( <option key = {item.id} name = {item.nome} value = {item.nome}> {item.nome} </option>))} </select> </div> <br/>
                    <div className = "Title"> Tipo de Estrela: </div> 
                    <div className = "Input"> <select name="tipo" value = {this.state.tipo} onChange = {this.getInput}>
                    <option value = "-"> - </option>
                    <option value = "Anã Branca"> Anã Branca </option> 
                    <option value = "Anã Vermelha"> Anã Vermelha </option>
                    <option value = "Estrela Binária"> Estrela Binária </option>
                    <option value = "Gigante Azul"> Gigante Azul </option>
                    <option value = "Gigante Vermelho"> Gigante Vermelha </option> </select> </div>
                    {this.state.tipo === "Gigante Vermelho" ? <div className = "Title"> Morta:
                    <div className = "Input"> <select name = "morte" value = {this.state.morte} onChange = {this.getInput}>
                    <option value = "Não"> Não </option>
                    <option value = "Sim"> Sim </option> </select> </div></div>
                    :<div></div>}                     
                    <div className = "edit"> <input type="submit"/></div> 
                </form>
            </div>
        )
    }
}

export default withRouter(EstrelaAdd);