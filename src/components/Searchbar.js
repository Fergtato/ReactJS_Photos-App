import React from 'react'
import ReactDOM from "react-dom";
import {withRouter} from 'react-router-dom';

class Searchbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };
    }

    saveQuery( event ) {
        this.setState({
            query: event.target.value
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            console.log('enter key pressed')
            this.props.history.push('/search/' + this.state.query);
        }
    }

  render() {
    return (
        <div className="ui category search item">
            <div className="ui transparent icon input">
                <input
                    className="prompt"
                    type="text"
                    value={this.state.query}
                    onChange={this.saveQuery.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                    placeholder="Search photos...">
                </input>
                <i className="search link icon"></i>
            </div>
            <div className="results"></div>
        </div>
    );
  }
}

export default withRouter(Searchbar);
