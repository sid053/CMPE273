
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


