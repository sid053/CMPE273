import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';
//import Brand from './Brand';
//import TextField from 'material-ui/TextField';
//import Typography from 'material-ui/Typography';



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





class UserDetails extends Component {


    render() {
        return (
            <div>
                Welcome to the Dropbox : {this.props.userdata.username}
            </div>

        );


    }

}

function mapStateToProps(userdata) {
    return {userdata};
}



// function mapDispatchToProps(dispatch) {
//     return {
//         getData : (data) => dispatch(getData(data)),
//         fileDelete : (data) => dispatch(fileDelete(data))
//     };
// }

export default connect(mapStateToProps)(UserDetails)