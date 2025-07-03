
import DB from '../datasource';

import { HttpRequest, HttpResponse } from './http';

/**
* Role Based Access Control
* @category  RBAC Helper
*/

let excludePages = ['account', 'components_data', 'fileuploader', 's3uploader']; //pages to exclude from access authorization check
export class Rbac{
	AUTHORIZED = "authorized";
	FORBIDDEN = "forbidden";
	UNKNOWN_ROLE = "unknown_role";
	userPages = [];
	userRole = null;
	constructor(role){
		this.userRole = role;
	}

	async getUserPages(){
		if(this.userRole){
			const records = await DB.Permissions.find({
				select:{permission: true},
				where:{
					role_id: this.userRole
				}
			});
			this.userPages = records.map(e => e.permission);
		}
		return this.userPages;
	}

	async getRoleNames(){
		let roles = [];
		if(this.userRole){
			const records = await DB.Roles.find({
				select:{role_name: true},
				where:{
					role_id: this.userRole
				}
			});
			roles = records.map(e => e.role_name);
		}
		return roles;
	}
	
	getPageAccess (path: string){
		try{
			path = path.replace(/^\/|\/$/g, ''); //Replace all leading slash and trailing slash
			let arrPath = path.split("/");
			let page = arrPath[0];
			if (excludePages.includes(page)) {
				return this.AUTHORIZED;
			}
			let action = (arrPath[1] ? arrPath[1] : "index");
			let userRole = this.userRole;
			if(userRole){
				if(this.userPages.includes(`${page}/${action}`)){
					return this.AUTHORIZED;
				} else{
					return this.FORBIDDEN;
				}
			}
			else{
				return this.UNKNOWN_ROLE;
			}
		}
		catch(err){
			console.log(err);
		}
		return this.FORBIDDEN;
	}
}

async function RbacMiddleWare(req:HttpRequest, res:HttpResponse, next){
	try{
		if(req.user){
			let rbac = new Rbac(req.user.user_role_id);
			await rbac.getUserPages();
			let pageAccess = rbac.getPageAccess(req.path);
			if (pageAccess == rbac.AUTHORIZED) {
				let userRoleNames = await rbac.getRoleNames(); //get default role name
				if(userRoleNames.length){
					req.user.roleName = userRoleNames[0].toLowerCase();
				}
			}
			else if(pageAccess == rbac.FORBIDDEN){
				return res.forbidden();
			}
			else if(pageAccess == rbac.UNKNOWN_ROLE){
				return res.forbidden("Unknown Role");
			}
		}
		return next();
	}
	catch(err){
		return res.serverError();
	}
}

export default RbacMiddleWare;
