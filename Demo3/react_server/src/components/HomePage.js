import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import SignIn from "./SignIn";
import Message from "./Message";
//import Welcome from "./Welcome";
import SignUp from "./SignUp";
import {Button} from "react-bootstrap";

class HomePage extends Component {

    state = {
        isLoggedIn: false,
        message: "Welcome to DropBox",
        username: '',
        check:"SignIn",
        dashboard:false
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                   if(status===201){
                    console.log("after SignIn response");
                    this.setState({
                        isLoggedIn: true,
                        message: "You have succesully LoggedIn..!!",
                        username: userdata.username,
                        dashboard:true,
                        check:"dashboard"

                    });
                    console.log("inside handle submit state");
                    console.log(this.state);
                    this.props.history.push("/Welcome");
                }
                else{

                     console.log("after SignIn response");
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username and password..!!",
                        username: userdata.username,
                        dashboard:false

                    });
                    console.log("inside handle submit state for wrong username");
                    console.log(this.state);
                    this.props.history.push("/SignIn");

                }
                
            }).catch((error)=> {
                console.log("inside error");
                this.setState({
                        isLoggedIn: false,
                        message: "Error While logging in!!",
                        username: userdata.username,
                       // Images:[]
                    });  
               // this.props.history.push('"/');
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
                        check:"SignIn"
                        
                    });

                    this.props.history.push("/SignIn");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    loginSignUp = (data) =>{
         console.log(data) ;
        this.setState({
            check:"data"
        })

    }
    componentWillMount(){

        API.checkSession().then((status)=>{
            if(status===201){
                this.setState({
                        isLoggedIn: true,
                        message: "LoggedIn",
                        
                    }); 
                    this.props.history.push("/Welcome"); 
            }
            else{
                this.props.history.push("/")
            }

        }).catch((error)=>{
            this.props.history.push("/")
        })

    }



    render() {


        return (

<div>
                <div className="col-md-12">
                <div className="row justify-content-md-center">
                    <div className="col-md-10">
                         <Message message={this.state.message}/>
                    </div>

                </div>
                <hr/>
               </div>

        <div className="row">
            <div className="col-md-6">

            <img src = "https://dropboxmainblog.files.wordpress.com/2015/09/team-feature.png?w=650&h=325"/>

            </div>

            <div className="col-md-6">

                        <div className="col-md-10">
                            {this.state.check === "SignIn" ?
                                <SignIn handleSubmit={this.handleSubmit}  loginSignUp = {this.loginSignUp}/>
                                :
                                <SignUp handleRegister={this.handleRegister} loginSignUp = {this.loginSignUp} />
                            }
                        </div>

            </div>

        </div>


</div>
        );





    }
}

export default withRouter(HomePage);