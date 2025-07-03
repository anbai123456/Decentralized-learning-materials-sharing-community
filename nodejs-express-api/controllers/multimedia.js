import { Router } from 'express';
import { body } from 'express-validator';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list multimedia records
 * @GET /multimedia/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Multimedia.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(req.query.user_id){
			let vals = req.query.user_id
			queryFilters.push(DB.filterBy("multimedia.user_id", { [DB.op.in]: vals }))
		}
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'multimedia_id', 'desc');
		query.attributes = DB.Multimedia.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 3;
		let result = await DB.Multimedia.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Multimedia record
 * @GET /multimedia/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['multimedia_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Multimedia.viewFields();
		let record = await DB.Multimedia.findOne(query);
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
 * Route to insert Multimedia record
 * @POST /multimedia/add
 */
router.post('/add/', 
	[
		body('tag').not().isEmpty(),
		body('description').optional({nullable: true, checkFalsy: true}),
		body('image_file').optional({nullable: true, checkFalsy: true}),
		body('video_file').optional({nullable: true, checkFalsy: true}),
		body('doc_file').optional({nullable: true, checkFalsy: true}),
		body('learntime').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('created_at').not().isEmpty(),
		body('updated_at').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['user_id'] = req.user.user_id;
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.image_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.image_file, 'image_file');
			modeldata.image_file = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.video_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.video_file, 'video_file');
			modeldata.video_file = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.doc_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.doc_file, 'doc_file');
			modeldata.doc_file = fileInfo.filepath;
		}
		
		//save Multimedia record
		let record = await DB.Multimedia.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['multimedia_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Multimedia record for edit
 * @GET /multimedia/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['multimedia_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Multimedia.editFields();
		let record = await DB.Multimedia.findOne(query);
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
 * Route to update  Multimedia record
 * @POST /multimedia/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('tag').optional({nullable: true}).not().isEmpty(),
		body('description').optional({nullable: true, checkFalsy: true}),
		body('image_file').optional({nullable: true, checkFalsy: true}),
		body('video_file').optional({nullable: true, checkFalsy: true}),
		body('doc_file').optional({nullable: true, checkFalsy: true}),
		body('learntime').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('created_at').optional({nullable: true}).not().isEmpty(),
		body('updated_at').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.image_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.image_file, 'image_file');
			modeldata.image_file = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.video_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.video_file, 'video_file');
			modeldata.video_file = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.doc_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.doc_file, 'doc_file');
			modeldata.doc_file = fileInfo.filepath;
		}
		const query = {};
		const where = {};
		where['multimedia_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Multimedia.editFields();
		let record = await DB.Multimedia.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Multimedia.update(modeldata, {where: where});
		record = await DB.Multimedia.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Multimedia record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /multimedia/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['multimedia_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Multimedia.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['multimedia_id'], oldValues });
		});
		await DB.Multimedia.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/getlikecount/:multimedia_id', async (req, res) => {  
    try{
        let sqltext = "SELECT count(1) as likecount FROM m_likes where multimedia_id=:param1";
        console.log("==req.params===========:",req.params);
        let queryParams = {
            param1: req.params.multimedia_id
    }
    let records = await DB.rawQueryList(sqltext, queryParams);
    console.log("===========records:",records);
    return res.json(records);
    }
    catch(err) {
        return res.Response(err);
    }
});
router.get('/del/:multimedia_id/:user_id', async (req, res) => {
    try {
        let sqltext = "delete FROM `m_likes` WHERE multimedia_id=:param1 AND user_id=:param2";
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
});router.get('/status/:multimedia_id/:user_id', async (req, res) => {  
    try{
        let sqltext = "SELECT * FROM `m_likes` where multimedia_id = :param1 and user_id = :param2";
        let queryParams = {
            param1: req.params.multimedia_id,
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
