import React, { createContext, createElement } from "react";
import ReactDOM from "react-dom";
import {
    HashRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";

const MainDiv = () => {
    return <Router>
        <div className="navbar">
            <NavLink className="navlink" activeClassName="activeNavlink" exact to="/">Login</NavLink>
            <NavLink className="navlink" activeClassName="activeNavlink" exact to="/register">Register</NavLink>
            <NavLink className="navlink" activeClassName="activeNavlink" exact to="/logout">Logout</NavLink>
        </div>
        <Switch>
            <Route exact path="/"><Login /></Route>
            <Route exact path="/register"><Register /></Route>
            <Route exact path="/logout">Logout</Route>
            <Route exact path="*">
                Page not found
            </Route>
        </Switch>
    </Router>;
}

const domContainer = document.querySelector("#reactDom");
ReactDOM.render(createElement(MainDiv), domContainer);
