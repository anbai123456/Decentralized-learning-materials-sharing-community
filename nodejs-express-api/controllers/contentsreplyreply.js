import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list contentsreplyreply records
 * @GET /contentsreplyreply/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.ContentsReplyReply.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'reply_reply_id', 'desc');
		query.attributes = DB.ContentsReplyReply.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.ContentsReplyReply.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view ContentsReplyReply record
 * @GET /contentsreplyreply/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['reply_reply_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentsReplyReply.viewFields();
		let record = await DB.ContentsReplyReply.findOne(query);
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
 * Route to insert ContentsReplyReply record
 * @POST /contentsreplyreply/add
 */
router.post('/add/', 
	[
		body('reply_id').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('reply_reply_content').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['user_id'] = req.user.user_id;
		
		//save ContentsReplyReply record
		let record = await DB.ContentsReplyReply.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['reply_reply_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  ContentsReplyReply record for edit
 * @GET /contentsreplyreply/edit/{recid}
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
		where['reply_reply_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentsReplyReply.editFields();
		let record = await DB.ContentsReplyReply.findOne(query);
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
 * Route to update  ContentsReplyReply record
 * @POST /contentsreplyreply/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('reply_id').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('reply_reply_content').optional({nullable: true}).not().isEmpty(),
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
		where['reply_reply_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentsReplyReply.editFields();
		let record = await DB.ContentsReplyReply.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.ContentsReplyReply.update(modeldata, {where: where});
		record = await DB.ContentsReplyReply.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete ContentsReplyReply record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /contentsreplyreply/delete/{recid}
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
		where['reply_reply_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.ContentsReplyReply.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['reply_reply_id'], oldValues });
		});
		await DB.ContentsReplyReply.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
