import { Router } from 'express';
import { body } from 'express-validator';
import utils from '../helpers/utils.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list contentslikes records
 * @GET /contentslikes/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.ContentsLikes.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'like_id', 'desc');
		query.attributes = DB.ContentsLikes.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.ContentsLikes.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view ContentsLikes record
 * @GET /contentslikes/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['like_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentsLikes.viewFields();
		let record = await DB.ContentsLikes.findOne(query);
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
 * Route to insert ContentsLikes record
 * @POST /contentslikes/add
 */
router.post('/add/', 
	[
		body('user_id').not().isEmpty(),
		body('content_id').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['liked_at'] = utils.dateTimeNow();
		
		//save ContentsLikes record
		let record = await DB.ContentsLikes.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['like_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  ContentsLikes record for edit
 * @GET /contentslikes/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['like_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentsLikes.editFields();
		let record = await DB.ContentsLikes.findOne(query);
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
 * Route to update  ContentsLikes record
 * @POST /contentslikes/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('user_id').optional({nullable: true}).not().isEmpty(),
		body('content_id').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['like_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentsLikes.editFields();
		let record = await DB.ContentsLikes.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.ContentsLikes.update(modeldata, {where: where});
		record = await DB.ContentsLikes.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete ContentsLikes record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /contentslikes/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['like_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.ContentsLikes.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['like_id'], oldValues });
		});
		await DB.ContentsLikes.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/getlikecount/:content_id', async (req, res) => {  
    try{
        let sqltext = "SELECT count(1) as likecount FROM contents_likes where content_id=:param1";
        console.log("==req.params===========:",req.params);
        let queryParams = {
            param1: req.params.content_id
    }
    let records = await DB.rawQueryList(sqltext, queryParams);
    console.log("===========records:",records);
    return res.json(records);
    }
    catch(err) {
        return res.Response(err);
    }
});router.get('/del/:content_id/:user_id', async (req, res) => {
    try {
        let sqltext = "delete FROM `contents_likes` WHERE content_id=:param1 AND user_id=:param2";
        let queryParams = {
            param1: req.params.content_id,
            param2: req.params.user_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    }
    catch (err) {
        return res.serverError(err);
    }
});
export default router;
