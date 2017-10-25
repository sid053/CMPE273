import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API'
class Message extends Component {

    static propTypes = {
        message: PropTypes.string.isRequired
    };

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
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    {this.props.message && ( //Just a change here
                        <div className="alert alert-warning" role="alert">
                            {this.props.message}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Message;