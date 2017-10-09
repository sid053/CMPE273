import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import SignIn from "./SignIn";
import Message from "./Message";
import Welcome from "./Welcome";
import Upload from "./Upload" ;
import SignUp from "./SignUp";
import {Button} from "react-bootstrap";

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: ''
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/Upload");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        <Message message="You have landed on my App !!"/>
                       <div className="col-md-6">   <Button bsStyle="primary" onClick={() => {
                            this.props.history.push("/SignIn");
                        }}>
                            SignIn
                        </Button>
                        </div>
                        <div className="col-md-6">
                        <Button bsStyle="primary" onClick={() => {
                            this.props.history.push("/SignUp");
                        }}>
                            SignUp
                        </Button>
                        </div>
                    </div>
                  


                )}/>

                <Route exact path="/SignIn" render={() => (
                    <div>
                        <SignIn handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/> 

                <Route exact path="/SignUp" render={() => (
                    <div>
                        <SignUp handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/> 

                <Route exact path="/welcome" render={() => (
                    <Welcome username={this.state.username}/>
                )}/>

                <Route exact path="/Upload" render={() => (
                    <Upload/>
                )}/>


            </div>
        );
    }
}

export default withRouter(NewerHomePage);