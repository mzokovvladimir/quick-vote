const voteModel = require('../models/voteModel');

const createVote = (req, res) => {
  const { option } = req.body;
  voteModel.createVote(option, (err, id) => {
    if (err) return res.status(500).send('Error creating vote');
    res.status(201).send({ id, option });
  });
};

const getVotes = (req, res) => {
  voteModel.getVotes((err, rows) => {
    if (err) return res.status(500).send('Error fetching votes');
    res.json(rows);
  });
};

const voteForOption = (req, res) => {
  const { voteId } = req.body;
  voteModel.voteForOption(voteId, (err) => {
    if (err) return res.status(500).send('Error voting');
    res.send('Vote counted!');
  });
};

module.exports = { createVote, getVotes, voteForOption };
