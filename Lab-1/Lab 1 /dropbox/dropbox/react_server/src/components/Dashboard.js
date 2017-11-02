import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';
import Brand from './Brand';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Footer from './Footer';
import Basic from './Basic';

import { withRouter } from 'react-router-dom';
import {getData,fileDelete} from '../action/index';
import {connect} from 'react-redux';

import {Panel,
       Accordion,
       Jumbotron,
        Button,
        ButtonToolbar,
        OverlayTrigger,
        Popover,
        FormGroup,
        FormControl} from 'react-bootstrap';
 
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

    //the other display code


    state={
        shareUsername:''
    }


    validate(data,file){
        console.log("inside validate user in dashboard");
            console.log(file);
            console.log(data);
            const payload = {
                'shareUsername': this.state.shareUsername,
                'img' : file
            }
            console.log(payload);
            API.validateUser(data).then((status)=>{
           if(status===201) {

               console.log("correct username");
               API.share(payload).then((status)=>
               {
                   if(status===201){
                       console.log("file shared succesfully");
                   }else{
                       console.log("unable to share");
                   }
               }).catch((error)=>{
                   console.log(error);
               })
           }


           else{
               console.log("Username doesnot exist");
           }
        }).catch((error) => {
            console.log("Error Occured while checking the username")
        })

    }

    renderList(){

        return this.props.userdata.files.map((file,index)=>{
            console.log("inside Accordion");
        return(
                 <Accordion>
                   <Panel collapsible header={file.img}
                          key={index}
                          eventKey={index}
                          >
                       <ButtonToolbar>
                       <Button
                           bsStyle="danger"
                           onClick={() => this.handleDelete(file.img,index)}>
                           Delete
                       </Button>

                        <OverlayTrigger trigger="click" rootClose placement="right" overlay={

                            <Popover id="popover-trigger-click-root-close" title="Enter Username">
                                <form>
                                    <FormGroup
                                        controlId="formBasicText"
                                    >
                                        <FormControl
                                            type="text"
                                            value={this.state.shareUsername}
                                            placeholder="Enter username"
                                            onChange={(event)=>{
                                                this.setState({ shareUsername: event.target.value });
                                            }}
                                        />

                                        <Button
                                            bsStyle="primary"
                                            onClick={() => this.validate(this.state,file.img)}
                                            active>
                                            share
                                        </Button>

                                    </FormGroup>
                                </form>

                            </Popover>

                        }  >
                            <Button
                                bsStyle="primary"
                                active>
                                share
                            </Button>
                        </OverlayTrigger>
                       </ButtonToolbar>
                   </Panel>
               </Accordion>

          );
        });
    }


    render(){
        var containerStyle = {
            fontFamily: '"Lato", sans-serif',
            margin: '40px 0',
            overflow: 'hidden'
        };

     
    return(
      <div>
          <div className="container-fluid">
              <div className="row">
                  <div style={containerStyle}>

                      <div className="col-sm-5">
                          <Brand />
                      </div>

                  </div>
              </div>
          </div>


           <div className="row">

               <div className="col-md-4">

               </div>

               <div className="col-md-3">
                   <label className="custom-file">
                       <input type="file" id="file"
                              name="mypic"
                              className="custom-file-input"
                              onChange={this.handleFileUpload}/>
                           <span className="custom-file-control"></span>
                   </label>
               </div>


                <div className="col-md-5">
                        <h3> User Files </h3>
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

