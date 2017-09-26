import React from 'react';
import UserList from '../containers/user-list';
import order from '../containers/order';
import UserDetails from '../containers/user-detail';
import Menu from '../containers/menu-list';
import {Button, Jumbotron,Panel} from 'react-bootstrap';
require('../../scss/style.scss');

const title = (
  <h2>Menu</h2>
);
const title2 = (<h2>Order</h2>);

const App = () => (
	
	<div className = "container-fluid">
    <div className= "row">
        <div className="col-sm-6">
          <Panel header={title} bsStyle="primary">
        
        <Menu/>
       
        </Panel>
        </div>
          


        
        <div className="col-sm-6">  
        <Panel header={title2}  footer="  Total:" bsStyle="primary">
            <order />
        </Panel>
        </div>

    </div>
    </div>
    
);

export default App;
