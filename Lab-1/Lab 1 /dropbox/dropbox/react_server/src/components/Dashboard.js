import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import {getData,fileDelete} from '../action/index';
import {connect} from 'react-redux';
 
class Dashboard extends Component {

    componentWillMount(){

         console.log("Inside component will mount");
         API.checkSession()
         .then((status)=>{
             if(status===201){
                 API.getImages().then((data)=>{
                    console.log(data);
                    this.props.getData(data);
                    console.log("after setting up the images");
                    console.log("xxxxxx");
                 }).catch((error)=> {return error;})
             }
             else{
                 this.props.history.push("/")
             }
             
          }).catch((error)=>{
            console.log("Inside error of will mount")
            return error;
        })
    }


    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);


        console.log("payload for upload");
        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                           this.props.getData(data); 
                        });
                }
            });

    };

    handleDelete = (data,index) =>{
        console.log("inside handleDelete");

        var payload = {
            file : data
        }
        console.log(payload);
        API.deleteFile(payload).then((status)=>
        {
            if(status===201){
                this.props.fileDelete(index);
            }
        })


    };

    componentDidMount() {
        console.log("componentDidMount function");
         };
            
    renderList(){
        return this.props.userdata.files.map((file,index)=>{
         return(
                    <div key={index} onClick={() => this.handleDelete(file.img,index)}>
                        {file.img.split('/')[2]}
                    </div>
         );
        });
    }


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
                </div>

                <div className="col-md-3">
                    inside the Dashboard
                </div>
               
                <div>
                 {this.renderList()}
                 </div>
                 
                
            </div>
              
 
     </div>
            

        );
  }     


}


function mapStateToProps(userdata) {
    return {userdata};
}



function mapDispatchToProps(dispatch) {
    return {
        getData : (data) => dispatch(getData(data)),
        fileDelete : (data) => dispatch(fileDelete(data))
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

