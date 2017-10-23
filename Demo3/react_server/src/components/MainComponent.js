import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import HomePage from "./HomePage" ;
import Welcome from "./Welcome";


class MainComponent extends Component {

render(){

    return(
        <div>

            <Route exact path="/" render={() => (
            <div>
                <HomePage/>
            </div>
            )}/>

            <Route exact path="/Welcome" render={() => (
               <div>
                  <Welcome/>
               </div>

             )}/>

        </div>
    );

}


}

export default withRouter(MainComponent);


