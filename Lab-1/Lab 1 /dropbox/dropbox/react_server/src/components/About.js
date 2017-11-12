import {Button,
Jumbotron,
Form,
FormGroup,
FormControl,
ControlLabel} from 'react-bootstrap';
import React, {Component} from 'react';
import {connect} from 'react-redux';


class About extends Component{
    componentWillMount(){
        console.log("About component mounted");
    }


    render () {
        return (
            <div>

                <div className="col-md-4">

                    <div>
                        <div>
                            <ul className="sidebar-nav">
                                <li>
                                    <a href="#">
                                        <h2>Dropbox</h2>
                                        <h4>logo should come here</h4>
                                    </a>
                                </li>
                                <br/>
                                <br/>

                                <li>
                                    <a href="/dashboard"><h3>Dashboard</h3></a>
                                </li>

                                <li>
                                    <a href="/Groups"><h3>Groups</h3></a>
                                </li>

                                <li>
                                    <a href=""><h3>Interests</h3></a>
                                </li>
                                <li>
                                    <a href=""><h3>Logs</h3></a>
                                </li>
                                <li>
                                    <h3>About</h3>
                                </li>
                                <li>
                                    <a href=""><h3>Contact</h3></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>



                      <div className="col-md-3">
                          <h2>About</h2>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <Form>
                          <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Interests </ControlLabel>
                              <FormControl componentClass="textarea" placeholder="Enter Your Interests"/>
                          </FormGroup>
                              <FormGroup controlId="formControlsTextarea">
                                  <ControlLabel>Contact Info</ControlLabel>
                                  <FormControl componentClass="textarea" placeholder="Enter Your Contact info"/>
                              </FormGroup>
                              <FormGroup controlId="formControlsTextarea">
                                  <ControlLabel>Work</ControlLabel>
                                  <FormControl componentClass="textarea" placeholder="Enter Your Work details"/>
                              </FormGroup>
                              <Button bsStyle="primary">Submit</Button>
                          </Form>
                      </div>
                  </div>


        );
    }
}

function mapStateToProps(userdata) {
    return {userdata};
}


export default connect(mapStateToProps)(About);