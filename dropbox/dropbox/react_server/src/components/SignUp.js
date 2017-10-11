import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
class SignUp extends Component {

    static propTypes = {
        handleRegister: PropTypes.func.isRequired
    };

    state = {
        username: '',
        password: '',
        email : '',
        name:''

    };

    componentWillMount(){
        this.setState({
            username: '',
        password: '',
        email : '',
        name:''
        });
    }

    render() {
        return (
            
            <div className="container">
            <div className="row main">
                  <div className="main-login main-center">
                    <form className="form-horizontal">
                        
                        <div className="form-group">
                            <label for="name" className="cols-sm-2 control-label">Your Name</label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                     <input className="form-control" type = "text" placeholder="Enter Your Name"
                                    value={this.state.name}
                                     onChange={(event) => {
                                         this.setState({
                                        name: event.target.value
                                         });
                                }}/>

                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="email" className="cols-sm-2 control-label">Your Email</label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                                    <input className="form-control" type = "text" placeholder="Enter your Email"
                                    value={this.state.email}
                                     onChange={(event) => {
                                         this.setState({
                                        email: event.target.value
                                         });
                                }}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="username" className="cols-sm-2 control-label">Username</label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                                   <input className="form-control" type = "text" placeholder="Enter your Username"
                                    value={this.state.username}
                                     onChange={(event) => {
                                         this.setState({
                                        username: event.target.value
                                         });
                                }}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="password" className="cols-sm-2 control-label">Password</label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                    <input className="form-control" type = "password" placeholder="Enter your Password"
                                    value={this.state.password}
                                     onChange={(event) => {
                                         this.setState({
                                        password: event.target.value
                                         });
                                }}/>
                                </div>
                            </div>
                        </div>

                        

                        <div className="form-group ">
                            <Button
                                bsStyle="primary"
                                onClick={() => this.props.handleRegister(this.state)}> Register</Button>
                        </div>
                      
                    </form>
                </div>
            </div>
        </div>




        );
    }
}

export default SignUp;