const { Sequelize } = require("sequelize");

const sequelizePostgres = new Sequelize({
  database: "postgres", // Tên cơ sở dữ liệu
  username: "postgres.jupmzcdeyunbkynjavff", // Tên người dùng
  password: "07085082160@Sy.", // Mật khẩu
  host: "aws-0-ap-southeast-1.pooler.supabase.com", // Địa chỉ host của Supabase
  dialect: "postgres", // Loại cơ sở dữ liệu
  logging: false, // Tắt logging nếu không cần thiết
});

let connectDB = async () => {
  try {
    await sequelizePostgres.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database .:", error);
  }
};

module.exports = connectDB;
