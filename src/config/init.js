const sequelize = require('./database');

const initDatabase = async () => {
  try {
    // Sync database
    if (process.env.NODE_ENV) {
      console.log('Syncing database...');
      await sequelize.sync({ alter: true });
      console.log('Database synchronized successfully');
    } else {
      // In production, just verify the connection
      await sequelize.authenticate();
      console.log('Production database connected successfully');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

module.exports = initDatabase;
