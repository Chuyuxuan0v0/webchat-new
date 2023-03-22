const mysql = require('mysql2');
const { promisify } = require('util'); // Node.js 内置模块，无需安装
require('dotenv').config(); // 加载 .env 文件 这里你替换成项目里的.env copy即可

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connection = mysql.createConnection(config);

// 它使用 Node.js 内置模块 util 中的 promisify() 方法将 connection.query 转换为返回 Promise 的函数。
// 然后使用 .bind() 方法将 connection 绑定到新的函数上下文中，
// 这是因为 connection.query 函数需要在 connection 对象的上下文中调用，以便它可以正确地访问 MySQL 数据库。
const query = promisify(connection.query).bind(connection);

module.exports = { connection, query };