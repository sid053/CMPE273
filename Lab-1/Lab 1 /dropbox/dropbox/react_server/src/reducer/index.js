


const initialState = {
    Name: '',
    password: '',
    email: '',
    username:'',
    files :[],
    groups: [],
    userLog:[],

};

const userdata = (state = initialState, action) => {

    switch (action.type){
    
        case 'LOGIN' :
            console.log("inside userdata");
            console.log(action.payload);
            console.log("display done");
            return {
                files: action.payload
            };
            break;

        case 'DELETEFILE' :
            console.log("inside clicked ");

            console.log(state.files);
            state = {
                ...state,
                files:[
                    ...state.files.slice(0, action.payload),
                    ...state.files.slice(action.payload + 1)
                ]
            };
            console.log(state.files);
            break;





    default :
    return state;


   }

   return state;

}

export default userdata ;