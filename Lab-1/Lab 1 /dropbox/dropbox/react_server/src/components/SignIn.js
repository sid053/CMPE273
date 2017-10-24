import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import * as API from '../api/API';

class SignIn extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    state = {
        username: '',
        password: '',
         images: []
    };

    componentWillMount(){
        this.setState({
            username: '',
            password: '',
            images :[]
        });
      
      API.checkSession().then((data)=>{
            
             console.log("Inside check session");
                this.setState({
                    images:data,
                    message: "You have logged in ..",
                })
                console.log(this.state.images); 
                console.log("inside here ");
                this.props.history.push("/dashboard");
        }).catch((error)=>{ 
            console.log("Inside error of will mount")
        
        })



    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div>
                    <form>
                        <div className="form-group">
                            <h1>Login</h1>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="Username"
                                placeholder="Enter Username"
                                value={this.state.username}
                                onChange={(event) => {
                                    this.setState({
                                        username: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <Button
                                bsStyle="primary"
                                onClick={() => this.props.handleSubmit(this.state)}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;