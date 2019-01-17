import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import 'semantic-ui/dist/semantic.min.css';
import { Dropdown, Menu } from 'semantic-ui-react';
import './main.css';

import Home from './Home'
import Photo from './Photo'
import User from './User'
import Search from './Search'
import Collection from './Collection'

import Searchbar from './components/Searchbar'

import {BrowserRouter, Route, Switch} from 'react-router-dom';


class Routing extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            collections:[]
        };
    }

    componentDidMount() {
        axios.get('https://api.unsplash.com/collections/featured/?client_id=5d1254eb8bbd63208e3d5b7d760896bd504ffc7aedffe2c40f7e2139edf841df')
            .then(response => {
                this.setState({collections: response.data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    render(){
        const collectionTags = this.state.collections.map(c => <Dropdown.Item key={c.id}><a href={'/collection/' + c.id}>{c.title}</a></Dropdown.Item>);
        return (
        <BrowserRouter>
            <div>
                <div className="ui container">
                    <div className="ui hidden divider"></div>
                    <Menu>
                        <a className="active red item" href="/">Photos App</a>

                        <Dropdown item text='Collections'>
                            <Dropdown.Menu>
                                {collectionTags}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Menu.Menu position='right'>

                            <Searchbar />

                        </Menu.Menu>

                    </Menu>
                </div>
                <Switch>
                    <Route onEndReach exact path="/" component={Home} />
                    <Route path="/photo/:id" component={Photo} />
                    <Route path="/user/:username" component={User} />
                    <Route path="/search/:query" component={Search} />
                    <Route path="/collection/:id" component={Collection} />
                </Switch>
            </div>
        </BrowserRouter>
        )
    }
}



ReactDOM.render(
    <Routing />,
    document.getElementById("root")
);
