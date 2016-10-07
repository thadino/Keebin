/**
 * Created by dino on 07-10-2016.
 */


var userClass = require('./User.js');
var db = require('./DataBaseCreation.js');
var Sequelize = require('sequelize'); // Requires
var Role = db.Role();
var User = db.User();
var Logins = db.Logins();
var CoffeeBrand = db.CoffeeBrand();
var LoyaltyCards = db.LoyaltyCards();
var CoffeeKind = db.CoffeeKind();
var Order = db.Order();
var CoffeeShop = db.CoffeeShop();
var CoffeeShopUsers = db.CoffeeShopUsers();
var OrderItem = db.OrderItem(); //Setting up the requires

 var sequelize = db.connect(); // Establishing connection to the MySQL database schema called keebin

sequelize.authenticate().then(function (err) {
    if (err) {
        console.log('There is connection in ERROR');
    } else {
        console.log('Connection has been established successfully');
    }
}); // Authenticating connection to the MySQL database connection above

function _newRole(RoleN)
{
    console.log("yolo");
    var Rolefound = false;
    var myrole = Role.find({where:{RoleName: RoleN}}).then(function (data, err) {

        console.log("role here!" + data.RoleName)
        Rolefound = true;

    })

   if(!Rolefound) {
       return sequelize.transaction(function (t) {

           // chain all your queries here. make sure you return them.
           return Role.create({
               RoleName: RoleN


           }, {transaction: t}) // kom her til

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
    ;
}

function _newUser(newUser)
{



    return sequelize.transaction(function (t) {

        // chain all your queries here. make sure you return them.

        return User.create({
            FirstName: newUser.FirstName,
            LastName: newUser.LastName,
            Email : newUser.Email,
            Date : newUser.Date,
            Birthday : newUser.Birthday,
            Sex : newUser.Sex,
            RoleId : newUser.Role


        },    {transaction: t}) // kom her til

    }).then(function (result) {
        console.log("Transaction has been committed");

        _newPass(newUser);


        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        console.log(err);
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
}

function _newPass(newUser)
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
        return Logins.create({
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
} // Export Functions

// User.find({where:{Email: larse.Email}}).then(function (data, err) {
//
//         console.log(data.id);
//
// })  // // Search Example

module.exports = {newPass : _newPass, newUser : _newUser, newRole : _newRole}; // Export Module

// Spørg om rækkefølgen til define asociatoner
// callbacks / hvordan vi laver et check på et felt i databasen