
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class MultimediaReplyReply extends BaseModel {
	static init() {
		return super.init(
			{
				
				reply_reply_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				reply_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				reply_reply_multimedia: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "multimedia_reply_reply",
				modelName: "multimedia_reply_reply",
			}
		);
	}
	
	static listFields() {
		return [
			'reply_reply_id', 
			'reply_id', 
			'reply_reply_multimedia', 
			'user_id'
		];
	}

	static viewFields() {
		return [
			'reply_reply_id', 
			'reply_id', 
			'reply_reply_multimedia', 
			'user_id'
		];
	}

	static editFields() {
		return [
			'reply_id', 
			'reply_reply_multimedia', 
			'reply_reply_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("reply_reply_id LIKE :search"), 
			Sequelize.literal("reply_reply_multimedia LIKE :search"),
		];
	}

	
	
}
MultimediaReplyReply.init();
export default MultimediaReplyReply;
