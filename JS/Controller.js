/**
 * Created by dino on 29-09-2016.
 */

var userClass = require('./User.js');
var Sequelize = require('sequelize');

//
var newUser = new userClass.newUser("john", "Lars", "Johnson", "john@gmail.com", "10/09/2016", "Admin", "09/09/2010", "male");
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
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

});

Role.sync();

// start opret ny tabel
var User = sequelize.define('user', {
    UserName: {
        type: Sequelize.STRING,

    },
    FirstName: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING // here we decide parameters for this field in the table
    },
Email: {
        type: Sequelize.STRING // here we decide parameters for this field in the table
    },
Date: {
        type: Sequelize.DATE // here we decide parameters for this field in the table
    },
Role: {
        type: Sequelize.STRING // here we decide parameters for this field in the table
    },
Birthday: {
        type: Sequelize.DATE // here we decide parameters for this field in the table
    },
Sex: {
    type: Sequelize.STRING // here we decide parameters for this field in the table
}
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true // fjerner timestamps med false denne option skal stå på tabellen

});

User.belongsTo(Role, {as: 'role'});

User.sync(); // executes the command from above and inserts a new table into the database
// afslut oprettelse af en ny tabel


// done with insert


foo(newUser);

function foo(newUser)
{
return sequelize.transaction(function (t) {

    // chain all your queries here. make sure you return them.
    return User.create({
        UserName : newUser.UserName,
        FirstName: newUser.FirstName,
        lastName: newUser.LastName,
        Email : newUser.Email,
        Date : newUser.Date,
        Birthday : newUser.Birthday,
        Sex : newUser.Sex


    }, return Role.create({Role: newUser.Role}),   {transaction: t}) // kom her til

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

