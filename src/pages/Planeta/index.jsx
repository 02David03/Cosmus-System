import React, {Component} from 'react';
import "./styles.css";
import edicao from "../../Images/edicao.png";
export default class Planets extends Component{

    constructor(props) {
        super(props)
    }
    state  = {
        planetas:[
            {
                id_planeta: "01",
                nome_planeta: "Mercúrio" ,
                tam_planeta: 4.879 ,
                massa_planeta: "3,285 × 10^23 kg " , 
                gravidade_planeta: "3,7 m/s²" , 
                comp_planeta: "potássio, sódio, hélio, oxigênio molecular, hidrogênio, além de nitrogénio, dióxido de carbono e vapor de água."
                
             },

             {
                id_planeta: "02",
                nome_planeta: "Vênus" ,
                tam_planeta: 12.104 ,
                massa_planeta: "4,867 × 10^24 kg" , 
                gravidade_planeta: "8,87 m/s²" , 
                comp_planeta: "Vénus possui uma densa atmosfera, composta na sua maior parte por dióxido de carbono, sendo parte da sua atmosfera também composta por azoto (ou nitrogénio)."
                
             },

             {
                id_planeta: "03",
                nome_planeta: "Terra" ,
                tam_planeta: 12.742 ,
                massa_planeta: "3,597 × 10^51 u" , 
                gravidade_planeta: "9.807 m/s²" , 
                comp_planeta: "A atmosfera da terra é rica em componentes como vapor de água, o dióxido de carbono, metano, óxido nitroso e o ozônio."
            },
            {
                id_planeta: "04",
                nome_planeta: "Marte" ,
                tam_planeta: 6.779 ,
                massa_planeta: "6,39 × 10^23 kg" , 
                gravidade_planeta: "3,711 m/s²" , 
                comp_planeta: "A atmosfera de Marte consiste em 95% de dióxido de carbono, 3% nitrogênio, 1,6% argônio, e ainda traços de oxigênio, água, e metano"
                
            }
        ]  
     }

     render(){
        const planetas = this.state.planetas;

        return(
            <div className = "planeta">
                {planetas.map( item => (
                    <div className = "card">
                        <div className = "delete"> <button> X </button>  </div>
                        <div className = "card-text"> ID: </div> 
                        <div className = "card-planet"> {item.id_planeta}</div> <br/>
                        <div className = "card-text"> Nome: </div> 
                        <div className = "card-planet"> {item.nome_planeta}</div> <br/>
                        <div className = "card-text"> Tamanho: </div> 
                        <div className = "card-planet"> {item.tam_planeta} Km </div> <br/>
                        <div className = "card-text"> Massa: </div> 
                        <div className = "card-planet"> {item.massa_planeta} </div> <br/>
                        <div className = "card-text"> Gravidade: </div> 
                        <div className = "card-planet"> {item.gravidade_planeta} </div> <br/>
                        <div className = "card-text"> Descrição: </div> 
                        <div className = "card-planet"> {item.comp_planeta} </div> <br/>
                        <div className = "edit"> <button> editar </button> </div>
                    </div>
                ))}
            </div>
        )
    }
}