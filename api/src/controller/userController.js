const Users = require("../models/userModel")

const getUsers = async (req,res) => {
    let AllUsers = await Users.find({})
    res.send(AllUsers)
}

const getUserById = async (req,res) => {
    let id = req.params.id
    let findUser = await Users.findOne({_id:id})
    res.send(findUser)
}

const deleteUser = async (req,res) => {
    let id = req.params.id
    let deletedUser = await Users.findByIdAndDelete({_id:id})
}

const updateUser = async (req,res) => {
    let id = req.params.id
    let findUserAndUpdate = await Users.findOneAndUpdate({_id:id},req.body)
}

const putUser = async (req,res) => {
    let id = req.params.id
    let findUser = await Users.replaceOne({_id:id}, req.body)
}

const postUser = async (req,res)=> {
    let newUser = new Users(req.body)
    newUser.save()
}

module.exports = {
    getUsers, 
    getUserById, 
    deleteUser,
    updateUser,
    putUser,
    postUser
}