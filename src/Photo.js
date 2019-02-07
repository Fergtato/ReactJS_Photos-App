import React from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';

class Photo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photo: {
                urls: {},
                links:{},
                user: {
                    links:{},
                    profile_image:{}
                },
                exif:{}
            }
        };
    }

    componentDidMount() {
        const { params } = this.props.match
        axios.get('https://api.unsplash.com/photos/' + params.id + '?client_id=5d1254eb8bbd63208e3d5b7d760896bd504ffc7aedffe2c40f7e2139edf841df')
            .then(response => {
                this.setState({photo: response.data});
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        console.log(this.state.photo.urls.regular);
        return (
            <div className="ui container">

                <div className="ui hidden divider"></div>

                <div className="ui grid">
                    <div className="twelve wide column">
                        <img className="ui fluid rounded image" src={this.state.photo.urls.regular} />
                    </div>
                    <div className="four wide column">

                        <div className="ui segments">

                            <div className="ui segment center aligned">
                                <Link to={'/user/' + this.state.photo.user.username} className="ui tiny circular centered image">
                                    <img src={this.state.photo.user.profile_image.large} />
                                </Link>
                                <h5 className="ui center aligned header">
                                    <Link to={'/user/' + this.state.photo.user.username}>
                                        {this.state.photo.user.name}
                                    </Link>
                                    <div className="sub header">@{this.state.photo.user.username}</div>
                                </h5>
                            </div>

                            <div className="ui segment">

                                <h4 className="ui header">
                                    Statistics
                                </h4>

                                <table className="ui celled table">
                                    <tbody>
                                        <tr>
                                            <td><i className="arrows alternate horizontal icon"></i> Width</td>
                                            <td>{this.state.photo.width}px</td>
                                        </tr>
                                        <tr>
                                            <td><i className="arrows alternate vertical icon"></i> Height</td>
                                            <td>{this.state.photo.height}px</td>
                                        </tr>
                                        <tr>
                                            <td><i className="heart icon"></i> Likes</td>
                                            <td>{this.state.photo.likes}</td>
                                        </tr>
                                        <tr>
                                            <td><i className="eye icon"></i> Views</td>
                                            <td>{this.state.photo.views}+</td>
                                        </tr>
                                        <tr>
                                            <td><i className="download icon"></i> Downloads</td>
                                            <td>{this.state.photo.downloads}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <a href={this.state.photo.links.download + '?force=true'} class="fluid ui primary basic animated fade button" tabindex="0">
                                  <div className="visible content">Download</div>
                                  <div className="hidden content">
                                    <i className="download icon"></i>
                                  </div>
                                </a>

                            </div>

                            <div className="ui segment">
                                <h4 className="ui header">
                                    Camera
                                </h4>

                                <table className="ui celled table">
                                  <tbody>
                                    <tr>
                                      <td>Make</td>
                                      <td>{this.state.photo.exif.make}</td>
                                    </tr>
                                    <tr>
                                      <td>Model</td>
                                      <td>{this.state.photo.exif.model}</td>
                                    </tr>
                                    <tr>
                                      <td>Shutter Speed</td>
                                      <td>{this.state.photo.exif.exposure_time}s</td>
                                    </tr>
                                    <tr>
                                      <td>Aperture</td>
                                      <td>f/{this.state.photo.exif.aperture}</td>
                                    </tr>
                                    <tr>
                                      <td>Focal Length</td>
                                      <td>{this.state.photo.exif.focal_length}</td>
                                    </tr>
                                    <tr>
                                      <td>ISO</td>
                                      <td>{this.state.photo.exif.iso}</td>
                                    </tr>
                                  </tbody>
                                </table>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default Photo
