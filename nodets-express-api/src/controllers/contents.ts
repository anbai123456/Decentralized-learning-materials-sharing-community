/**
 * Express router providing  related routes
*/
import express from 'express';
import DB from '../datasource';
import { HttpRequest, HttpResponse } from '../helpers/http';
import { body }  from 'express-validator';
import validateFormData from '../helpers/validate_form';
import { In } from 'typeorm';
const Contents = DB.Contents;
const router = express.Router();




/**
 * Route to list contents records
 * @route {GET} /contents/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req:HttpRequest, res:HttpResponse) => {  
	try{
		const query = Contents.getQuery();
		
		const fieldName = req.params.fieldname;
		const fieldValue = req.params.fieldvalue;
		const search = req.query.search;
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 8;
		
		if (fieldName){
			 //filter by a single column values
			query.where(`${fieldName}=:fieldValue`, {fieldValue});
		}
		
		if(req.query.user_id){
			let paramValue = req.query.user_id as string[];
				query.andWhere({ 'user_id': In(paramValue) });
		}
		if(req.query.title){
			let paramValue = req.query.title as string[];
				query.andWhere({ 'title': In(paramValue) });
		}
		
		if(search){
			let searchFields = Contents.searchFields(); // get columns to search
			query.andWhere(searchFields, {search: `%${search}%`});
		}
		
		const selectFields = Contents.listFields(); //get columns to select
		query.select(selectFields);
		
		// order by field
		const orderBy = req.getOrderBy('content_id', 'DESC');
		if(orderBy){
			query.orderBy(orderBy.column, orderBy.orderType);
		}
		
		//return records and pager info
		const pageData = await Contents.paginate(query, page, limit);
		
		return res.send(pageData);
	}
	catch(err) {
		console.error("has crached", req.path, err);
		return res.serverError(err);
	}
});


/**
 * Route to view Contents record
 * @route {GET} /contents/view/{recid}
 */
router.get('/view/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let recid = req.params.recid;
		let query = Contents.getQuery();
		query.where("content_id=:recid", { recid });
		let selectFields = Contents.viewFields();
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
 * Route to insert Contents record
 * @route {POST} /contents/add
 */
router.post('/add/' , 
	[
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('content_type').optional({nullable: true, checkFalsy: true}),
		body('title').not().isEmpty(),
		body('body').not().isEmpty(),
	], validateFormData
, async function (req:HttpRequest, res:HttpResponse) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Contents record
		let record = await Contents.save(modeldata);
		req.newRecord = {...record}; 
		req.writeToLog(record['content_id']);
		
		return res.send(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Contents record for edit
 * @route {GET} /contents/edit/{recid}
 */
router.get('/edit/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let recid = req.params.recid;
		let query = Contents.getQuery();
		const editFields = Contents.editFields(); // get fields to edit
		query.where("content_id=:recid", { recid });
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
 * Route to update  Contents record
 * @route {POST} /contents/edit/{recid}
 */
router.post('/edit/:recid' , 
	[
		body('content_id').optional({nullable: true}).not().isEmpty(),
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('content_type').optional({nullable: true, checkFalsy: true}),
		body('title').optional({nullable: true}).not().isEmpty(),
		body('body').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req:HttpRequest, res:HttpResponse) => {
	try{
		const recid = req.params.recid;
		
		const editFields = Contents.editFields();  // get fields to edit
		
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = Contents.getQuery();
		query.where("content_id=:recid", { recid });
		query.select(editFields);
		const record = await query.getRawOne();
		if(!record){
			return res.recordNotFound();
		}
		req.oldRecord = {...record}; //for audit trail
		Object.assign(record, modeldata); // update record with form input
		await query.update().set(modeldata).execute();
		req.newRecord = {...record}; 
		req.writeToLog(record['content_id']);
		return res.send(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Contents record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /contents/delete/{recid}
 */
router.get('/delete/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = Contents.getQuery();
		query.where({'content_id': In(recid)});
		 
		const records = await query.getMany();
		if(!records){
			return res.recordNotFound();
		}
		records.forEach(async (record) => { 
			//perform action on each record before delete
			req.oldRecord = {...record}; //for audit trail
			req.writeToLog(record['content_id']);
		});
		
		const result = await query.delete().execute();
		
		return res.send(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
