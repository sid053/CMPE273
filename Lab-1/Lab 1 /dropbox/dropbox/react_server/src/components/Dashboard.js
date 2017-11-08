import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';
import Brand from './Brand';
//import TextField from 'material-ui/TextField';
//import Typography from 'material-ui/Typography';
import UserDetails from './UserDetails'


import { withRouter } from 'react-router-dom';
import {getData, fileDelete, handleFolder} from '../action/index';
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

    //*********************************************************************************

    componentWillMount(){

         console.log("Inside component will mount");
         API.checkSession()
         .then((status)=>{
             if(status===201){
                 API.getImages().then((data)=>{
                     console.log("************************************")
                    console.log(data);
                     console.log("************************************")
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

    //*********************************************************************************

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);


        console.log("payload for upload");
        API.uploadFile(payload)
            .then((status) => {
                if (status === 201) {
                    console.log("upload successfull , calling get Images");
                    API.getImages()
                        .then((data) => {
                           this.props.getData(data);
                        });
                }
            });

    };
    //*********************************************************************************
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

    //*********************************************************************************

    logout = () => {
        console.log("inside logout function");
        API.doLogout().then((status)=>{
            if(status===201){
                this.props.history.push("/");
            }
        })
    }
    //*********************************************************************************
    componentDidMount() {
        console.log("componentDidMount function");
         };

    //the other display code


    state={
        shareUsername:'',
        foldername:''

    }
    //*********************************************************************************

    handlefolder(data){
        console.log("inside folder creation");
       // console.log(data);
        API.uploadFolder(data).then((status)=>
        {
            if(status===201){
                var test = "/sid/"+data;
                this.props.handleFolder(test);

            }
            else{
                console.log("error while uploading");
            }
        })
    }

    //*********************************************************************************

    deleteFolder(data){
        console.log("inside delete folder thingy");
        console.log(data);


    }

    //*********************************************************************************
    validate(username,file){
        console.log("inside validate user in dashboard");
          //  console.log(file);
            const data = {
                'shareUsername':username
            }
            const payload = {
                'shareUsername': this.state.shareUsername,
                'img' : file
            }
           // console.log(payload);
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

    //*********************************************************************************
    renderListFiles(){

        return this.props.userdata.files.map((file,index)=>{

             return (
                 <Accordion>
                     <Panel collapsible header={file.filename}
                            key={index}
                            eventKey={index}
                     >
                         <ButtonToolbar>
                             <Button
                                 bsStyle="danger"
                                 onClick={() => this.handleDelete(file.filename, index)}>
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
                                                 onChange={(event) => {
                                                     this.setState({shareUsername: event.target.value});
                                                 }}
                                             />

                                             <Button
                                                 bsStyle="primary"
                                                 onClick={() => this.validate(this.state.shareUsername, file.filename)}
                                                 active>
                                                 share
                                             </Button>

                                         </FormGroup>
                                     </form>

                                 </Popover>

                             }>
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

    //*********************************************************************************

   renderListFolders(){
        if(this.props.userdata.folder.length===0){
            return(<h4>You have no Folders</h4>);
        }
       else {
            return this.props.userdata.folder.map((folders, index) => {

                console.log("inside Accordion for folders");
                var check = folders.split('/');
                console.log(check , check.length);

                console.log("after folder ");

                var head = (check[check.length-1]).toUpperCase() + "   Parent-> "  + check[check.length-2]
                    return (
                        <Accordion>
                            <Panel collapsible header={head}
                                   key={index}
                                   eventKey={index}
                            >
                                <ButtonToolbar>
                                    <Button
                                        bsStyle="danger"
                                        onClick={()=>{this.deleteFolder(folders)}}
                                    >
                                        Delete
                                    </Button>

                                    <OverlayTrigger trigger="click" rootClose placement="right" overlay={

                                        <Popover id="popover-trigger-click-root-close" title="Add Files">
                                            <form>

                                            </form>

                                        </Popover>

                                    }>
                                        <Button
                                            bsStyle="primary"
                                            active>
                                            AddFiles
                                        </Button>
                                    </OverlayTrigger>

                                    <OverlayTrigger trigger="click" rootClose placement="right" overlay={

                                        <Popover id="popover-trigger-click-root-close" title="Share Folder">
                                            <form>
                                                <FormGroup
                                                    controlId="formBasicText"
                                                >
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.shareUsername}
                                                        placeholder="Enter username"
                                                        onChange={(event) => {
                                                            this.setState({shareUsername: event.target.value});
                                                        }}
                                                    />

                                                    <Button
                                                        bsStyle="primary"

                                                        active>
                                                        share
                                                    </Button>

                                                </FormGroup>

                                            </form>

                                        </Popover>

                                    }>
                                        <Button
                                            bsStyle="primary"
                                            active>
                                            Share
                                        </Button>
                                    </OverlayTrigger>
                                </ButtonToolbar>
                            </Panel>
                        </Accordion>

                    );

            });

        }
    }

    //*********************************************************************************

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
                          <Brand logout={this.logout} />
                      </div>

                  </div>

              </div>


          </div>


           <div className="row">

               <div className="col-md-4">

                   <Jumbotron>
                       <UserDetails/>
                   </Jumbotron>

               </div>

               <div className="col-md-5">
                   <label className="custom-file">
                       <input type="file" id="file"
                              name="mypic"
                              className="custom-file-input"
                              onChange={this.handleFileUpload}/>
                           <span className="custom-file-control"></span>
                   </label>

                   <h3> User Files </h3>
                   {this.renderListFiles()}
                   <h3> Folders </h3>
                   {this.renderListFolders()}

               </div>


                <div className="col-md-3">
                    <Jumbotron>
                        <OverlayTrigger trigger="click" rootClose placement="right" overlay={

                            <Popover id="popover-trigger-click-root-close" title="Enter FolderName">
                                <form>
                                    <FormGroup
                                        controlId="formBasicText"
                                    >
                                        <FormControl
                                            type="text"
                                            value={this.state.foldername}
                                            placeholder="Enter username"
                                            onChange={(event)=>{
                                                this.setState({ foldername: event.target.value });
                                            }}
                                        />

                                        <Button
                                            bsStyle="primary"
                                            onClick={() => this.handlefolder(this.state.foldername)}
                                            >
                                            create
                                        </Button>

                                    </FormGroup>
                                </form>

                            </Popover>

                        }  >
                            <Button
                                bsStyle="primary"
                                active>
                                New Folder
                            </Button>
                        </OverlayTrigger>
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
        fileDelete : (data) => dispatch(fileDelete(data)),
        handleFolder : (data) => dispatch(handleFolder(data))
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

