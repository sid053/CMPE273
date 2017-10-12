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

   

    componentWillMount(){
        this.setState({
            username : this.props.username,
            images : this.props.Images

        });
    }
    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);
        payload.append('username',this.state.username);

        console.log("payload for upload");
        // console.log(payload.body.username);
        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    // API.getImages()
                    //     .then((data) => {
                    //         this.setState({
                    //             images: data
                    //         });
                    //     });
                }
            });

    };

    // constructor() {
    //     super();
    //     this.state = {
    //         images: []


    //     };
    // }

    componentDidMount() {
        console.log("componentDidMount function");
        console.log("I am here");
         console.log(this.state.username);
         };

    render() {
         console.log("Inside handleFileUpload :" + this.state.images);

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
               {/*   <ImageGridList images={this.state.images}/>   */}
            </div>

        );
    }
}

export default Upload;
