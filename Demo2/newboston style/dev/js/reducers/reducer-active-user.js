import {connect} from 'react-redux';
import React, {Component} from 'react'; 

 export default this.props.menu.map((menu,action) => { return{
    switch (action.type) {

        case 'MENU_CLICKED':
            //console.log(menu);
            console.log("inside menu clicked");
            return(
            	    
            	    menu: {
        ...state.menu,
        status: true,
    }
                  
           );
            break;    
      default:
    return state;
}
};
});


function mapStateToProps(state) {
	//console.log("inside props11");
console.log(state.menu);
	console.log("inside stupid");
    return { menu: state.menu
       };
}

//export default connect(mapStateToProps)(check);



