const OrderModel = require("./order.model");

module.exports =  {
    async placeOrder(req,res){
        try {
            let model = new OrderModel();
            let data = req.body;

            if (!data.user)
                return res.status(400).send({"error":"user is required"});
            if (!data.type)
                return res.status(400).send({"error":"type is required"});
            if (!data.crypto)
                return res.status(400).send({"error":"crypto is required"});
            if (!data.walletAddress)
                return res.status(400).send({"error":"walletAddress is required"});
            if (!data.priceNaira)
                return res.status(400).send({"error":"priceNaira is required"});
            if (!data.priceDollar)
                return res.status(400).send({"error":"priceDollar is required"});
            if (!data.status)
                return res.status(400).send({"error":"status is required"});
            if (!data.cryptoValue)
                return res.status(400).send({"error":"cryptoValue is required"});
            if (!data.receipt)
                return res.status(400).send({"error":"receipt is required"});

            model.user = data.user;
            model.type = data.type;
            model.crypto = data.crypto;
            model.walletAddress = data.walletAddress;
            model.priceNaira = data.priceNaira;
            model.priceDollar = data.priceDollar;
            model.status = data.status;
            model.cryptoValue = data.cryptoValue;
            model.receipt = data.receipt;

            await model.save((err, doc)=>{
                if (!err){
                    return res.status(200).send({"success":"Your order is awaiting confirmation"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateOrder(req,res){
        try {

            let data = req.body;

            const model = await OrderModel.findOne(({_id:req.params.id}));

            if (!model) return res.status(404).send({"error":"crypto not found"});

            if (!data.status) return res.status(404).send({"error":"status to update is required"});

            if(data.name) model.name = data.name;

            await model.save((err, doc)=>{
                if (!err){
                    return res.status(200).send({"success":"Order status updated"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getOneOrder(req,res){
        try {
            OrderModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Order not found"});
                    return res.status(200).send(doc);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            }).populate('user', '_id name image phonenumber email bankName accountNumber accountName').populate('crypto', '_id name icon abbr walletAddress');
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getAllOrder(req,res){
        try {
            let {user} = req.query;
            if(user) {
                OrderModel.find({user:user},(err, docs)=>{
                    if(!err){
                        return res.status(200).send(docs);
                    }
                    else{
                        return res.status(400).send({"error":err});
                    }
                }).populate('user', '_id name image phonenumber email bankName accountNumber accountName').populate('crypto', '_id name icon abbr walletAddress');
            }
            else {
                OrderModel.find((err, docs)=>{
                    if(!err){
                        return res.status(200).send(docs);
                    }
                    else{
                        return res.status(400).send({"error":err});
                    }
                }).populate('user', '_id name image phonenumber email bankName accountNumber accountName').populate('crypto', '_id name icon abbr walletAddress');
            }
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
            await OrderModel.paginate({},options,(err, docs)=>{
                if(!err){
                    if (docs) return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            }).populate('user', '_id name image phonenumber email bankName accountNumber accountName').populate('crypto', '_id name icon abbr walletAddress');
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async deleteOrder(req,res){
        try {
            OrderModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Order not found"});

                    doc.remove((err, docs)=>{
                        if (!err){
                            return res.status(200).send({"success":"Order deleted"});
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
