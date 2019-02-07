import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui/dist/semantic.min.css';
import './main.css';

import Home from './Home';
import Photo from './Photo';
import User from './User';
import Search from './Search';
import Collection from './Collection';
import Account from './Account';

import Navbar from './components/Navbar';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FavouritesProvider } from "./FavouritesContext";


class Routing extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <FavouritesProvider>
                <BrowserRouter>
                    <div>
                        <Navbar />
                        <Switch>
                            <Route onEndReach exact path="/" component={Home} />
                            <Route path="/photo/:id" component={Photo} />
                            <Route path="/user/:username" component={User} />
                            <Route path="/search/:query" component={Search} />
                            <Route path="/collection/:id" component={Collection} />
                            <Route path="/account" component={Account} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </FavouritesProvider>
        )
    }
}

ReactDOM.render(
    <Routing />,
    document.getElementById("root")
);
