
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class MLikes extends BaseModel {
	static init() {
		return super.init(
			{
				
				like_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				multimedia_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				liked_at: { type:Sequelize.DATE , allowNull: false  }
			}, 
			{ 
				sequelize,
				
				tableName: "m_likes",
				modelName: "m_likes",
			}
		);
	}
	
	static listFields() {
		return [
			'like_id', 
			'user_id', 
			'multimedia_id', 
			'liked_at'
		];
	}

	static viewFields() {
		return [
			'like_id', 
			'user_id', 
			'multimedia_id', 
			'liked_at'
		];
	}

	static editFields() {
		return [
			'user_id', 
			'multimedia_id', 
			'like_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("like_id LIKE :search"),
		];
	}

	
	
}
MLikes.init();
export default MLikes;
