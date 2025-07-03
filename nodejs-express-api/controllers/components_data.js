import { Router } from 'express';
import DB from '../models/db.js';


const router = Router();


 /**
 * Route to get user_id_option_list records
 * @GET /components_data/user_id_option_list
 */
router.get('/user_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT user_id as value, username as label FROM users` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get content_id_option_list records
 * @GET /components_data/content_id_option_list
 */
router.get('/content_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT content_id as value, content_id as label FROM contents` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get tag_option_list records
 * @GET /components_data/tag_option_list
 */
router.get('/tag_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT tag AS value,tag AS label FROM tag` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get content_id_option_list_2 records
 * @GET /components_data/content_id_option_list_2
 */
router.get('/content_id_option_list_2', async (req, res) => {
	try{
		let sqltext = `SELECT content_id as value, title as label FROM contents` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get multimedia_id_option_list records
 * @GET /components_data/multimedia_id_option_list
 */
router.get('/multimedia_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT multimedia_id as value, multimedia_id as label FROM multimedia` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get role_id_option_list records
 * @GET /components_data/role_id_option_list
 */
router.get('/role_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT role_id as value, role_name as label FROM roles` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @GET /components_data/users_username_exist/{fieldvalue}
 */
router.get('/users_username_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Users.count({ where:{ 'username': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @GET /components_data/users_email_exist/{fieldvalue}
 */
router.get('/users_email_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Users.count({ where:{ 'email': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_contents value
 * @GET /components_data/getcount_contents
 */
router.get('/getcount_contents', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM contents` ;
		
		let value = await DB.rawQueryValue(sqltext);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get user_id_option_list_2 records
 * @GET /components_data/user_id_option_list_2
 */
router.get('/user_id_option_list_2', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT user_id AS value,user_id AS label FROM contents` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get tag_option_list_2 records
 * @GET /components_data/tag_option_list_2
 */
router.get('/tag_option_list_2', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT tag AS value,tag AS label FROM contents` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_multimedia value
 * @GET /components_data/getcount_multimedia
 */
router.get('/getcount_multimedia', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM multimedia` ;
		
		let value = await DB.rawQueryValue(sqltext);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get user_id_option_list_3 records
 * @GET /components_data/user_id_option_list_3
 */
router.get('/user_id_option_list_3', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT user_id AS value,user_id AS label FROM multimedia` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_ records
 * @GET /components_data/barchart_
 */
router.get('/barchart_',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT 
    tag, 
    COUNT(DISTINCT user_id) AS user_count
FROM 
    contents
WHERE 
    tag IN ('语文', '数学', '英语', '政治', '历史', '地理', '物理', '化学', '生物')
GROUP BY 
    tag;` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.tag });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.user_count) }),
			label: "",
			backgroundColor: "rgba(128 , 128 , 255, 0.5)", 
			borderColor: "rgba(0 , 0 , 255, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart records
 * @GET /components_data/barchart
 */
router.get('/barchart',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT 
    '语文' AS tag, 
    IFNULL(COUNT(CASE WHEN tag = '语文' THEN user_id END), 0) AS user_count
FROM 
    multimedia
UNION ALL
SELECT 
    '数学', 
    IFNULL(COUNT(CASE WHEN tag = '数学' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '英语', 
    IFNULL(COUNT(CASE WHEN tag = '英语' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '政治', 
    IFNULL(COUNT(CASE WHEN tag = '政治' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '历史', 
    IFNULL(COUNT(CASE WHEN tag = '历史' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '地理', 
    IFNULL(COUNT(CASE WHEN tag = '地理' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '物理', 
    IFNULL(COUNT(CASE WHEN tag = '物理' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '化学', 
    IFNULL(COUNT(CASE WHEN tag = '化学' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '生物', 
    IFNULL(COUNT(CASE WHEN tag = '生物' THEN user_id END), 0)
FROM 
    multimedia;` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.tag });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.user_count) }),
			label: "",
			backgroundColor: "rgba(128 , 128 , 255, 0.5)", 
			borderColor: "rgba(0 , 0 , 255, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart records
 * @GET /components_data/barchart
 */
router.get('/barchart',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT 
    '语文' AS tag, 
    IFNULL(COUNT(DISTINCT CASE WHEN tag = '语文' THEN user_id END), 0) AS user_count
FROM 
    multimedia
UNION ALL
SELECT 
    '数学', 
    IFNULL(COUNT(DISTINCT CASE WHEN tag = '数学' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '英语', 
    IFNULL(COUNT(DISTINCT CASE WHEN tag = '英语' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '政治', 
    IFNULL(COUNT(DISTINCT CASE WHEN tag = '政治' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '历史', 
    IFNULL(COUNT(DISTINCT CASE WHEN tag = '历史' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '地理', 
    IFNULL(COUNT(DISTINCT CASE WHEN tag = '地理' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '物理', 
    IFNULL(COUNT(DISTINCT CASE WHEN tag = '物理' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '化学', 
    IFNULL(COUNT(DISTINCT CASE WHEN tag = '化学' THEN user_id END), 0)
FROM 
    multimedia
UNION ALL
SELECT 
    '生物', 
    IFNULL(COUNT(DISTINCT CASE WHEN tag = '生物' THEN user_id END), 0)
FROM 
    multimedia;
` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.tag });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.user_count) }),
			label: "",
			backgroundColor: "rgba(128 , 128 , 255, 0.5)", 
			borderColor: "rgba(0 , 0 , 255, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});
export default router;
