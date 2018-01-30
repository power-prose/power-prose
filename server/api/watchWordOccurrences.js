const router = require('express').Router();
const { WatchWordOccurrence, Snippet } = require('../db/models');

module.exports = router;

// get a single watchWordOccurence with all associated snippets
router.get('/:watchWordOccurrenceId', (req, res, next) => {
  WatchWordOccurrence.findById(req.params.watchWordOccurrenceId, { include: [Snippet] })
    .then(watchWordOccurrences => res.json(watchWordOccurrences))
    .catch(next)
})
