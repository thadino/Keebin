/**
 * Created by dino on 29-09-2016.
 */



var Sequelize = require('sequelize'); // Requires
var FirstName = "";
var LastName = "";
var Email = "";
var Role = "";
var Date = "";
var Birthday = "";
var Sex = "";
var password = ""; // Variable Creation

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

} // Export Functions

module.exports = {newUser : _newUser}; // Export Module




