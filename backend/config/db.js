import Sequelize from "sequelize";

const sequelize = new Sequelize("testSequelize", "root", "password", {
  host: "localhost",
  dialect: "mariadb",
  define: { timestamps: false },
  //   pool: config.database.pool,
  //   operatorsAliases: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();

    console.log(`MariaDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

export { connectDB, sequelize };
