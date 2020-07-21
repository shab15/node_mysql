var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('nodejs', 'root', 'password', {

    host: 'localhost',
    dialect: 'mysql',
    directory: 'models', // prevents the program from writing to disk
    port: '3306',
    additional: {
        timestamps: false
        //...
    }
});

//Run this file to auto generate Db Models
//Run this using "node .\autoModelsGenerator.js"
auto.run(function (err) {
    if (err) throw err;

    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});