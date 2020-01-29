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
        entidades:[{ entidade : "Anã Branca",
                     description: "Uma anã branca é uma estrela que possui até 10Msol .Sua característica é ser pequena e branca"
                    },
                    { entidade : "Anã Vermelha",
                     description: "Uma anã vermelha é menor estrela que pode ser encontrada, seu tamanho é geralmente menor que a metade da massa do sol"
                    },
                    { entidade : "Estrela",
                     description: "Uma estrela é uma esfera de energia mantida pela gravidade e pela pressão de radiação que é realizada sobre ela, uma estrela pode ser dividida em vários outros tipos"
                    },
                    { entidade : "Estrela Binária",
                     description: "Estrela binária é um sistema estelar no qual duas estrelas orbitam um centro de massa em comum, podendo esse centro ser qualquer coisa, inclusive a gravidade entre elas"
                    },
                    { entidade : "Galaxia",
                     description: "Essa entidade representa um conjunto de sistemas, geralmente são encontradas facilmente."
                    },
                    { entidade : "Gigante Azul",
                    description:  "Gigantes Azuis são estrelas que possuem 18 vezes a massa do sol, geralmente são bem maiores que o nosso sol por exemplo e também muito mais quentes."
                    },
                    { entidade : "Gigante Vermelha",
                    description: "É uma estrela extremamente grande mas que possui uma massa relativamente pequena algo entre (0,5 e 10 massas solares).Quando uma estrela desse porte morre (ela acaba ficando sem seus combustíveis para manter a fusão, e então a gravidade da mesma começa a esmagar cada vez mais o seu núcleo até que o mesmo comece a sugar a sua própria massa até deixar de existir) ela se torna um buraco negro."
                    },
                    { entidade : "Planeta",
                    description: "Um planeta é um corpo celeste que possui massa o suficiente para se tornar esférico pela sua própria gravidade."
                    },
                    { entidade : "Satelite Natural",
                    description: "Um satélite natural é um corpo celeste qualquer que orbita um corpo celeste maior que ele, como o caso da lua orbitando a terra por exemplo."
                    },
                    { entidade : "Sistema Platenario",
                    description: "Um conjunto de planetas e/ou corpos não estelares em orbita de uma estrela é chamado de sistema planetário."
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