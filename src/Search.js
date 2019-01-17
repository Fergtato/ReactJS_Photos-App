import React from 'react';

import FeedItem from './components/FeedItem'
import axios from "axios";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photos:[]
        };
    }

    loadQuery( query ) {
        axios.get('https://api.unsplash.com/search/photos/?query=' + query + '&per_page=50&client_id=5d1254eb8bbd63208e3d5b7d760896bd504ffc7aedffe2c40f7e2139edf841df')
            .then(response => {
                this.setState({photos: response.data.results});
                console.log(response.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        const { params } = this.props.match;
        this.loadQuery(params.query);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.query !== this.props.match.params.query) {
            const query = nextProps.match.params.query;
            this.loadQuery(query);
        }
      }

    render() {
        const feedItems = this.state.photos.map(p => <FeedItem key={p.id} id={p.id} urls={p.urls} user={p.user} likes={p.likes}/>);
        return (
            <div className="ui container">

                <div className="ui hidden divider"></div>

                <div className="ui three column doubling stackable masonry grid">
                    {feedItems}
                </div>
            </div>
        )
    }
}

export default Search
