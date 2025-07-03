
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Multimedia extends BaseModel {
	static init() {
		return super.init(
			{
				
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				image_file: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				video_file: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				doc_file: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				description: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				multimedia_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				tag: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				learntime: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE   },
				updated_at: { type:Sequelize.DATE   }
			}, 
			{ 
				sequelize,
				
				tableName: "multimedia",
				modelName: "multimedia",
			}
		);
	}
	
	static listFields() {
		return [
			'multimedia_id', 
			Sequelize.literal('`users`.`username` AS `users_username`'), 
			'user_id', 
			'image_file', 
			'video_file', 
			'doc_file', 
			'description', 
			'tag', 
			'learntime'
		];
	}

	static viewFields() {
		return [
			'user_id', 
			'image_file', 
			'video_file', 
			'doc_file', 
			'description', 
			'multimedia_id', 
			'tag', 
			'learntime', 
			'created_at', 
			'updated_at'
		];
	}

	static editFields() {
		return [
			'tag', 
			'description', 
			'image_file', 
			'video_file', 
			'doc_file', 
			'learntime', 
			'created_at', 
			'updated_at', 
			'multimedia_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("multimedia_id LIKE :search"), 
			Sequelize.literal("description LIKE :search"), 
			Sequelize.literal("tag LIKE :search"),
		];
	}

	
	
}
Multimedia.init();
export default Multimedia;
