import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Dashboard from "./Dashboard" ;
import HomePage from "./HomePage";



class Main extends Component {


    render() {

        return (
            <div>
                <Route exact path="/" render={() => (
                    <HomePage/>
                )}/>

                <Route exact path="/dashboard" render={() => (
                    <Dashboard/>
                )}/>
            </div>

        );

    }
}
export default withRouter(Main);