import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';


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

    getValidationState() {
        const length = this.state.shareUsername.length;

            console.log(this.state.shareUsername)
            return 'success';
        // else if (length > 5) return 'warning';
        // else if (length > 0) return 'error';

    }

    validate(data){
        console.log("inside validate user in dashboard");

        API.validateUser(data).then((status)=>{
           if(status===201) {
               console.log("correct username");
           }
           else{
               console.log("Username doesnot exist");
           }
        })

    }


            
    renderList(){

        console.log("inside RenderList");
        const popoverRight = (
            <Popover id="popover-positioned-right" title="Enter Username">
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
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
                            onClick={() => this.validate(this.state)}
                            active>
                            share
                        </Button>

                    </FormGroup>
                </form>

            </Popover>
        );
        return this.props.userdata.files.map((file,index)=>{
            console.log("inside Accordion");
        return(
                 <Accordion>
                   <Panel collapsible header={file.img.split('/')[2]}
                          key={index}
                          eventKey={index}
                          >
                       <ButtonToolbar>
                       <Button
                           bsStyle="danger"
                           onClick={() => this.handleDelete(file.img,index)}>
                           Delete
                       </Button>

                        <OverlayTrigger trigger="click" placement="right" overlay={popoverRight}>
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

                </div>
               
                <div>
                    <Jumbotron>
                        <h3> User Files </h3>
                 {this.renderList()}
                    </Jumbotron>
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

