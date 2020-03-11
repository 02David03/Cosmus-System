import React, { Component } from "react";
import "./styles.css";

import fire from "../../config/Fire";
import { Link } from 'react-router-dom';

export default class Main extends Component{

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        
    }
    state = {
        entidades:[
                    { entidade : "Estrela",
                     description: "Uma estrela é uma esfera de energia mantida pela gravidade e pela pressão de radiação que é realizada sobre ela, uma estrela pode ser dividida em vários outros tipos"
                    },
                    { entidade : "Galaxia",
                     description: "Essa entidade representa um conjunto de sistemas, geralmente são encontradas facilmente."
                    },
                    { entidade : "Planeta",
                    description: "Um planeta é um corpo celeste que possui massa o suficiente para se tornar esférico pela sua própria gravidade."
                    },
                    { entidade : "Satelite-Natural",
                    description: "Um satélite natural é um corpo celeste qualquer que orbita um corpo celeste maior que ele, como o caso da lua orbitando a terra por exemplo."
                    },
                    { entidade : "Sistema-Planetario",
                    description: "Um conjunto de planetas e/ou corpos não estelares em orbita de uma estrela é chamado de sistema planetário."
                    },
                    {
                     entidade: "Relações Planetarias",
                    description: "Aqui é onde é mostrado e também onde será criada as relações entre planetas estrelas e satélites naturais"
                    }
        ]
    }

    logout(){
        fire.auth().signOut();
    }
    render(){
        const entidades = this.state.entidades;

        return(
            <div className = 'LogOut'>
                <button className = "outBtn" onClick = {this.logout}>Sair</button>
            <div className = "product-list">
                {entidades.map( item => (
                    <Link to = {`/${item.entidade}`}><article>
                        <strong>{item.entidade}</strong> 
                        <p>{item.description}</p>
                    </article>
                    </Link>
                ))}
            </div>
        </div>
        )
    }
}