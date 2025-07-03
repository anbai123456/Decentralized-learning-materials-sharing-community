import { Router } from 'express';
import { body } from 'express-validator';
import utils from '../helpers/utils.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list follows records
 * @GET /follows/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Follows.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'follows_id', 'desc');
		query.attributes = DB.Follows.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Follows.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Follows record
 * @GET /follows/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['follows_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Follows.viewFields();
		let record = await DB.Follows.findOne(query);
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
 * Route to insert Follows record
 * @POST /follows/add
 */
router.post('/add/', 
	[
		body('followee_user_id').not().isEmpty(),
		body('follower_user_id').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['follow_time'] = utils.dateTimeNow();
		
		//save Follows record
		let record = await DB.Follows.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['follows_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Follows record for edit
 * @GET /follows/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['follows_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Follows.editFields();
		let record = await DB.Follows.findOne(query);
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
 * Route to update  Follows record
 * @POST /follows/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('followee_user_id').optional({nullable: true}).not().isEmpty(),
		body('follower_user_id').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['follows_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Follows.editFields();
		let record = await DB.Follows.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Follows.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Follows record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /follows/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['follows_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Follows.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Follows.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/status/:post_id/:user_id', async (req, res) => {  
    try{
        let sqltext = "SELECT * FROM `follows` where followee_user_id = :param1 and follower_user_id = :param2";
        let queryParams = {
            param1: req.params.post_id,
            param2: req.params.user_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    }
    catch(err) {
        return res.serverError(err);
    }
});router.get('/del/:followee_user_id/:follower_user_id', async (req, res) => {
    try {
        // 构建 SQL 查询，包括两个参数
        let sqltext = "delete FROM `follows` WHERE followee_user_id=:param1 AND follower_user_id=:param2";
        let queryParams = {
            param1: req.params.followee_user_id,
            param2: req.params.follower_user_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    }
    catch (err) {
        return res.serverError(err);
    }
});
export default router;
