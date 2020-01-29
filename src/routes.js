import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Planeta from "./pages/Planeta";
import Main from "./pages/main";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path ="/" component={Main}/>
            <Route path ="/Planeta" component={Planeta} />
        </Switch>
    </BrowserRouter>
);

export default Routes;