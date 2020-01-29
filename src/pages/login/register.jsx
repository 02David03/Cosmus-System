import React, {Component} from 'react';
import loginImg from "../../Images/planets.png";
import './styles.scss'
import fire from "../../config/Fire"

export class Register  extends Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email:'',
            password: '',

        }
    }
    
    signUp(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then ((u) => {    
        })
        .catch((error) => {
            alert(error);
        });
    }

    handleChange(e) {
        this.setState ( {[e.target.name] : e.target.value});
    }

    render(){

        return(
        <div className = 'login-square' ref = {this.props.containerRef}>
            <div className = "header"> Registre-se </div>
            <div className = "content">
                <div className ="image">
                    <img src = {loginImg} /> 
                </div>
                <div className = "form">
                    <div className = 'form-group'>
                        <label htmlFor = "email">E-mail</label>
                        <input value = {this.state.email} onChange = {this.handleChange} type = "email" name ="email"placeholder="Insira o seu melhor email"/>
                    </div>
                    <div className = 'form-group'>
                        <label htmlFor = "password">Senha</label>
                        <input value = {this.setState.password} onChange = {this.handleChange} type = "password" name ="password"placeholder="Escolha uma ótima senha"/>
                    </div>
                </div>
            </div>
            <div className = "footer">
                <button onClick = {this.signUp} type = "button" className = "btn">
                    Registrar
                </button>
            </div>
        </div>
        )
    } 
}