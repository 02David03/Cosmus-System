import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Estrela from "./pages/Entidades/estrela";
import Galaxia from "./pages/Entidades/galaxia";
import Satelite from "./pages/Entidades/satelite";
import Sistema_plan from "./pages/Entidades/sistema_planetario";
import Planeta from "./pages/Entidades/planeta";
import Main from "./pages/main";


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path ="/" component={Main}/>
            <Route path = "/Estrela" component = {Estrela}/>
            <Route path = "/Galaxia" component = {Galaxia}/>
            <Route path = "/Satelite-Natural" component = {Satelite}/>
            <Route path = "/Sistema-Planetario" component = {Sistema_plan}/>
            <Route path ="/Planeta" component={Planeta} />
        </Switch>
    </BrowserRouter>
);

export default Routes;