import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import SignIn from "./SignIn";
import Message from "./Message";
//import Welcome from "./Welcome";
import Dashboard from "./Dashboard" ;
import SignUp from "./SignUp";
import {Button} from "react-bootstrap";

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: "Welcome to DropBox",
        username: '',
        Images:[],
        dashboard:true
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((data) => {
                    console.log("after SignIn response");
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username,
                        Images:data
                    });
                    console.log("inside handle submit state");
                    console.log(this.state);
                    this.setState({
                        dashboard:false
                    })
                    this.props.history.push("/dashboard");
            }).catch((error)=> {
                this.setState({
                        isLoggedIn: false,
                        message: "Error While logging in!!",
                        username: userdata.username,
                        Images:''
                    });  
            });
    };


    handleRegister = (userdata) => {
        API.doRegister(userdata)
            .then((status) => {
                console.log("inside handleRegister");
                if (status === 201) {
                    console.log("after Register");
                    this.setState({
                        isLoggedIn: true,
                        message: "You have registered .. SignIn to continue",
                        username: userdata.username,
                        
                    });
            
                    this.props.history.push("/");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };
   
    render() {



if(this.state.dashboard){

        return (
 

 <div>

                <div className="col-md-12">
                <div className="row justify-content-md-center">
                    <div className="col-md-10">
                         <Message message={this.state.message}/>
                    </div>

                </div>
                <hr/>
               
                <div className="row ">
                        <div className="col-sm-6">
                            
                            <img src = "https://dropboxmainblog.files.wordpress.com/2015/09/team-feature.png?w=650&h=325"/>

  
                        </div>
                       
                        <div className="col-md-6">
                             <Route exact path="/" render={() => (
                                <div>
                                  
                                   <div className="col-md-10"> 
                                       <SignIn handleSubmit={this.handleSubmit}/>
                                   </div>
                        
                                  <div className="col-md-10">
                                    <Button bsStyle="primary" onClick={() => {
                                    this.props.history.push("/SignUp");
                                    }}>
                                        Register
                                    </Button>
                                   </div>
                                </div>
                            )}/>

                            <Route exact path="/SignUp" render={() => (
                                     <div>
                                        <SignUp handleRegister={this.handleRegister}/>
                                    
                                    </div>
                            )}/> 
                        </div>


                
                </div>
            </div>  
{/*         -----------------------------------------------------------------------------------------   */}

        </div>
              );


    }
else{
        return(
                <Route exact path="/dashboard" render={() => (
                    <Dashboard {...this.state}/>
                )}/>
            
             );
  }


       
    }
}

export default withRouter(NewerHomePage);