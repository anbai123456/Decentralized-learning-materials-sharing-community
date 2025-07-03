import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list fans records
 * @GET /fans/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Fans.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'fans_id', 'desc');
		query.attributes = DB.Fans.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Fans.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Fans record
 * @GET /fans/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['fans_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Fans.viewFields();
		let record = await DB.Fans.findOne(query);
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
 * Route to insert Fans record
 * @POST /fans/add
 */
router.post('/add/', 
	[
		body('followee_user_id').not().isEmpty(),
		body('follower_user_id').not().isEmpty(),
		body('ismutualfollow').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Fans record
		let record = await DB.Fans.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['fans_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Fans record for edit
 * @GET /fans/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['fans_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Fans.editFields();
		let record = await DB.Fans.findOne(query);
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
 * Route to update  Fans record
 * @POST /fans/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('followee_user_id').optional({nullable: true}).not().isEmpty(),
		body('follower_user_id').optional({nullable: true}).not().isEmpty(),
		body('ismutualfollow').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['fans_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Fans.editFields();
		let record = await DB.Fans.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Fans.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Fans record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /fans/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['fans_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Fans.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Fans.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
