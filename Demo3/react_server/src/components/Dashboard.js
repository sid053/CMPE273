import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';
import ImageGridList from "../ImageGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {createBrowserHistory} from 'history' ;
import { Route, withRouter } from 'react-router-dom';
import {getData} from '../action/index';
import {connect} from 'react-redux';
 
class Dashboard extends Component {

   state = {
          filecheck:[1,2,3,4,5]
        }

    componentWillMount(){

         console.log("Inside component will mount");
         API.checkSession()
         .then((status)=>{
             if(status===201){
              API.getImages().then((data)=>{
                console.log(data);
                this.props.getData(data);
                console.log("after setting up the images");

                 //console.log(this.props.userdata.files);

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
        payload.append('username',this.state.username);

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
    componentDidMount() {
        console.log("componentDidMount function");
         };
            
renderList(){

  return this.props.userdata.files.map((file,index)=>{
    return(
    <div>{file.img.split('/')[2]}
                    {console.log(file.img.split('/')[2])}
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

        //addFile : (data) => dispatch(addFile(data)),
        //deleteFile : (index) => dispatch(deleteFile(index)),
        getData : (data) => dispatch(getData(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

