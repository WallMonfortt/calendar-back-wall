const jwt = require('jsonwebtoken');

const createToken = (uid, name) => {

  return new Promise((resolve, reject) => {
    const payload = {uid,name};

    jwt.sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: '1h'
    }, (err, token) => {
      if(err){
        console.log(err);
        reject('Error creating token');
      }else{
        resolve(token);
      }
    })
  })
}


module.exports = {
  createToken
};