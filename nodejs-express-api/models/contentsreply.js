
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class ContentsReply extends BaseModel {
	static init() {
		return super.init(
			{
				
				reply_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				content_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				reply_content: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "contents_reply",
				modelName: "contents_reply",
			}
		);
	}
	
	static listFields() {
		return [
			'reply_id', 
			'content_id', 
			Sequelize.literal('`users`.`username` AS `users_username`'), 
			'user_id', 
			'reply_content'
		];
	}

	static viewFields() {
		return [
			'reply_id', 
			'content_id', 
			'user_id', 
			'reply_content'
		];
	}

	static editFields() {
		return [
			'content_id', 
			'reply_content', 
			'reply_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("reply_id LIKE :search"), 
			Sequelize.literal("reply_content LIKE :search"),
		];
	}

	
	
}
ContentsReply.init();
export default ContentsReply;
