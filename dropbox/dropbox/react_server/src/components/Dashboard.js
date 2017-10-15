import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';
import ImageGridList from "../ImageGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {createBrowserHistory} from 'history' ;
import { Route, withRouter } from 'react-router-dom';

class Dashboard extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired
    };

   state = {
   
   allowed : false

   }

    componentWillMount(){
        //this.handleFileUpload()
      //   createBrowserHistory.push("/");
        this.setState({
            username : this.props.username,
            images : this.props.Images

        });
         console.log("Inside component will mount");
         API.checkSession().then((status)=>{
             console.log("Inside check session");
             if(status !== 201){
             createBrowserHistory.push("/");
            }
        }).catch((error)=>{ console.log("Inside error of will mount")})


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
            <div className="col-md-6">
              <TextField
                    className={'fileupload'}
                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />  
            </div>    

             <div className="col-md-6">   
      {/*  {
          this.state.images.map((images,index) => {
            <div key={index}>
            hello
             {images.img}
            </div>
          })
        }      */}
        inside the Dashboard
        </div>
                
    </div>           
            

</div>    


        );
  }     


}
export default Dashboard;
