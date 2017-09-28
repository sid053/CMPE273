export const clickMenu = (menu) => {
  return {
     type:'MENU_CLICKED',
     payload:menu
     }
}

function mapStateToProps(state) {
    return {
        menu1: state.menu
    };
}