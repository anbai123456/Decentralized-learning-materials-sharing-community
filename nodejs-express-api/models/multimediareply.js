
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class MultimediaReply extends BaseModel {
	static init() {
		return super.init(
			{
				
				reply_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				multimedia_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				reply_multimedia: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "multimedia_reply",
				modelName: "multimedia_reply",
			}
		);
	}
	
	static listFields() {
		return [
			'reply_id', 
			'user_id', 
			'multimedia_id', 
			'reply_multimedia'
		];
	}

	static viewFields() {
		return [
			'reply_id', 
			'user_id', 
			'multimedia_id', 
			'reply_multimedia'
		];
	}

	static editFields() {
		return [
			'multimedia_id', 
			'reply_multimedia', 
			'reply_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("reply_id LIKE :search"), 
			Sequelize.literal("reply_multimedia LIKE :search"),
		];
	}

	
	
}
MultimediaReply.init();
export default MultimediaReply;
