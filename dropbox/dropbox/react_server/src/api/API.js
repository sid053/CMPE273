const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'


const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/users/doLogin`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(res => { 
        console.log("inside dologin");
        console.log(res.status);
        if(res.status===201){

        return res.json();
         }

    }).catch(error => {

            console.log("This is error inside dologin");
            return error;
        });



export const doRegister = (payload) =>

    fetch(`${api}/users/doRegister`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res.status);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });






export const getImages = () =>
    fetch(`${api}/files/`,{method :'GET' , 
        credentials:'include',
         mode:'cors',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
        }

     }).then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });




export const checkSession = () =>
     fetch(`${api}/files/check`,{
        method :'GET',
        credentials: 'include',
         mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }

           }).then(res => res.status)
        .catch(error => {
            console.log("This is error.");
            return error;
        });




export const uploadFile = (payload) =>
    fetch(`${api}/files/upload`, {
        method: 'POST',
         credentials: 'include',
        mode: 'cors',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
            console.log("This is error");
            return error;
        });
