/**
 * Express router providing related routes to page component data
*/
import express from 'express';
import { rawQuery } from '../datasource';
import DB from '../datasource';
import { HttpRequest, HttpResponse } from '../helpers/http';
const router = express.Router();




 /**
 * Route to get user_id_option_list records
 * @route {GET} /components_data/user_id_option_list
 */
router.get('/user_id_option_list', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let sqltext = `SELECT user_id as value, username as label FROM users` ;
		let records = await rawQuery(sqltext );
		return res.send(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get content_id_option_list records
 * @route {GET} /components_data/content_id_option_list
 */
router.get('/content_id_option_list', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let sqltext = `SELECT content_id as value, title as label FROM contents` ;
		let records = await rawQuery(sqltext );
		return res.send(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get role_id_option_list records
 * @route {GET} /components_data/role_id_option_list
 */
router.get('/role_id_option_list', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let sqltext = `SELECT role_id as value, role_name as label FROM roles` ;
		let records = await rawQuery(sqltext );
		return res.send(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @route {GET} /components_data/users_username_exist/{fieldvalue}
 */
router.get('/users_username_exist/:fieldvalue', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let val = req.params.fieldvalue;
		if(val){
			let recordExists = await DB.Users.getQuery().where({'username': val}).exists();
			return res.send(recordExists);
		}
		return res.send("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @route {GET} /components_data/users_email_exist/{fieldvalue}
 */
router.get('/users_email_exist/:fieldvalue', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let val = req.params.fieldvalue;
		if(val){
			let recordExists = await DB.Users.getQuery().where({'email': val}).exists();
			return res.send(recordExists);
		}
		return res.send("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_contents value
 * @route {GET} /components_data/getcount_contents
 */
router.get('/getcount_contents', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM contents` ;
		let records = await rawQuery(sqltext );
		let val = Object.values(records[0])[0].toString();
		return res.send(val);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get user_id_option_list_2 records
 * @route {GET} /components_data/user_id_option_list_2
 */
router.get('/user_id_option_list_2', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let sqltext = `SELECT  DISTINCT user_id AS value,user_id AS label FROM contents` ;
		let records = await rawQuery(sqltext );
		return res.send(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get title_option_list records
 * @route {GET} /components_data/title_option_list
 */
router.get('/title_option_list', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let sqltext = `SELECT  DISTINCT title AS value,title AS label FROM contents` ;
		let records = await rawQuery(sqltext );
		return res.send(records);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
