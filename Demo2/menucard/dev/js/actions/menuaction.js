export const clickMenu = (menu) => {
console.log("You clicked on the menu ", menu.name);
  return {
     type:'MENU_CLICKED',
     payload: menu

  }
}