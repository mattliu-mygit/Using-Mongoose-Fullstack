const Standup = require('../../models/standup');
const mongoose = require('mongoose');
const standup = require('../../models/standup');

module.exports = function (router) {
  // GET the 12 newest standup meeting notes.
  router.get('/standup', function (req, res) {
    Standup.find()
      .sort({ createdOn: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res
          .status(500)
          .json({ message: 'Error finding standup meeting notes', error: err })
      );
  });

  // GET: by team member Id
  router.get('/standup/:teamMemberId', function (req, res) {
    const qry = {
      _teamMemberId: mongoose.Types.ObjectId(req.params.teamMemberId),
    };
    standup
      .find(qry)
      .sort({ createdOn: 1 })
      .sort({})
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: 'Error finding standup notes on finding by Id',
          error: err,
        })
      );
  });

  router.post('/standup', function (req, res) {
    let note = new Standup(req.body);
    note.save(function (err, member) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(member);
    });
  });
};
