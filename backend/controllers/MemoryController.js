const Memory = require("../models/Memory");

const fs = require("fs");

const excludeDeletedImageOnServer = (memory) => {
    fs.unlink(`public/${memory.src}`, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Image deleted from Server");
        }
    });
};

const createMemory = async (req, res) => {
    try {
        const { title, description } = req.body;
        const src = `images/${req.file.filename}`;
        if (!title || !description) return res.status(400).json({ msg: "Please fill all required fields." })

        const newMemory = new Memory({
            title, src, description
        });

        await newMemory.save();
        res.json({ msg: "Memory created successfully", newMemory });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(`An error occur. Error message: ${error.message}`);
    }
};

const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find();
        res.json(memories);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(`An error occur. Error message: ${error.message}`);
    }
}

const getMemory = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        if (!memory) return res.status(404).json({ msg: "Memory not found" });
        res.json(memory);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(`An error occur. Error message: ${error.message}`);
    }
}

const deleteMemory = async (req, res) => {
    try {
        const memory = await Memory.findByIdAndDelete(req.params.id);
        if (!memory) return res.status(404).json({ msg: "Memory not found" });

        excludeDeletedImageOnServer(memory);
        res.json({ msg: "Memory deleted successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send(`An error occur. Error message: ${error.message}`);
    }
}

const updateMemory = async (req, res) => {
    try {
        const { title, description } = req.body;
        let src = null;
        if (req.file) src = `images/${req.file.filename}`

        const memory = await Memory.findById(req.params.id);
        if (!memory) return res.status(404).json({ msg: "Memory not found" });

        if (src) excludeDeletedImageOnServer(memory);

        const newData = {}

        if (title) newData.title = title;
        if (description) newData.description = description;
        if (src) newData.src = src;

        const updateMemory = await Memory.findByIdAndUpdate(req.params.id, newData, { new: true });

        res.json({ updateMemory, msg: "Memory updated successfully." });

    } catch (error) {
        console.log(error.message);
        res.status(500).send(`An error occur. Error message: ${error.message}`);
    }
}

module.exports = {
    createMemory,
    getMemories,
    getMemory,
    deleteMemory,
    updateMemory,
};
