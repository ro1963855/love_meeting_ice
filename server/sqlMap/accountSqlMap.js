// sql query
const sqlMap = {
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
