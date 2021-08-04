const url = require("url");
const path = require("path");
const cloudinary = require('../../../config/cloudinary');
const fs = require('fs');

const ImageModel = require("./image.model");

module.exports =  {
    async createImage(req,res){
        try {
            let model = new ImageModel();

            if (!req.file)
                return res.status(400).send({"error":"Image file is required"});

            model.image = await uploadImage(req.file);

            console.log(model.image);

            await model.save((err, doc)=>{
                if (!err){
                    res.status(200).send(doc);
                }
                else{
                    res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            res.status(400).send({"error":err});
        }
    },

    async updateImage(req,res){
        try {

            let data = req.body;

            const image = await ImageModel.findOne(({_id:req.params.id}));

            if (!image) return res.status(404).send({"error":"Image not found"});

            if (!req.file) return res.status(404).send({"error":"Image file is required"});

            if (image.image){
                destroy(nameFromUri(image.image)).catch((result)=>{
                    console.log(result);
                });
            }

            image.image = await uploadImage(req.file);

            await image.save((err, doc)=>{
                if (!err){
                    res.status(200).send(doc);
                }
                else{
                    res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            res.status(400).send({"error":err});
        }
    },

    async getOneImage(req,res){
        try {
            ImageModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Image not found"});
                    res.status(200).send(doc);
                }
                else{
                    res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            res.status(400).send({"error":err});
        }
    },

    async getAllImages(req,res){
        try {
            ImageModel.find((err, docs)=>{
                if(!err){
                    res.status(200).send(docs);
                }
                else{
                    res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            res.status(400).send({"error":err});
        }
    },

    async findAllPaginate(req,res){
        try {
            const {page,perPage} = req.query;
            const options = {
                page: parseInt(page,10) || 1,
                limit: parseInt(perPage,10) || 10,
                sort: {_id: -1}
            }
            await ImageModel.paginate({},options,(err, docs)=>{
                if(!err){
                    if (docs) return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async deleteImage(req,res){
        try {
            ImageModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Image not found"});

                    doc.remove((err, docs)=>{
                        if (!err){
                            if (doc.image) destroy(nameFromUri(doc.image)).catch((result)=>{
                                console.log(result);
                            });
                            res.status(200).send({"success":"Image deleted"});
                        }
                        else{
                            res.status(400).send({"error":err});
                        }
                    });
                }
                else{
                    res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            res.status(400).send({"error":err});
        }
    }
}

function nameFromUri(myurl){
    var parsed = url.parse(myurl);
    var image = path.basename(parsed.pathname);
    return "images/"+path.parse(image).name
}

async function destroy(file) {
    await cloudinary.delete(file);
}

async function uploadImage(file){
    const uploader = async (path) => await cloudinary.uploads(path, 'images');

    const { path } = file;
    const newPath = await uploader(path);
    //console.log(newPath);
    const imageUrl = await newPath.url;
    //url.push(newPath);
    fs.unlinkSync(path);

    return imageUrl;
}