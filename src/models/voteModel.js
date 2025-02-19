const db = require('../db');

const createVote = (option, callback) => {
  const sql = `INSERT INTO votes (option, votes) VALUES (?, ?)`;
  db.run(sql, [option, 0], function (err) {
    callback(err, this.lastID);
  });
};

const getVotes = (callback) => {
  db.all("SELECT * FROM votes", [], (err, rows) => {
    callback(err, rows);
  });
};

const voteForOption = (id, callback) => {
  const sql = `UPDATE votes SET votes = votes + 1 WHERE id = ?`;
  db.run(sql, [id], function (err) {
    callback(err);
  });
};

module.exports = { createVote, getVotes, voteForOption };
