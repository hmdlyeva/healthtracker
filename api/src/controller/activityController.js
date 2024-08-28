const Activities = require('../models/activityModel')

const getProds = async (req,res) =>{
    let AllProds = await Activities.find({})
    res.send(AllProds)
}

const getProdsByid = async (req,res) => {
    let id = req.params.id
    let findProdById = await Activities.findOne({_id: id})
    res.send(findProdById)
}

const deleteProd = async (req,res) => {
    let id = req.params.id
    let deleteProd = await Activities.findByIdAndDelete({_id:id})
}

const updateProd = async (req,res)=> {
    let id = req.params.id
    let updateProd = await Activities.findOneAndUpdate({_id:id},req.body)
}

const updateAll = async (req,res) => {
    let id = req.params.id
    let updatedAllProd = await Activities.replaceOne({_id:id}, req.body)
}

const postProd = async (req,res)=> {
    let newProd = new Activities(req.body)
    newProd.save()
}

module.exports = {getProds, getProdsByid, deleteProd, updateProd, updateAll, postProd}