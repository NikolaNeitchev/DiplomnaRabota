const sequelize = require("./config/database");
const User = require("./models/User");
const Service = require("./models/Service");

const syncDatabase = async () => {
  try {
    // Define relationships (optional)
    Service.belongsTo(User, { foreignKey: "userId" });
    User.hasMany(Service, { foreignKey: "userId" });

    // Sync models with the database
    await sequelize.sync({ force: true }); // Use `force: true` only in development
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  } finally {
    sequelize.close();
  }
};

syncDatabase();
