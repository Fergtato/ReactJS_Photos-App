import React from "react";

class FeedItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        favourite: false,
        like: false
    };

    this.toggleFavourite = this.toggleFavourite.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

    toggleFavourite() {
        this.setState(prevState => ({
            favourite: !prevState.favourite
        }));
    }

    toggleLike() {
        this.setState(prevState => ({
            like: !prevState.like
        }));
    }

    render() {
        return (
        <div className="column">
            <div className="ui link fluid card">
                <a className="image" href={'/photo/' + this.props.id}>
                    { this.state.favourite ?
                        <div className="ui fluid image">
                          <a className="ui yellow left corner label">
                            <i className="star icon"></i>
                          </a>
                          <img src={this.props.urls.regular} />
                        </div>
                        :
                        <img src={this.props.urls.regular} />
                    }

                </a>
                <div className="content">
                    <div className="right floated meta">14h</div>
                    <a href={'/user/' + this.props.user.username}>
                        <img className="ui avatar image" src={this.props.user.profile_image.medium}></img>
                        {this.props.user.name}
                    </a>
                </div>
                <div className="extra content">
                    <span className="right floated">
                        <a onClick={this.toggleLike}>
                            <i className={"heart  " + (this.state.like ? "red" : "outline") + " like icon"}></i>
                            {this.props.likes} likes
                        </a>
                    </span>
                    <a onClick={this.toggleFavourite}>
                        <i className={"star  " + (this.state.favourite ? "yellow" : "outline") + " favourite icon"}></i>
                        {this.state.favourite ? "Favourited" : "Favourite"}
                    </a>
                </div>
            </div>
        </div>
        );
    }
}

export default FeedItem;
