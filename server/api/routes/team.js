const TeamMember = require('../../models/teamMember');
module.exports = function (router) {
  // GET
  router.get('/team', function (req, res) {
    TeamMember.find()
      .sort({ name: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res
          .status(500)
          .json({ message: 'Error finding Team members', error: err })
      );
  });

  // POST
  router.post('/team', function (req, res) {
    let note = new TeamMember(req.body);
    note.save(function (err, member) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(member);
    });
  });
};
