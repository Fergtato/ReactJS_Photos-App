import React from 'react';
import axios from "axios";

class Photo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        const { params } = this.props.match
        axios.get('https://api.unsplash.com/users/' + params.username + '?client_id=5d1254eb8bbd63208e3d5b7d760896bd504ffc7aedffe2c40f7e2139edf841df')
            .then(response => {
                this.setState({user: response.data});
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="ui container">

                <div className="ui hidden divider"></div>

                {this.state.user.name}

            </div>
        )
    }
}

export default Photo
