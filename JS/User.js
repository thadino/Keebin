/**
 * Created by dino on 29-09-2016.
 */

var Sequelize = require('sequelize');






var FirstName = "";
var LastName = "";
var Email = "";
var Role = "";
var Date = "";
var Birthday = "";
var Sex = "";
var password = "";

function _newUser(FirstName, LastName, Email, Date, Role, Birthday, Sex, password)
{
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Email = Email;
    this.Date = Date;
    this.Role = Role;
    this.Birthday = Birthday;
    this.Sex = Sex;
    this.password = password;

}
// var john = new User("john", "Lars", "Johnson", "john@gmail.com", "10/09/2016", "Admin", "09/09/2010", "male");
// console.log(john.Birthday);

module.exports = {newUser : _newUser};




