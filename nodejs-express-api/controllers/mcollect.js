import { Router } from 'express';
import { body } from 'express-validator';
import utils from '../helpers/utils.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list mcollect records
 * @GET /mcollect/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.MCollect.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'collect_id', 'desc');
		query.attributes = DB.MCollect.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.MCollect.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view MCollect record
 * @GET /mcollect/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['collect_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.MCollect.viewFields();
		let record = await DB.MCollect.findOne(query);
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
 * Route to insert MCollect record
 * @POST /mcollect/add
 */
router.post('/add/', 
	[
		body('multimedia_id').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['user_id'] = req.user.user_id;
modeldata['collect_at'] = utils.dateTimeNow();
		
		//save MCollect record
		let record = await DB.MCollect.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['collect_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  MCollect record for edit
 * @GET /mcollect/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['collect_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.MCollect.editFields();
		let record = await DB.MCollect.findOne(query);
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
 * Route to update  MCollect record
 * @POST /mcollect/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('multimedia_id').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['collect_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.MCollect.editFields();
		let record = await DB.MCollect.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.MCollect.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete MCollect record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /mcollect/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['collect_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.MCollect.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.MCollect.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/status/:multimedia_id/:user_id', async (req, res) => {  
    try {
        let sqltext = "SELECT * FROM `m_collect` WHERE multimedia_id = :params1 AND user_id = :params2";
        let queryParams = {
            params1: req.params.multimedia_id,
            params2: req.params.user_id
        };
        const records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    } catch (err) {
        return res.serverError(err);
    }
});
router.get('/count/:multimedia_id', async (req, res) => {  
    try {
        const sqltext = "SELECT COUNT(1) as collectcount FROM `m_collect` WHERE multimedia_id = :params1";
        const queryParams = {
            params1: req.params.multimedia_id
        };
        const records = await DB.rawQueryList(sqltext, queryParams);
        return res.json(records);  // 返回总收藏数
    } catch (err) {
        return res.serverError(err);
    }
});
router.get('/del/:multimedia_id/:user_id', async (req, res) => {
    try {
        let sqltext = "delete FROM `m_collect` WHERE multimedia_id=:param1 AND user_id=:param2";
        let queryParams = {
            param1: req.params.multimedia_id,
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
