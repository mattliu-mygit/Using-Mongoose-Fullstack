const Project = require('../../models/project');

module.exports = function (router) {
  // GET
  const qry = {
    isActive: { $eq: true },
  };

  router.get('/project', function (req, res) {
    Project.find(qry)
      .sort({ name: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res
          .status(500)
          .json({ message: 'Error finding active rojects', error: err })
      );
  });

  // POST
  router.post('/project', function (req, res) {
    let note = new Project(req.body);
    note.save(function (err, member) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(member);
    });
  });
};
