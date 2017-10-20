import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';
import ImageGridList from "../ImageGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {createBrowserHistory} from 'history' ;
import { Route, withRouter } from 'react-router-dom';

class ListFiles extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired
    };

   state = {
   
   allowed : false

   }

    componentWillMount(){
        this.setState({
            username : this.props.username,
            images : this.props.Images,
            message : this.props.message

        });
         console.log("Inside component will mount");
         API.checkSession().then((data)=>{
            
             console.log("Inside check session");
                this.setState({
                    images:data,
                    message: "You have logged in ..",
                })
                console.log(this.state.images); 
                console.log("inside here ");
        }).catch((error)=>{ 
            console.log("Inside error of will mount")
        
        })


    }


    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);
        payload.append('username',this.state.username);

        console.log("payload for upload");
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
        console.log("files for the user");
         console.log(this.state.images);
         };
            
  render(){
    return(
      <div>
                <Typography
                    align={'center'}
                    type="display3"
                >
                    Dropbox
                </Typography>
               
     <div className="row">
            <div className="col-md-3">
              <TextField
                    className={'fileupload'}
                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />  
     
            

        );
  }     


}
export default ListFiles;
