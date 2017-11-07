


const initialState = {
    Name: '',
    password: '',
    email: '',
    username:'',
    files :[],
    groups: [],
    userLog:[],
    folder:[]

};

const userdata = (state = initialState, action) => {

    switch (action.type){
    
        case 'LOGIN' :
            console.log("inside userdata");
            //console.log(action.payload[0].file);

           // console.log("display done");
            state = {
                ...state,
                files: action.payload.file,
                Name : action.payload.name,
                username: action.payload.username
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

        case 'FOLDER' :
            state = {

                ...state,
                folder:[...state.folder ,action.payload]
            }
            break;



    default :
    return state;


   }

 return state;

}

export default userdata ;