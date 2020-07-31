const knex = require('./knex');
const bcrypt = require('bcrypt');

module.exports= {

    getUsers(req, res) {
        return knex('users').then(users => res.send(users));
    },

    getWagers() {
        return knex('wagers');
    },
    
    getUserById(id) {
        return knex('users').where('id', id).first();
    },

    updateEmail(id,email) {
        return knex('users').where('id', id).update({ email: email}, ['id', 'email']);
    },

    updatePassword(id,password) {
        return knex('users').where('id', id).update({ password: password}, ['id', 'password']);
    },

    getUserWager(id) {
        return knex('wagers').where('user_id', id);
    },

    placeWager(wager) {
        return knex('wagers').insert(wager);
    },

    async registerUser(name, email, password) {
        // Hash Passowrd
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return knex('users').insert({
            name: name,
            email: email,
            password: hashedPassword
        });
    },

    findUser(email) {
        return knex('users').where({ email: email}).first();
    },

    completedBet(id) {
        return knex('wagers').where('user_id', id).update({ completed: true}, ['user_id', 'completed'])
    }
}