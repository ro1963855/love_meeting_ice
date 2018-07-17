// sql语句
const sqlMap = {
  // 用户
  account: {
    login: `
      SELECT u.id
      FROM user AS u
      WHERE
        u.name = ? AND
        u.password = ?
    `,
  },
};

module.exports = sqlMap;
