import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';
import ImageGridList from "../ImageGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

class Upload extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired
    };

    state = {
        username :' '
    }

    componentWillMount(){
        this.setState({
            username : this.props.username
        });
    }
    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);
        payload.append('username',this.state.username);
         
        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data
                            });
                        });
                }
            });

    };

    constructor() {
        super();
        this.state = {
            images: []


        };
    }

    componentDidMount() {
         this.setState({
            username : this.props.username
        });
         const payload = new FormData();
         payload.append('username',this.state.username);
         console.log(this.state.username + "Before sending the get");
         console.log(payload);
        API.getImages(payload)
            .then((data) => {
                console.log(data);
                this.setState({
                    images: data
                });
            });
    };

    render() {
         //console.log("Inside handleFileUpload :" + this.state.username)

        return (
            <div >
                <Typography
                    align={'center'}
                    type="display3"
                >
                    Dropbox
                </Typography>
                <TextField
                    className={'fileupload'}
                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />
                <ImageGridList images={this.state.images}/>
            </div>

        );
    }
}

export default Upload;
