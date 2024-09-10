const Joi = require('joi');
const bcrypt = require('bcrypt');
const {sign, verify} = require('jsonwebtoken');
const helper = require('../helpers');

const {User} = require('../models');

const store = (req, res) => {
    const body = req.body;

    const validator = Joi.object({
        email: Joi.string().email().max(255).required(),
        password: Joi.string().min(8).max(32).required(),
        username: Joi.string().min(2).max(10).regex(/^([a-zA-Z_-]+)$/).required()
    });

    validator.validateAsync(/* body */ req.query, { abortEarly: false, allowUnknown: true }).then(validated => {
        bcrypt.hash(validated.password, 10).then(hashed => {
            User.findOne({where: {email: validated.email}}).then(response => {
                if (!response) {
                    User.create({
                        email: validated.email,
                        username: validated.username,
                        password: hashed
                    }).then(user => {
                        const id = user.dataValues.id;
                        res.status(200).json({message: 'Registration Successful.', token: sign({id: 'user_id'}, 'ecommercApp2024', {expiresIn: '24h', algorithm: 'HS256'})});
                    });
                } else
                    res.status(201).json({message: 'User Exists.'});
            });
        });
    }).catch(error => res.status(422).json(helper.formatJoiError(error)));
}

module.exports = {store};