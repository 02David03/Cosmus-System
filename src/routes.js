import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Estrela from "./pages/Entidades/estrela";
import Estrela_add from "./pages/Entidades/Adicao/estrela_add";
import Estrela_edit from "./pages/Entidades/Adicao/estrela_edit";
import Galaxia from "./pages/Entidades/galaxia";
import Galaxia_add from "./pages/Entidades/Adicao/galaxia_add";
import Galaxia_edit from "./pages/Entidades/Adicao/galaxia_edit";
import Planeta from "./pages/Entidades/planeta";
import Planet_add from "./pages/Entidades/Adicao/planeta_add";
import Planet_edit from "./pages/Entidades/Adicao/planeta_edit";
import Satelite from "./pages/Entidades/satelite";
import Satelite_add from "./pages/Entidades/Adicao/satelite_add";
import Satelite_edit from "./pages/Entidades/Adicao/satelite_edit";
import Sistema_plan from "./pages/Entidades/sistema_planetario";
import Sistema_plan_add from "./pages/Entidades/Adicao/sistema_plan_add";
import Sistema_plan_edit from "./pages/Entidades/Adicao/sistema_plan_edit";
import Orbita from "./pages/Entidades/orbita";
import Orbita_add from "./pages/Entidades/Adicao/orbita_add";
import Orbita_edit from "./pages/Entidades/Adicao/orbita_edit";
import Main from "./pages/main";




const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path ="/" component={Main}/>
            <Route path = "/Estrela" component = {Estrela}/>
            <Route path = "/Estrela_add" component = {Estrela_add}/>
            <Route path = "/Estrela_edit/:id" component = {Estrela_edit}/>
            <Route path = "/Galaxia" component = {Galaxia}/>
            <Route path = "/Galaxia_add" component = {Galaxia_add}/>
            <Route path = "/Galaxia_edit/:id" component = {Galaxia_edit}/>
            <Route path = "/Orbitas" component = {Orbita} />
            <Route path = "/Orbitas_add" component = {Orbita_add}/>
            <Route path = "/Orbitas_edit" component = {Orbita_edit}/>
            <Route path = "/Planeta" component={Planeta} />
            <Route path = "/Planeta_add" component = {Planet_add}/>
            <Route path = "/Planeta_edit/:id" component = {Planet_edit}/>
            <Route path = "/Satelite-Natural" component = {Satelite}/>
            <Route path = "/Satelite-Natural_add" component = {Satelite_add}/>
            <Route path = "/Satelite-Natural_edit/:id" component = {Satelite_edit}/>
            <Route path = "/Sistema-Planetario" component = {Sistema_plan}/>
            <Route path = "/Sistema-Planetario_add" component = {Sistema_plan_add}/>
            <Route path = "/Sistema-Planetario_edit/:id" component = {Sistema_plan_edit}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;