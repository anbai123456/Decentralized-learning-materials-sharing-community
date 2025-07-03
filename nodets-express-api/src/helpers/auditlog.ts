
import Audits from '../models/audits.entity';
import {HttpRequest} from './http';
import utils from './utils';
export default async function writeToLog (req:HttpRequest, payload:any) {
	try{
		const timeStamp = utils.dateTimeNow();
		let page = req.pageName;
		let action = req.actionName;
		if(action == 'index'){
			action = "list";
		}
		const reqId = req.params.recid || ""; // get rec id from url if available

		let recId = (payload.recid || reqId).toString(); //if array, convert to string

		let userId = null;
		if(req.user){
			userId = String(req.user.user_id);
		}

		let oldValues = payload.oldValues || null;
		let newValues = payload.newValues || null;

		let userIp = req.ip;
		let userAgent = req.get('User-Agent');;
		let requestUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		
		return await Audits.save({
			action,
			page,
			record_id: recId,
			old_values: oldValues,
			new_values: newValues,
			user_id: userId,
			user_ip: userIp,
			user_agent: userAgent,
			request_url: requestUrl,
			timestamp: timeStamp
		});
	}
	catch(err){
		console.log(err)
	}
}
