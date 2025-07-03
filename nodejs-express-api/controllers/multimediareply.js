import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list multimediareply records
 * @GET /multimediareply/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req, res) => {  
	try{
		const query = {};
		let queryFilters = [];
		let where = {};
		let replacements = {};
		let fieldName = req.params.fieldname;
		let fieldValue = req.params.fieldvalue;
		
		if (fieldName){
			queryFilters.push(DB.filterBy(fieldName, fieldValue));
		}
		let search = req.query.search;
		if(search){
			let searchFields = DB.MultimediaReply.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'reply_id', 'desc');
		query.attributes = DB.MultimediaReply.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.MultimediaReply.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view MultimediaReply record
 * @GET /multimediareply/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['reply_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.MultimediaReply.viewFields();
		let record = await DB.MultimediaReply.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert MultimediaReply record
 * @POST /multimediareply/add
 */
router.post('/add/', 
	[
		body('multimedia_id').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('reply_multimedia').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['user_id'] = req.user.user_id;
		
		//save MultimediaReply record
		let record = await DB.MultimediaReply.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['reply_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  MultimediaReply record for edit
 * @GET /multimediareply/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		let allowedRoles = ["admin"];
		let userRole = req.userRoleName;
		if(!allowedRoles.includes(userRole)){
			where['user_id'] = req.user.user_id; //filter only current records
		}
		where['reply_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.MultimediaReply.editFields();
		let record = await DB.MultimediaReply.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  MultimediaReply record
 * @POST /multimediareply/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('multimedia_id').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('reply_multimedia').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		let allowedRoles = ["admin"];
		let userRole = req.userRoleName;
		if(!allowedRoles.includes(userRole)){
			where['user_id'] = req.user.user_id; //filter only current records
		}
		where['reply_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.MultimediaReply.editFields();
		let record = await DB.MultimediaReply.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.MultimediaReply.update(modeldata, {where: where});
		record = await DB.MultimediaReply.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete MultimediaReply record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /multimediareply/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		let allowedRoles = ["admin"];
		let userRole = req.userRoleName;
		if(!allowedRoles.includes(userRole)){
			where['user_id'] = req.user.user_id; //filter only current records
		}
		where['reply_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.MultimediaReply.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['reply_id'], oldValues });
		});
		await DB.MultimediaReply.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
