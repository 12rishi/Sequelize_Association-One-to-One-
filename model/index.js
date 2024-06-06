const { FOREIGNKEYS } = require("sequelize/lib/query-types");
const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
const { name } = require("ejs");

// la sequelize yo config haru lag ani database connect gardey vaneko hae
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.users = require("./userModel")(sequelize, DataTypes);
db.contacts = require("./contactModel")(sequelize, DataTypes);
db.users.hasOne(db.contacts, {
  foreignKey: { allowNull: false },
});
db.contacts.belongsTo(db.users);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;
