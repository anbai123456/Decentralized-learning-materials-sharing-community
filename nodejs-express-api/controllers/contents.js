import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list contents records
 * @GET /contents/index/{fieldname}/{fieldvalue}
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
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.Users,
			required: true,
			as: 'users',
			attributes: [], //already set via model class
		})
		query.include = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = DB.Contents.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(req.query.user_id){
			let vals = req.query.user_id
			queryFilters.push(DB.filterBy("contents.user_id", { [DB.op.in]: vals }))
		}
		if(req.query.tag){
			let vals = req.query.tag
			queryFilters.push(DB.filterBy("contents.tag", { [DB.op.in]: vals }))
		}
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'content_id', 'desc');
		query.attributes = DB.Contents.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 8;
		let result = await DB.Contents.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Contents record
 * @GET /contents/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['content_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Contents.viewFields();
		let record = await DB.Contents.findOne(query);
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
 * Route to insert Contents record
 * @POST /contents/add
 */
router.post('/add/', 
	[
		body('content_type').optional({nullable: true, checkFalsy: true}),
		body('tag').not().isEmpty(),
		body('created_at').not().isEmpty(),
		body('body').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['user_id'] = req.user.user_id;
		
		//save Contents record
		let record = await DB.Contents.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['content_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Contents record for edit
 * @GET /contents/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['content_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Contents.editFields();
		let record = await DB.Contents.findOne(query);
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
 * Route to update  Contents record
 * @POST /contents/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('content_id').optional({nullable: true}).not().isEmpty(),
		body('content_type').optional({nullable: true, checkFalsy: true}),
		body('tag').optional({nullable: true}).not().isEmpty(),
		body('blocknum').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('tx_hash').optional({nullable: true, checkFalsy: true}),
		body('body').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['content_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Contents.editFields();
		let record = await DB.Contents.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Contents.update(modeldata, {where: where});
		record = await DB.Contents.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Contents record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /contents/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['content_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Contents.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['content_id'], oldValues });
		});
		await DB.Contents.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/status/:content_id/:user_id', async (req, res) => {  
    try{
        let sqltext = "SELECT * FROM `contents_likes` where content_id = :param1 and user_id = :param2";
        let queryParams = {
            param1: req.params.content_id,
            param2: req.params.user_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    }
    catch(err) {
        return res.serverError(err);
    }
});
export default router;
