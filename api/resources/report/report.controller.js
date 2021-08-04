const ReportModel = require("./report.model");

module.exports =  {
    async createReport(req,res){
        try {
            let report = new ReportModel();

            let data = req.body;

            if (!data.title) return res.status(400).send({"error":"Report title is required"});
            if (!data.message) return res.status(400).send({"error":"Report message is required"});
            if (!data.user) return res.status(400).send({"error":"User is required"});

            report.title = data.title;
            report.message = data.message;
            report.user = data.user;

            await report.save((err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"Report created"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateReport(req,res){
        try {

            let data = req.body;

            const report = await ReportModel.findOne({_id : req.params.id});

            if (!report) return res.status(404).send({"error":'Report not found'});

            if (data.title) report.title = data.title;
            if (data.message) report.message = data.message;
            if (data.user) report.user = data.user;

            await report.save((err, doc)=>{
                if (!err){
                    return res.status(200).send({"success":`updated`});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });

        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getOneReport(req,res){
        try {
            ReportModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Report not found"});
                    return res.status(200).send(doc);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            }).populate('user', '_id name image phonenumber email');
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getAllReports(req,res){
        try {
            ReportModel.find((err, docs)=>{
                if(!err){
                    return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async findAllPaginate(req,res){
        try {
            const {page,perPage} = req.query;
            const options = {
                page: parseInt(page,10) || 1,
                limit: parseInt(perPage,10) || 10,
                sort: {date: -1}
            }
            await ReportModel.paginate({},options,(err, docs)=>{
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

    async deleteReport(req,res){
        try {
            ReportModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc) return res.status(404).send({"error":"report not found"});
                    doc.remove((err, docs)=>{
                        if (!err){
                            return res.status(200).send({"success":"Item deleted"});
                        }
                        else{
                            return res.status(400).send({"error":err});
                        }
                    });
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    }
}