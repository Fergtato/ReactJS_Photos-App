import React from 'react';
import axios from "axios";
import FeedItem from './components/FeedItem';
import BottomScrollListener from 'react-bottom-scroll-listener';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photos:[],
            photosOrdered:[],
            sort: 'latest',
            page: 1,
            loading: false,
            columns: 3,
            maxCards: 30
        };

        this.handleClick = this.handleClick.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    apiCall() {
        axios.get('https://api.unsplash.com/photos/?per_page=30&page=' + this.state.page + '&order_by=' + this.state.sort + '&client_id=5d1254eb8bbd63208e3d5b7d760896bd504ffc7aedffe2c40f7e2139edf841df')
            .then(response => {
                this.setState({
                    photos: [...this.state.photos, ...response.data]
                });

                this.reorder(this.state.photos.slice(0,this.state.maxCards*this.state.page), this.state.columns);
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.apiCall();
    }

    handleClick(sortMode) {
        {/*setState is asynchronis so re-call api when it's finished*/}
        this.setState({
            sort: sortMode
        }, () => {
            this.setState({photos: []});
            this.apiCall();
        });
    }

    loadMore() {
        this.setState(prevState => ({
          page: prevState.page + 1,
          loading: true
        }));

        this.apiCall();
    }

    reorder = (arr, columns) => {

        const cols = columns;
        const out = [];
        let col = 0;
        while(col < cols) {
            for(let i = 0; i < arr.length; i += cols) {
                let _val = arr[i + col];
                if (_val !== undefined)
                    out.push(_val);
            }
            col++;
        }
        this.setState({ photosOrdered: out });
    }

    render() {
        const feedItems = this.state.photosOrdered.map(p => <FeedItem key={p.id} photo={p} id={p.id} urls={p.urls} user={p.user} likes={p.likes}/>);
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
                <div className={"ui active centered inline loader " + (this.state.loading ? "" : "hide")}></div>
                <div className="ui hidden divider"></div>

                <BottomScrollListener onBottom={this.loadMore} />

            </div>
        )
    }
}
export default Home
