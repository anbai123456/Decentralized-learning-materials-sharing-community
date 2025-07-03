
import { Sequelize, sequelize } from './basemodel.js';

// Override timezone formatting
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
	return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss');
};

import Audits from './audits.js';
import CCollect from './ccollect.js';
import Contents from './contents.js';
import ContentsLikes from './contentslikes.js';
import ContentsReply from './contentsreply.js';
import ContentsReplyReply from './contentsreplyreply.js';
import CStart from './cstart.js';
import Fans from './fans.js';
import Follows from './follows.js';
import MCollect from './mcollect.js';
import MLikes from './mlikes.js';
import Multimedia from './multimedia.js';
import MultimediaReply from './multimediareply.js';
import MultimediaReplyReply from './multimediareplyreply.js';
import Notification from './notification.js';
import Permissions from './permissions.js';
import Roles from './roles.js';
import Tag from './tag.js';
import UserAuthentications from './userauthentications.js';
import Users from './users.js';


Contents.belongsTo(Users, { foreignKey: 'user_id', as: 'users' });

ContentsLikes.belongsTo(Users, { foreignKey: 'user_id', as: 'users' });

ContentsReply.belongsTo(Users, { foreignKey: 'user_id', as: 'users' });

CStart.belongsTo(Users, { foreignKey: 'user_id', as: 'users' });

Multimedia.belongsTo(Users, { foreignKey: 'user_id', as: 'users' });


const op = Sequelize.Op;
const raw = Sequelize.literal; // use to include raw expression

const filterBy = function(expression, value){
	return sequelize.where(raw(expression), value);
}

// convinient functions for performing raw queries 
// return different value types

function rawQuery(queryText, options){
	return sequelize.query(queryText, options);
}

async function rawQueryList(queryText, queryParams){
	const records = await rawQuery(queryText, { replacements: queryParams, type: Sequelize.QueryTypes.SELECT });
	return records;
}

async function rawQueryOne(queryText, queryParams){
	const records = await rawQueryList(queryText, queryParams);
	return records[0] || null;
}

async function rawQueryValue(queryText, queryParams){
	const record = await rawQueryOne(queryText, queryParams);
	if(record){
		return Object.values(record)[0];
	}
	return null;
}

function getOrderBy(req, sortField = null, sortType = 'desc'){
	const orderBy = req.query.orderby || sortField;
	const orderType = req.query.ordertype || sortType;
	if (orderBy) {
		let order = raw(`${orderBy} ${orderType}`);
		return [[order]];
	}
	return null;
}

export default {
	sequelize,
	op,
	filterBy,
	raw,
	rawQuery,
	rawQueryList,
	rawQueryOne,
	rawQueryValue,
	getOrderBy,
	Audits,
	CCollect,
	Contents,
	ContentsLikes,
	ContentsReply,
	ContentsReplyReply,
	CStart,
	Fans,
	Follows,
	MCollect,
	MLikes,
	Multimedia,
	MultimediaReply,
	MultimediaReplyReply,
	Notification,
	Permissions,
	Roles,
	Tag,
	UserAuthentications,
	Users
}
