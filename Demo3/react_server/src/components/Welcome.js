import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {Button} from 'react-bootstrap';
class Welcome extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired
    };

    state = {
        username : ''
    };

    doLogout = () =>{
        API.logout().then((status)=>{
            if(status===201){
                this.props.history.push("/");
            }
        })
    }
     
    componentWillMount(){
      
        //document.title = `Welcome, ${this.state.username} !!`;
    }

    componentDidMount(){
       
    }

    render(){
        return(
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <div className="alert alert-warning" role="alert">
                        {this.state.username} welcome to my App..!!
                    </div>
                   
                   <Button
                                bsStyle="success"
                                onClick={() => this.doLogout()}>
                                Logout
                            </Button>



                </div>
            </div>
        )
    }
}

export default withRouter(Welcome);