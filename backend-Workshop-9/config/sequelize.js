const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(
 process.env.MYSQL_DB,
 process.env.MYSQL_USER,
 process.env.MYSQL_PASS,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    define:{underscored:true}
  }
);

sequelize.authenticate().then(()=> {
    console.log('Connection to MySQL has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;