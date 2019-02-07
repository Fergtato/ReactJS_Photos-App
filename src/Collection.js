import React from 'react';
import axios from "axios";
import FeedItem from './components/FeedItem';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collection:{
                cover_photo:{
                    urls:{}
                }
            },
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
        const feedItems = this.state.collectionPhotos.map(p => <FeedItem key={p.id} photo={p} id={p.id} urls={p.urls} user={p.user} likes={p.likes}/>);
        return (
            <div className="ui container">

                <div className="ui hidden divider"></div>



                <div className="hero-image" style={{background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${this.state.collection.cover_photo.urls.regular}')`}}>
                    <div className="hero-text">
                        <h1>{this.state.collection.title}</h1>
                        <p>{this.state.collection.description}</p>
                    </div>
                </div>


                <div className="ui hidden divider"></div>

                <div className="ui three column doubling stackable masonry grid">
                    {feedItems}
                </div>
            </div>
        )
    }
}

export default Search
