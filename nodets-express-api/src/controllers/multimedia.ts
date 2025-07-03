/**
 * Express router providing  related routes
*/
import express from 'express';
import DB from '../datasource';
import { HttpRequest, HttpResponse } from '../helpers/http';
import { body }  from 'express-validator';
import uploader from '../helpers/uploader';
import validateFormData from '../helpers/validate_form';
import { In } from 'typeorm';
const Multimedia = DB.Multimedia;
const router = express.Router();




/**
 * Route to list multimedia records
 * @route {GET} /multimedia/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req:HttpRequest, res:HttpResponse) => {  
	try{
		const query = Multimedia.getQuery();
		
		const fieldName = req.params.fieldname;
		const fieldValue = req.params.fieldvalue;
		const search = req.query.search;
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;
		
		if (fieldName){
			 //filter by a single column values
			query.where(`${fieldName}=:fieldValue`, {fieldValue});
		}
		
		
		if(search){
			let searchFields = Multimedia.searchFields(); // get columns to search
			query.andWhere(searchFields, {search: `%${search}%`});
		}
		
		const selectFields = Multimedia.listFields(); //get columns to select
		query.select(selectFields);
		
		// order by field
		const orderBy = req.getOrderBy('multimedata_id', 'DESC');
		if(orderBy){
			query.orderBy(orderBy.column, orderBy.orderType);
		}
		
		//return records and pager info
		const pageData = await Multimedia.paginate(query, page, limit);
		
		return res.send(pageData);
	}
	catch(err) {
		console.error("has crached", req.path, err);
		return res.serverError(err);
	}
});


/**
 * Route to view Multimedia record
 * @route {GET} /multimedia/view/{recid}
 */
router.get('/view/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let recid = req.params.recid;
		let query = Multimedia.getQuery();
		query.where("multimedata_id=:recid", { recid });
		let selectFields = Multimedia.viewFields();
		query.select(selectFields);
		let record = await query.getRawOne();
		if(!record){
			return res.recordNotFound();
		}
		return res.send(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert Multimedia record
 * @route {POST} /multimedia/add
 */
router.post('/add/' , 
	[
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('image_file').optional({nullable: true, checkFalsy: true}),
		body('video_file').optional({nullable: true, checkFalsy: true}),
		body('doc_file').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req:HttpRequest, res:HttpResponse) {
	try{
		let modeldata = req.getValidFormData();
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.image_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.image_file, "image_file");
			modeldata.image_file = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.video_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.video_file, "video_file");
			modeldata.video_file = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.doc_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.doc_file, "doc_file");
			modeldata.doc_file = fileInfo.filepath;
		}
		
		//save Multimedia record
		let record = await Multimedia.save(modeldata);
		req.newRecord = {...record}; 
		req.writeToLog(record['multimedata_id']);
		
		return res.send(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Multimedia record for edit
 * @route {GET} /multimedia/edit/{recid}
 */
router.get('/edit/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let recid = req.params.recid;
		let query = Multimedia.getQuery();
		const editFields = Multimedia.editFields(); // get fields to edit
		query.where("multimedata_id=:recid", { recid });
		query.select(editFields);
		let record = await query.getRawOne();
		if(!record){
			return res.recordNotFound();
		}
		return res.send(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  Multimedia record
 * @route {POST} /multimedia/edit/{recid}
 */
router.post('/edit/:recid' , 
	[
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('image_file').optional({nullable: true, checkFalsy: true}),
		body('video_file').optional({nullable: true, checkFalsy: true}),
		body('doc_file').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req:HttpRequest, res:HttpResponse) => {
	try{
		const recid = req.params.recid;
		
		const editFields = Multimedia.editFields();  // get fields to edit
		
		let modeldata = req.getValidFormData({ includeOptionals: true });
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.image_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.image_file, "image_file");
			modeldata.image_file = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.video_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.video_file, "video_file");
			modeldata.video_file = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.doc_file !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.doc_file, "doc_file");
			modeldata.doc_file = fileInfo.filepath;
		}
		const query = Multimedia.getQuery();
		query.where("multimedata_id=:recid", { recid });
		query.select(editFields);
		const record = await query.getRawOne();
		if(!record){
			return res.recordNotFound();
		}
		req.oldRecord = {...record}; //for audit trail
		Object.assign(record, modeldata); // update record with form input
		await query.update().set(modeldata).execute();
		req.newRecord = {...record}; 
		req.writeToLog(record['multimedata_id']);
		return res.send(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Multimedia record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /multimedia/delete/{recid}
 */
router.get('/delete/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = Multimedia.getQuery();
		query.where({'multimedata_id': In(recid)});
		 
		const records = await query.getMany();
		if(!records){
			return res.recordNotFound();
		}
		records.forEach(async (record) => { 
			//perform action on each record before delete
			req.oldRecord = {...record}; //for audit trail
			req.writeToLog(record['multimedata_id']);
		});
		
		const result = await query.delete().execute();
		
		return res.send(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
