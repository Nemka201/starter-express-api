const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/user');

const createUser = async (req, res) => {
    const newUser = { ...user, ...req.body };
    newUser.password = await hashPassword(newUser.password);
    const data = JSON.stringify(newUser, null, 2);
    const filePath = path.join(__dirname, '../data/users.json');

    fs.appendFile(filePath, `${data}\n`, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al guardar el usuario');
        } else {
            res.send('Usuario creado correctamente');
        }
    });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const usersData = await fs.promises.readFile(path.join(__dirname, '../data/users.json'), 'utf-8');
    const users = JSON.parse(usersData);

    const foundUser = users.find(user => user.username === username);

    if (!foundUser) {
        return res.status(401).send('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
        return res.status(401).send('Contraseña incorrecta');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: foundUser.id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token });
};

module.exports = {
    createUser,loginUser
};