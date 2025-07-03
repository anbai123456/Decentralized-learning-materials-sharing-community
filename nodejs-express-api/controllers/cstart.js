import { Router } from 'express';
import { body } from 'express-validator';
import utils from '../helpers/utils.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list cstart records
 * @GET /cstart/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.CStart.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'start_id', 'desc');
		query.attributes = DB.CStart.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.CStart.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view CStart record
 * @GET /cstart/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['start_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.CStart.viewFields();
		let record = await DB.CStart.findOne(query);
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
 * Route to insert CStart record
 * @POST /cstart/add
 */
router.post('/add/', 
	[
		body('user_id').not().isEmpty(),
		body('starteduser_id').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['start_at'] = utils.dateTimeNow();
		
		//save CStart record
		let record = await DB.CStart.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['start_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  CStart record for edit
 * @GET /cstart/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['start_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.CStart.editFields();
		let record = await DB.CStart.findOne(query);
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
 * Route to update  CStart record
 * @POST /cstart/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('user_id').optional({nullable: true}).not().isEmpty(),
		body('starteduser_id').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['start_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.CStart.editFields();
		let record = await DB.CStart.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.CStart.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete CStart record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /cstart/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['start_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.CStart.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.CStart.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/status/:starteduser_id/:user_id', async (req, res) => {  
    try {
        let sqltext = "SELECT * FROM `c_start` WHERE starteduser_id = :params1 AND user_id = :params2";
        let queryParams = {
            params1: req.params.starteduser_id,
            params2: req.params.user_id
        };
        const records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    } catch (err) {
        return res.serverError(err);
    }
});router.get('/getstartedid/:content_id', async (req, res) => {  
    try {
        let sqltext = "SELECT user_id FROM `Contents` WHERE content_id = :params1";
        let queryParams = {
            params1: req.params.content_id
        };
        const records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok({startedid: records[0].user_id});
    } catch (err) {
        return res.serverError(err);
    }
});
router.get('/count/:startedid', async (req, res) => {  
    try {
        const sqltext = "SELECT COUNT(*) as startcount FROM `c_start` WHERE starteduser_id = :params1";
        const queryParams = {
            params1: req.params.startedid
        };
        const records = await DB.rawQueryList(sqltext, queryParams);
        return res.json(records);  // 返回总收藏数
    } catch (err) {
        return res.serverError(err);
    }
});
router.get('/del/:starteduser_id/:user_id', async (req, res) => {
    try {
        let sqltext = "delete FROM `c_start` WHERE starteduser_id=:param1 AND user_id=:param2";
        let queryParams = {
            param1: req.params.starteduser_id,
            param2: req.params.user_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    }
    catch (err) {
        return res.serverError(err);
    }
});router.get('/fans/:starteduser_id/:user_id', async (req, res) => {  
    try {
        let sqltext = "SELECT * FROM `c_start` WHERE starteduser_id = :params1 AND user_id = :params2";
        let queryParams = {
            params1: req.params.user_id,
            params2: req.params.starteduser_id
        };
        const records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    } catch (err) {
        return res.serverError(err);
    }
});
export default router;
