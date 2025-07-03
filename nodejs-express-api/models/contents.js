
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Contents extends BaseModel {
	static init() {
		return super.init(
			{
				
				content_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				content_type: { type:Sequelize.ENUM('post','comment','share')   },
				body: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE , allowNull: false  },
				updated_at: { type:Sequelize.DATE   },
				blocknum: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				tx_hash: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				tag: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				timestamp: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "contents",
				modelName: "contents",
			}
		);
	}
	
	static listFields() {
		return [
			'content_id', 
			Sequelize.literal('`users`.`username` AS `users_username`'), 
			'user_id', 
			'content_type', 
			'tag', 
			'body', 
			'blocknum', 
			'tx_hash', 
			'timestamp'
		];
	}

	static viewFields() {
		return [
			'content_id', 
			'user_id', 
			'content_type', 
			'created_at', 
			'updated_at', 
			'blocknum', 
			'tx_hash', 
			'tag', 
			'body', 
			'timestamp'
		];
	}

	static editFields() {
		return [
			'content_id', 
			'content_type', 
			'tag', 
			'blocknum', 
			'tx_hash', 
			'body'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("content_id LIKE :search"), 
			Sequelize.literal("tag LIKE :search"), 
			Sequelize.literal("tx_hash LIKE :search"), 
			Sequelize.literal("timestamp LIKE :search"),
		];
	}

	
	
}
Contents.init();
export default Contents;
