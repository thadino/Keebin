/**
 * Created by dino on 29-09-2016.
 */

var userClass = require('./User.js');
var Sequelize = require('sequelize');

//
//
//
//
// console.log(User.Email);

//Setting up the config
var sequelize = new Sequelize('keebin', 'keebin', '1234', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql'
});

sequelize.authenticate().then(function (err) {
    if (err) {
        console.log('There is connection in ERROR');
    } else {
        console.log('Connection has been established successfully');
    }
});




var Role = sequelize.define('Roles', {
    Rolename: {
        type: Sequelize.STRING,
        Validate : {notNull : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

});


var User = sequelize.define('user', {

    FirstName: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        field: 'first_name', // Will result in an attribute that is firstName when user facing but first_name in the database
        Validate : {max : 40}
    },
    lastName: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        Validate : {max : 40}
    },
    Email: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        Validate : {notNull : true, isEmail: true, unique : true}
    },
    Date: {
        type: Sequelize.DATE, // here we decide parameters for this field in the table
        Validate : {isDate : true, notNull : false}
    },
    Birthday: {
        type: Sequelize.DATE, // here we decide parameters for this field in the table
        Validate : {isDate : true, notNull : false}
    },
    Sex: {
        type: Sequelize.STRING // here we decide parameters for this field in the table
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true // fjerner timestamps med false denne option skal stå på tabellen

});



var Passwords = sequelize.define('Passwords', {
    Password: {
        type: Sequelize.STRING,
        Validate : {notNull : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

});



Role.hasMany(User);
User.belongsTo(Role);




Role.sync();

User.sync(); // executes the command from above and inserts a new table into the database

User.hasOne(Passwords);
Passwords.belongsTo(User);

Passwords.sync();
function newRole(RoleN)
{
    return sequelize.transaction(function (t) {

        // chain all your queries here. make sure you return them.
        return Role.create({
            Rolename : RoleN


        },    {transaction: t}) // kom her til

    }).then(function (result) {
        console.log("Transaction has been committed");

        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        console.log(err);
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
}

// 1= admin, 2 = User
function newUser(newUser)
{
    return sequelize.transaction(function (t) {

        // chain all your queries here. make sure you return them.
        return User.create({
            FirstName: newUser.FirstName,
            lastName: newUser.LastName,
            Email : newUser.Email,
            Date : newUser.Date,
            Birthday : newUser.Birthday,
            Sex : newUser.Sex,
            RoleId : newUser.Role


        },    {transaction: t}) // kom her til

    }).then(function (result) {
        console.log("Transaction has been committed");



        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        console.log(err);
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
}


function newPass(newUser)
{
    var finduserid = "";
    // finds a row in the user table with the email of newuser.email and then sets the finduserid to the user's id.
    User.find({where:{Email: newUser.Email}}).then(function (data, err) {
        if (data) {
            finduserid = data.id;
        }
    })




    return sequelize.transaction(function (t) {

        // chain all your queries here. make sure you return them.
        return Passwords.create({
            Password: newUser.password,
            userId: finduserid


        },    {transaction: t}) // kom her til

    }).then(function (result) {
        console.log("Transaction has been committed");



        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        console.log(err);
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
}

var lars = new userClass.newUser("Lars", "Johnson", "john@gmaile.com", "10/09/2016", 1, "09/09/2010", "male", 12345);
var larse = new userClass.newUser("Larse", "Johnsona", "johna@gmailr.com", "10/09/1016", 2, "09/01/2010", "female", 2341);

// newRole("Admin");
// newRole("User");
//
// newUser(lars);
// newUser(larse);

newPass(lars);
newPass(larse);

// User.find({where:{Email: larse.Email}}).then(function (data, err) {
//
//         console.log(data.id);
//
// })

