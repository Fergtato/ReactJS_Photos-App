import React from 'react';

import FeedItem from './components/FeedItem'
import axios from "axios";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collection:[],
            collectionPhotos:[]
        };
    }

    componentDidMount() {
        const { params } = this.props.match
        axios.get('https://api.unsplash.com/collections/' + params.id + '?client_id=5d1254eb8bbd63208e3d5b7d760896bd504ffc7aedffe2c40f7e2139edf841df')
            .then(response => {
                this.setState({collection: response.data});
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('https://api.unsplash.com/collections/' + params.id + '/photos?per_page=50&client_id=5d1254eb8bbd63208e3d5b7d760896bd504ffc7aedffe2c40f7e2139edf841df')
            .then(response => {
                this.setState({collectionPhotos: response.data});
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const feedItems = this.state.collectionPhotos.map(p => <FeedItem key={p.id} id={p.id} urls={p.urls} user={p.user} likes={p.likes}/>);
        return (
            <div className="ui container">

                <div className="ui hidden divider"></div>

                <p>{this.state.collection.title}</p>

                <div className="ui hidden divider"></div>

                <div className="ui three column doubling stackable masonry grid">
                    {feedItems}
                </div>
            </div>
        )
    }
}

export default Search
