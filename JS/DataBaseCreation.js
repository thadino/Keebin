/**
 * Created by dino on 03-02-2013.
 */



var Sequelize = require('sequelize'); // Requires

var sequelize = new Sequelize('keebin', 'keebin', '1234', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql'
}); // Establishing connection to the MySQL database schema called keebin

sequelize.authenticate().then(function (err) {
    if (err) {
        console.log('There is connection in ERROR');
    } else {
        console.log('Connection has been established successfully');
    }
});  // Authenticate Database connection

var Role = sequelize.define('Roles', {
    RoleName: {
        type: Sequelize.STRING,
        Validate : {notNull : true, unique : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

});   // Role table setup

var User = sequelize.define('User', {

    FirstName: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        field: 'first_name', // Will result in an attribute that is firstName when user facing but first_name in the database
        Validate : {max : 40}
    },
    LastName: {
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

});  // User table setup

var Logins = sequelize.define('Logins', {
    Password: {
        type: Sequelize.STRING,
        Validate : {notNull : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

});  // passwords table setup

var CoffeeBrand = sequelize.define('CoffeeBrand', {
    BrandName: {
        type: Sequelize.STRING,
        Validate : {notNull : true}
    },
    NumberOfCoffeeNeeded: {
        type: Sequelize.INTEGER,
        Validate : {notNull : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

}); // CoffeeBrand table setup

var LoyaltyCards = sequelize.define('LoyaltyCards', {
    NumberOfCoffeesBought: {
        type: Sequelize.INTEGER,
        Validate : {notNull : true},
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true // fjerner timestamps med false denne option skal stå på tabellen

}); // LoyaltyCards table setup

var CoffeeKind = sequelize.define('CoffeeKind', {
    Price: {
        type: Sequelize.DOUBLE,
        Validate : {notNull : true},
    },
    CoffeeKindName: {
        type: Sequelize.STRING,
        Validate : {notNull : true},
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

}); // CoffeeKind table setup

var Order = sequelize.define('Order', {
    Platform: {
        type: Sequelize.STRING,
        Validate : {notNull : true},
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true // fjerner timestamps med false denne option skal stå på tabellen

}); // Order table setup

var CoffeeShop = sequelize.define('CoffeeShop', {
    Email: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        Validate : {notNull : true, isEmail: true, unique : true}
    },
    Address: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        Validate : {notNull : true}
    },
    Phone: {
        type: Sequelize.STRING, // here we decide parameters for this field in the table
        Validate : {notNull : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

}); // CoffeeShop table setup

var CoffeeShopUsers = sequelize.define('CoffeeShopUsers', {

}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

}); // CoffeeShopUsers table setup

var OrderItem = sequelize.define('OrderItem', {
    Quantity: {
        type: Sequelize.INTEGER, // here we decide parameters for this field in the table
        Validate : {notNull : true}
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false // fjerner timestamps med false denne option skal stå på tabellen

}); // OrderItem table setup

Role.hasMany(User);
User.belongsTo(Role);
User.hasOne(Logins, {foreignKey: 'Email'});
Logins.belongsTo(User, {foreignKey: 'Email'});
User.hasMany(LoyaltyCards);
LoyaltyCards.belongsTo(User);
CoffeeBrand.hasMany(LoyaltyCards, {foreignKey: 'BrandName'});
LoyaltyCards.belongsTo(CoffeeBrand, {foreignKey: 'BrandName'});



CoffeeShop.hasMany(CoffeeKind);
CoffeeKind.belongsTo(CoffeeShop);

User.hasMany(Order);
Order.belongsTo(User);
CoffeeShop.hasMany(Order);
Order.belongsTo(CoffeeShop);
User.hasMany(Order);
Order.belongsTo(CoffeeKind);

CoffeeShop.belongsTo(CoffeeBrand, {foreignKey: 'BrandName'})



Order.belongsToMany(CoffeeKind, {through: 'OrderItem', foreignKey: 'Order_ID'});
CoffeeKind.belongsToMany(Order, {through: 'OrderItem', foreignKey: 'CoffeeKind_ID'}); // Working with  // associations
CoffeeBrand.sync();


Role.sync();

User.sync(); // executes the command from above and inserts a new table into the database
Logins.sync();
LoyaltyCards.sync();

CoffeeKind.sync();
Order.sync();
CoffeeShop.sync();
CoffeeShopUsers.sync();
OrderItem.sync(); // Creating Tables
function _Role()
{
 return Role;
}

function _User()
{
return User;
}

function _Logins()
{
return Logins;
}

function _CoffeeBrand()
{
    return CoffeeBrand;
}

function _LoyaltyCards()
{
    return LoyaltyCards;
}

function _CoffeeKind()
{
    return CoffeeKind;
}

function _Order()
{
    return Order;
}

function _CoffeeShop()
{
    return CoffeeShop;
}

function _CoffeeShopUsers()
{
    return CoffeeShopUsers;
}

function _OrderItem()
{
    return OrderItem;
}

function _connect()
{
    return sequelize;
}
// Export Functions // Export Functions

module.exports = {Role : _Role, User : _User, Logins : _Logins, CoffeeBrand : _CoffeeBrand,
LoyaltyCards : _LoyaltyCards, CoffeeKind : _CoffeeKind, Order : _Order, CoffeeShop : _CoffeeShop,
CoffeeShopUsers : _CoffeeShopUsers, OrderItem : _OrderItem, connect : _connect}; // Export Module