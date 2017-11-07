
export function getData(userdata) {

    return {
        type : 'LOGIN',
        payload : userdata 
    }
};



export function fileDelete(index) {
     //console.log(userdata);
    return {

        type : 'DELETEFILE',
        payload : index
    }
};


export function handleFolder(foldername) {
    console.log("inside folder creation");
    return{
        type: 'FOLDER',
        payload : foldername
    }

}

