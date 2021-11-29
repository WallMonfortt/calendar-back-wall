const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {createToken} = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, password} = req.body;

  try {
    // Comprobar que el usuario no exista
    let user = await User.findOne({email});
    if(user){
      return res.status(400).json({
        ok: false,
        message: 'User already exists'
      });
    }
    // Crear nuevo usuario
    user = new User(req.body);
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt);
    // Guardar usuario
    await user.save();
    // Generar token
    const token = await createToken(user.id, user.name);
    
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error interno, por favor contacte al admin'
    })
  }
};

const userLogin = async (req, res = response) => {
  //Login de usuario
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});
    // Comprobar si existe el usuario
    if(!user){
      return res.status(400).json({
        ok: false,
        message: 'User not exists'
      });
    }

    // Comprobar contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    // Si no es correcta
    if(!validPassword){
      return res.status(400).json({
        ok: false,
        message: 'Incorrect password'
      });
    }

    // Generar token
    const token = await createToken(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name, 
      token     
    });


  } catch (error) {
    res.status(500).json({
      message: 'Error interno, por favor contacte al admin'
    })
  }
};

const renewToken = async (req, res = response) => {

  const {uid, name} = req;

  const token = await createToken(uid, name);


  res.json({
    ok: true,
    token,
  });
}



module.exports = {
  createUser,
  userLogin,
  renewToken
}