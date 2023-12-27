const { Sequelize } = require('sequelize');

// Your development configuration
const developmentConfig = {
  username: "e_commerce_2owf_user",
  password: "5ekgZ1uPVnneoZKeZy1HjzW9I8qLzL1x",
  database: "e_commerce_2owf",
  host: "dpg-clu3atla73kc73991f10-a.oregon-postgres.render.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5, // Maximum number of connections in pool
    min: 0, // Minimum number of connections in pool
    acquire: 30000, // Maximum time in milliseconds to try getting a connection
    idle: 10000 // Maximum time in milliseconds that a connection can be idle
  }
};

// Creating a new Sequelize instance with your development configuration
const sequelize = new Sequelize(developmentConfig);

// Testing the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
