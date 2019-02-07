import React from 'react';
import axios from "axios";
import Searchbar from './Searchbar'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';

class Navbar extends React.Component {
    constructor(props) {
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

    render() {
        const collectionTags = this.state.collections.map(c => <Link to={`/collection/` + c.id}><Dropdown.Item key={c.id}>{c.title}</Dropdown.Item></Link>);
        return (
            <div className="ui container">
                <div className="ui hidden divider"></div>
                <Menu>
                    <Link className="active red item" to={`/`}>Photos App</Link>

                    <Dropdown item text='Collections'>
                        <Dropdown.Menu>
                            {collectionTags}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Menu.Menu position='right'>

                        <Searchbar />

                            <Link to={`/account/`} className="item">
                                <i className="user icon"></i>My Account
                            </Link>

                    </Menu.Menu>

                </Menu>
            </div>
        );
    }
}

export default Navbar;
