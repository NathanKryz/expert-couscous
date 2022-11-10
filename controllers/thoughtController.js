const { ObjectId} = require('mongoose').Types;
const { Thought, User} = require('../models');

const thoughtCount = async () =>
    Thought.aggregate()
    .count('thoughtsCount')
    .then((numberOfThoughts) => numberOfThoughts);

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then(async (thoughts) =>{
            const thoughtObj = {
                thoughts,
                thoughtCount: await thoughtCount(),
            };
            return res.json(thoughtObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // Get thought by ID
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then(async (thought) =>
            !thought
                ? res.status(404).json({message: 'No thought with that ID'})
                : res.json({
                    thought,
                    // Does anything need to be associated with it
                })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Post thought (push to created user ID)
        createThought(req, res) {
            Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    {username: req.body.userName},
                    {$push: { thoughts: req.body}},
                    {new: true}
                );
            })
            .then((user) =>
            !user
            ? res
                  .status(404)
                  .json({message: 'thought created, but no user was found'})
                  : res.json({ message: 'Thought created'})
                  )
                  .catch ((err) => {
                    console.error(err);
                  });
        },
    // Update a thought
        updateThought(req, res){
            Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $set: req.body},
                {runValidators: true, new: true}
            )
            .then((thought) =>
            !thought
                ? res.status(404).json({message: "No thought with that ID found"})
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
        },
    // Delete a thought
        deleteThought(req, res) {
            Thought.findOneAndRemove({_id: req.params.thoughtId})
            .then((thought) =>
            !thought
            ? res.status(404).json({message: "No thought with that ID found"})
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
          )
          .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Thought deleted, but no users found',
            })
            : res.json({message: 'Thought successfully deleted'})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        },
    // Post a reaction to a thought
        addReaction(req, res){
            console.log("Adding reaction");
            Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                { runValidators: true, new: true}
            )
            .then((thought) =>
            !thought
            ? res.status(404).json({message: 'No thought with that Id found'})
            :res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
        },
    // Delete a reaction to a thought
        removeReaction(req, res) {
            console.log("Removing reaction")
            Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $pull: { reactions: {reactionId: req.params.reactionId} } },
                {runValidators: true, new: true}
            )
            .then((thought) =>
            !thought
            ? res.status(404).json({message: 'No thought found with that Id'})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
        },
};