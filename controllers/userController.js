const { ObjectId} = require('mongoose').Types;
const { Thought, User} = require('../models');


module.exports = {
    // Get all users
    getUser(req, res) {
        User.find()
        .populate('thoughts')
        .populate('friends')
        .then(async (users) =>{
            const userObj = {
                users,
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // Get User by ID
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .populate('thoughts')
        .populate('friends')
        .then(async (user) =>
            !user
                ? res.status(404).json({message: 'No user with that ID'})
                : res.json({
                    user,
                    // Does anything need to be associated with it
                })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Post user)
        createUser(req, res) {
            User.create(req.body)
            .then((user) => res.json(user))
            .catch ((err) => {
                    console.error(err);
                    return res.status(500).json(err)
                  });
        },
    // Update a user
        updateUser(req, res){
            User.findOneAndUpdate(
                {_id: req.params.userId},
                { $set: req.body},
                {runValidators: true, new: true}
            )
            .then((user) =>
            !user
                ? res.status(404).json({message: "No user with that ID found"})
                : res.json(user)
                )
                .catch((err) => res.status(500).json(err));
        },
    // Delete a user
        deleteUser(req, res) {
            User.findOneAndRemove({_id: req.params.userId})
            .then((user) =>
            !user
            ? res.status(404).json({message: "No user with that ID found"})
            : Thought.findOneAndUpdate(
                { thought: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
          )
          .then((user) =>
          !user
            ? res.status(404).json({
                message: 'User deleted, but no thoughts found',
            })
            : res.json({message: 'User successfully deleted'})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        },
    // Add a friend
        addFriend(req, res){
            console.log("Adding friend");
            User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendId }},
                { runValidators: true, new: true}
            )
            .then((user) =>
            !user
            ? res.status(404).json({message: 'No user with that Id found'})
            :res.json(user)
            )
            .catch((err) => res.status(500).json(err));
        },
    // Delete a friend from a user
        removeFriend(req, res) {
            console.log("Removing friend")
            User.findOneAndUpdate(
                {_id: req.params.userId},
                { $pull: { friends:  req.params.friendId} },
                {runValidators: true, new: true}
            )
            .then((user) =>
            !user
            ? res.status(404).json({message: 'No user found with that Id'})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
        },
};