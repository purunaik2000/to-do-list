const workModel = require('../models/workModel');
const ObjectId = require('mongoose').Types.ObjectId;
const validateWorkData = require('../validations/workValidation');

async function addWork(req, res) {
    try {
        const data = req.body;
        if(!data) return res.status(400).send({
            status: false,
            message: 'Please provide all the details'
        })

        const isValid = validateWorkData(data);
        if(isValid != true) return res.status(400).send(isValid);

        const newWork = await workModel.create({
            ...data,
            userId: req.userData._id
        })

        return res.status(201).send({
            status: true,
            message: 'Work added successfully'
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

async function getAllWorks(req, res) {
    try {
        const userId = req.userData._id;
        const page = req.params.page;
        const works = await workModel.find({userId}).select({
            title: 1,
            date: 1,
            time: 1,
            createdAt: 1,
            description: 1,
            status: 1
        }).sort( {createdAt : -1} ).skip((page-1)*10).limit(10);

        return res.status(200).send({
            status: true,
            data: works
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

async function getPendingWorks(req, res) {
    try {
        const userId = req.userData._id;
        const page = req.params.page;
        const works = await workModel.find({
            userId: userId,
            status: 'pending'
        }).select({
            title: 1,
            date: 1,
            time: 1,
            createdAt: 1,
            description: 1,
            status: 1
        }).sort( {createdAt : -1} ).skip((page-1)*10).limit(10);

        return res.status(200).send({
            status: true,
            data: works
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

async function removeWork(req, res) {
    try {
        const workId = req.params.workId;
        if(!ObjectId.isValid(workId)) return res.status(400).send({
            status: false,
            message: 'Invalid workId'
        })

        const deletedWork = await workModel.findOneAndDelete({
            _id: workId,
            userId: req.userData._id
        });

        return res.status(204);
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

module.exports = {
    addWork,
    getAllWorks,
    getPendingWorks,
    removeWork
}