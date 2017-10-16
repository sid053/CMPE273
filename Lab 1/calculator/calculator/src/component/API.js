

const headers = {
    'Accept': 'application/json'
};

export const solve = (payload , str) =>
     
    fetch(`${str}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        console.log("foo")
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
