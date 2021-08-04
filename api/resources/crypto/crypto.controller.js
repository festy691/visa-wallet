const CryptoModel = require("./crypto.model");

module.exports =  {
    async addCrypto(req,res){
        try {
            let model = new CryptoModel();
            let data = req.body;

            if (!data.name)
                return res.status(400).send({"error":"name is required"});
            if (!data.icon)
                return res.status(400).send({"error":"icon is required"});
            if (!data.abbr)
                return res.status(400).send({"error":"abbr is required"});
            if (!data.walletAddress)
                return res.status(400).send({"error":"walletAddress is required"});
            if (!data.priceNaira)
                return res.status(400).send({"error":"priceNaira is required"});
            if (!data.priceDollar)
                return res.status(400).send({"error":"priceDollar is required"});

            model.name = data.name;
            model.icon = data.icon;
            model.abbr = data.abbr;
            model.walletAddress = data.walletAddress;
            model.priceNaira = data.priceNaira;
            model.priceDollar = data.priceDollar;

            await model.save((err, doc)=>{
                if (!err){
                    return res.status(200).send({"success":"Crpto Added"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateCrypto(req,res){
        try {

            let data = req.body;

            const model = await CryptoModel.findOne(({_id:req.params.id}));

            if (!model) return res.status(404).send({"error":"crypto not found"});

            if (!data.name && !data.icon && !data.abbr && !data.walletAddress && !data.priceNaira && !data.priceDollar) return res.status(404).send({"error":"Nothing to update"});

            if(data.name) model.name = data.name;
            if(data.icon) model.icon = data.icon;
            if(data.abbr) model.abbr = data.abbr;
            if(data.walletAddress) model.walletAddress = data.walletAddress;
            if(data.priceNaira) model.priceNaira = data.priceNaira;
            if(data.priceDollar) model.priceDollar = data.priceDollar;

            await model.save((err, doc)=>{
                if (!err){
                    return res.status(200).send({"success":"Crypto updated"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getOneCrypto(req,res){
        try {
            CryptoModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Crypto not found"});
                    return res.status(200).send(doc);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getAllCrypto(req,res){
        try {
            CryptoModel.find((err, docs)=>{
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
                sort: {_id: -1}
            }
            await CryptoModel.paginate({},options,(err, docs)=>{
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

    async deleteCrypto(req,res){
        try {
            CryptoModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Crypto not found"});

                    doc.remove((err, docs)=>{
                        if (!err){
                            return res.status(200).send({"success":"Crypto deleted"});
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
