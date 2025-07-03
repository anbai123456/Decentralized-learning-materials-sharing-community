
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class ContentsReplyReply extends BaseModel {
	static init() {
		return super.init(
			{
				
				reply_reply_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				reply_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				reply_reply_content: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "contents_reply_reply",
				modelName: "contents_reply_reply",
			}
		);
	}
	
	static listFields() {
		return [
			'reply_reply_id', 
			'reply_id', 
			'user_id', 
			'reply_reply_content'
		];
	}

	static viewFields() {
		return [
			'reply_reply_id', 
			'reply_id', 
			'user_id', 
			'reply_reply_content'
		];
	}

	static editFields() {
		return [
			'reply_reply_id', 
			'reply_id', 
			'reply_reply_content'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("reply_reply_id LIKE :search"), 
			Sequelize.literal("reply_reply_content LIKE :search"),
		];
	}

	
	
}
ContentsReplyReply.init();
export default ContentsReplyReply;
