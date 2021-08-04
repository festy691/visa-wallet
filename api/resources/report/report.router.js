const express = require('express');
const reportController = require('./report.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const reportRouter = express.Router();
module.exports = reportRouter;

reportRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),reportController.createReport)
    .get(reportController.getAllReports);

reportRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), reportController.updateReport)
    .get(reportController.getOneReport)
    .delete(protect, authorize('admin'), reportController.deleteReport);

reportRouter.route('/paginate/reports')
    .get(reportController.findAllPaginate);