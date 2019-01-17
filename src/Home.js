import React from 'react';

import FeedItem from './components/FeedItem'
import axios from "axios";
import { Header, Icon } from 'semantic-ui-react';
import BottomScrollListener from 'react-bottom-scroll-listener';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photos:[],
            sort: 'latest',
            page: 1,
            loading: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        this.apiCall();
    }

    handleClick(sortMode) {
        {/*setState is asynchronis so re-call api when it's finished*/}
        this.setState({
            sort: sortMode
        }, () => {
            this.apiCall();
        });
    }

    apiCall() {
        axios.get('https://api.unsplash.com/photos/?per_page=30&page=' + this.state.page + '&order_by=' + this.state.sort + '&client_id=5d1254eb8bbd63208e3d5b7d760896bd504ffc7aedffe2c40f7e2139edf841df')
            .then(response => {
                {/*Append json response data to existing photos array*/}
                this.setState({photos: [...this.state.photos, ...response.data]});
            })
            .catch(err => {
                console.log(err);
            });
    }

    loadMore() {
        this.setState(prevState => ({
          page: prevState.page + 1
        }));

        this.apiCall();
    }

    render() {
        const feedItems = this.state.photos.map(p => <FeedItem key={p.id} id={p.id} urls={p.urls} user={p.user} likes={p.likes}/>);
        return (
            <div className="ui container" onScroll={this.handleScroll}>

                <div className="ui text menu">
                    <div className="right menu">
                        <div className="header item">Sort By</div>
                        <a
                            className={(this.state.sort == "popular" ? "active" : "") + " item"}
                            onClick={()=>{this.handleClick('popular')}}>
                            Popular
                        </a>
                        <a
                            className={(this.state.sort == "latest" ? "active" : "") + " item"}
                            onClick={()=>{this.handleClick('latest')}}>
                            Latest
                        </a>
                        <a
                            className={(this.state.sort == "oldest" ? "active" : "") + " item"}
                            onClick={()=>{this.handleClick('oldest')}}>
                            Oldest
                        </a>
                    </div>
                </div>

                <div className="ui three column doubling stackable masonry grid">
                    {feedItems}
                </div>

                <div className="ui hidden divider"></div>
                <div class="ui active centered inline loader"></div>
                <div className="ui hidden divider"></div>


                <BottomScrollListener onBottom={this.loadMore} />

            </div>
        )
    }
}
export default Home