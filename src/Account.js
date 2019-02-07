import React from 'react';
import axios from "axios";
import FeedItem from './components/FeedItem';
import { FavouritesProvider, FavouritesConsumer } from "./FavouritesContext";
import { Link } from 'react-router-dom';

class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            favourites:[],
            user: {
                profile_image:{},
                tags:{
                    custom:{}
                }
            },
            interests:[]
        };
    }

    componentDidMount() {
        axios.get('https://api.unsplash.com/users/fergtato?client_id=5d1254eb8bbd63208e3d5b7d760896bd504ffc7aedffe2c40f7e2139edf841df')
            .then(response => {
                this.setState({user: response.data});
                this.setState({interests: response.data.tags.custom});
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const interests = this.state.interests.map(i => <Link to={'/search/' + i.title} className="ui label">{i.title}</Link>);
        return <FavouritesConsumer>
        {context =>
            <div className="ui container">

                <div className="ui hidden divider"></div>

                <div className="ui grid middle aligned">

                    <div className="four wide column">
                        <img className="ui centered small circular image" src={this.state.user.profile_image.large} />
                    </div>

                    <div className="twelve wide column">
                        <h1 className="ui header">
                          {this.state.user.name}
                          <div className="sub header">{this.state.user.bio}</div>
                        </h1>

                        {this.state.user.portfolio_url ?
                            <a target="_blank" href={this.state.user.portfolio_url}>
                                <i className="grey linkify icon"></i>{this.state.user.portfolio_url}
                            </a>
                            :
                            null
                        }

                        <h4 className="ui grey header">Interests</h4>
                        {interests}
                    </div>
                </div>

                <div className="ui hidden divider"></div>

                <h3 className="ui grey header">Favourites</h3>

                {context.favourites.length > 0 ?

                    <div className="ui three column doubling stackable masonry grid">
                        {context.favourites.map(p => <FeedItem key={p.id} photo={p} id={p.id} urls={p.urls} user={p.user} likes={p.likes}/>)}
                    </div>
                    :
                    <p>You have no favourites</p>
                }

            </div>
        }
        </FavouritesConsumer>
    }
}

export default Account
