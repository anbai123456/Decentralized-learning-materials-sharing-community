
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Notification extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				title: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				content: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				publish_flag: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				publish_date: { type:Sequelize.DATE  ,defaultValue: Sequelize.literal('DEFAULT') },
				top: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				classification: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "notification",
				modelName: "notification",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'title', 
			'content', 
			'publish_flag', 
			'publish_date', 
			'top', 
			'classification'
		];
	}

	static viewFields() {
		return [
			'id', 
			'title', 
			'content', 
			'publish_flag', 
			'publish_date', 
			'top', 
			'classification'
		];
	}

	static editFields() {
		return [
			'id', 
			'title', 
			'content', 
			'publish_flag', 
			'publish_date', 
			'top', 
			'classification'
		];
	}

	static loginpagelistFields() {
		return [
			'classification', 
			'title', 
			'content', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("title LIKE :search"), 
			Sequelize.literal("content LIKE :search"), 
			Sequelize.literal("classification LIKE :search"),
		];
	}

	
	
}
Notification.init();
export default Notification;
