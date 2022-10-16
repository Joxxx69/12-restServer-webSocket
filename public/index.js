//const axios = require('axios');

function handleCredentialResponse(res) {
    console.log('credential',res.credential);
    axios.post('http://localhost:8080/api/auth/post/google',
        { id_token: res.credential },
        {
            headers: { 'x-token': res.credential }
        }
    )
    .then((res)=>console.log('exito',res))
    .catch(err=>console.log(err,'Ocurrio un error'))
}
 
