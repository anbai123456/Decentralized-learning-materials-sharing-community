/**
 * Express router providing  related routes
*/
import express from 'express';
import DB from '../datasource';
import { HttpRequest, HttpResponse } from '../helpers/http';
import { body }  from 'express-validator';
import validateFormData from '../helpers/validate_form';
import { In } from 'typeorm';
const SmartContractEvents = DB.SmartContractEvents;
const router = express.Router();




/**
 * Route to list smartcontractevents records
 * @route {GET} /smartcontractevents/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req:HttpRequest, res:HttpResponse) => {  
	try{
		const query = SmartContractEvents.getQuery();
		
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
			let searchFields = SmartContractEvents.searchFields(); // get columns to search
			query.andWhere(searchFields, {search: `%${search}%`});
		}
		
		const selectFields = SmartContractEvents.listFields(); //get columns to select
		query.select(selectFields);
		
		// order by field
		const orderBy = req.getOrderBy('event_id', 'DESC');
		if(orderBy){
			query.orderBy(orderBy.column, orderBy.orderType);
		}
		
		//return records and pager info
		const pageData = await SmartContractEvents.paginate(query, page, limit);
		
		return res.send(pageData);
	}
	catch(err) {
		console.error("has crached", req.path, err);
		return res.serverError(err);
	}
});


/**
 * Route to view SmartContractEvents record
 * @route {GET} /smartcontractevents/view/{recid}
 */
router.get('/view/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let recid = req.params.recid;
		let query = SmartContractEvents.getQuery();
		query.where("event_id=:recid", { recid });
		let selectFields = SmartContractEvents.viewFields();
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
 * Route to insert SmartContractEvents record
 * @route {POST} /smartcontractevents/add
 */
router.post('/add/' , 
	[
		body('contract_address').optional({nullable: true, checkFalsy: true}),
		body('event_name').optional({nullable: true, checkFalsy: true}),
		body('event_data').optional({nullable: true, checkFalsy: true}),
		body('block_number').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('transaction_hash').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req:HttpRequest, res:HttpResponse) {
	try{
		let modeldata = req.getValidFormData();
		
		//save SmartContractEvents record
		let record = await SmartContractEvents.save(modeldata);
		
		return res.send(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  SmartContractEvents record for edit
 * @route {GET} /smartcontractevents/edit/{recid}
 */
router.get('/edit/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let recid = req.params.recid;
		let query = SmartContractEvents.getQuery();
		const editFields = SmartContractEvents.editFields(); // get fields to edit
		query.where("event_id=:recid", { recid });
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
 * Route to update  SmartContractEvents record
 * @route {POST} /smartcontractevents/edit/{recid}
 */
router.post('/edit/:recid' , 
	[
		body('contract_address').optional({nullable: true, checkFalsy: true}),
		body('event_name').optional({nullable: true, checkFalsy: true}),
		body('event_data').optional({nullable: true, checkFalsy: true}),
		body('block_number').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('transaction_hash').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req:HttpRequest, res:HttpResponse) => {
	try{
		const recid = req.params.recid;
		
		const editFields = SmartContractEvents.editFields();  // get fields to edit
		
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = SmartContractEvents.getQuery();
		query.where("event_id=:recid", { recid });
		query.select(editFields);
		const record = await query.getRawOne();
		if(!record){
			return res.recordNotFound();
		}
		Object.assign(record, modeldata); // update record with form input
		await query.update().set(modeldata).execute();
		return res.send(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete SmartContractEvents record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /smartcontractevents/delete/{recid}
 */
router.get('/delete/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = SmartContractEvents.getQuery();
		query.where({'event_id': In(recid)});
		 
		const records = await query.getMany();
		if(!records){
			return res.recordNotFound();
		}
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		
		const result = await query.delete().execute();
		
		return res.send(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
