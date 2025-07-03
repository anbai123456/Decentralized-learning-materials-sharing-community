/**
 * Express router providing  related routes
*/
import express from 'express';
import DB from '../datasource';
import { HttpRequest, HttpResponse } from '../helpers/http';
import { body }  from 'express-validator';
import validateFormData from '../helpers/validate_form';
import { In } from 'typeorm';
const ContentsLikes = DB.ContentsLikes;
const router = express.Router();




/**
 * Route to list contentslikes records
 * @route {GET} /contentslikes/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req:HttpRequest, res:HttpResponse) => {  
	try{
		const query = ContentsLikes.getQuery();
		
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
			let searchFields = ContentsLikes.searchFields(); // get columns to search
			query.andWhere(searchFields, {search: `%${search}%`});
		}
		
		const selectFields = ContentsLikes.listFields(); //get columns to select
		query.select(selectFields);
		
		// order by field
		const orderBy = req.getOrderBy('like_id', 'DESC');
		if(orderBy){
			query.orderBy(orderBy.column, orderBy.orderType);
		}
		
		//return records and pager info
		const pageData = await ContentsLikes.paginate(query, page, limit);
		
		return res.send(pageData);
	}
	catch(err) {
		console.error("has crached", req.path, err);
		return res.serverError(err);
	}
});


/**
 * Route to view ContentsLikes record
 * @route {GET} /contentslikes/view/{recid}
 */
router.get('/view/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let recid = req.params.recid;
		let query = ContentsLikes.getQuery();
		query.where("like_id=:recid", { recid });
		let selectFields = ContentsLikes.viewFields();
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
 * Route to insert ContentsLikes record
 * @route {POST} /contentslikes/add
 */
router.post('/add/' , 
	[
		body('user_id').not().isEmpty(),
		body('content_id').not().isEmpty(),
		body('liked_count').not().isEmpty().isNumeric(),
	], validateFormData
, async function (req:HttpRequest, res:HttpResponse) {
	try{
		let modeldata = req.getValidFormData();
		
		//save ContentsLikes record
		let record = await ContentsLikes.save(modeldata);
		req.newRecord = {...record}; 
		req.writeToLog(record['like_id']);
		
		return res.send(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  ContentsLikes record for edit
 * @route {GET} /contentslikes/edit/{recid}
 */
router.get('/edit/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let recid = req.params.recid;
		let query = ContentsLikes.getQuery();
		const editFields = ContentsLikes.editFields(); // get fields to edit
		query.where("like_id=:recid", { recid });
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
 * Route to update  ContentsLikes record
 * @route {POST} /contentslikes/edit/{recid}
 */
router.post('/edit/:recid' , 
	[
		body('user_id').optional({nullable: true}).not().isEmpty(),
		body('content_id').optional({nullable: true}).not().isEmpty(),
		body('liked_count').optional({nullable: true}).not().isEmpty().isNumeric(),
	], validateFormData
, async (req:HttpRequest, res:HttpResponse) => {
	try{
		const recid = req.params.recid;
		
		const editFields = ContentsLikes.editFields();  // get fields to edit
		
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = ContentsLikes.getQuery();
		query.where("like_id=:recid", { recid });
		query.select(editFields);
		const record = await query.getRawOne();
		if(!record){
			return res.recordNotFound();
		}
		req.oldRecord = {...record}; //for audit trail
		Object.assign(record, modeldata); // update record with form input
		await query.update().set(modeldata).execute();
		req.newRecord = {...record}; 
		req.writeToLog(record['like_id']);
		return res.send(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete ContentsLikes record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /contentslikes/delete/{recid}
 */
router.get('/delete/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = ContentsLikes.getQuery();
		query.where({'like_id': In(recid)});
		 
		const records = await query.getMany();
		if(!records){
			return res.recordNotFound();
		}
		records.forEach(async (record) => { 
			//perform action on each record before delete
			req.oldRecord = {...record}; //for audit trail
			req.writeToLog(record['like_id']);
		});
		
		const result = await query.delete().execute();
		
		return res.send(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/getlikecount/:content_id', async (req, res) => {  
    try{
        let sqltext = "SELECT count(1) as likecount FROM contents_likes where like_id=:param1";
        console.log("==============req.params=============",req.params);
        let queryParams = {
            param1: req.params.content_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        console.log("==================records==============",records);
        return res.ok(records);
    }
    catch (err) {
        return res.Response(err);
    }
});
export default router;
