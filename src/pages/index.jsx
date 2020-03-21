import React from "react" ;
import {Login, Register} from "./login/export";
import "./styles.scss";

class Transition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogginActive: true,
        };
    }


    render() {
        
        const {isLogginActive} = this.state;
        return(
        <div className = "Transition">
            <div className= "login">
                <div className = "container">
                    {isLogginActive && ( 
                        <Login containerRef = {(ref) => this.current = ref }/>
                    )}
                    {!isLogginActive &&(
                        <Register containerRef = {(ref) => this.current = ref }/>
                    )}
                </div>
            </div>
        </div>
        );
    }
}


export default Transition;
