const Joi = require('joi');
const bcrypt = require('bcrypt');
const {sign, verify} = require('jsonwebtoken');
const helper = require('../helpers');

const {User} = require('../models');

const auth = (req, res) => {
    const body = req.body;

    const validator = Joi.object({
        email: Joi.string().email().max(255).required(),
        password: Joi.string().min(8).max(32).required()
    });

    validator.validateAsync(/* body */req.query, { abortEarly: false, allowUnknown: true }).then(validated => {
        User.findOne({where:{email: validated.email}}).then(response => {
            if (response)
                bcrypt.compare(validated.password, validated.password).then(matched => {
                    if (matched) {
                        const token = sign({id: 'user_id'}, 'ecommercApp2024', {expiresIn: '24h', algorithm: 'HS256'});
                        res.status(200).json({message: 'Login Successful', token: token});
                    } else
                        res.status(422).json({email: 'Invalid Credentials'});
                    }).catch(error => res.status(500).json({message: 'Server Error: Verification failed.'}));
            else
                res.status(422).json({email: 'User does not exists.'});
        });
    }).catch(error => res.status(422).json(helper.formatJoiError(error)));
}

module.exports = { auth };