


const initialState = {
    Name: '',
    password: '',
    email: '',
    username:'',
    files :[],
    groups: [],
    userLog:[]
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


    default :
    return state;


   }

}

export default userdata ;