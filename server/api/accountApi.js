const models = require('../db');
const express = require('express');

const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sqlMap/accountSqlMap');

// 连接数据库
const conn = mysql.createConnection(models.mysql);

conn.connect();
const jsonWrite = (res, ret) => {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败',
    });
  } else {
    res.json(ret);
  }
};

// 增加用户接口
router.post('/login', (req, res) => {
  const sql = $sql.account.login;
  const params = req.body;
  console.log(params);
  conn.query(sql, [params.account, params.password], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
module.exports = router;
