
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Follows extends BaseModel {
	static init() {
		return super.init(
			{
				
				follows_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				followee_user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				follower_user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				follow_time: { type:Sequelize.DATE , allowNull: false  }
			}, 
			{ 
				sequelize,
				
				tableName: "follows",
				modelName: "follows",
			}
		);
	}
	
	static listFields() {
		return [
			'follows_id', 
			'followee_user_id', 
			'follower_user_id', 
			'follow_time'
		];
	}

	static viewFields() {
		return [
			'follows_id', 
			'followee_user_id', 
			'follower_user_id', 
			'follow_time'
		];
	}

	static editFields() {
		return [
			'followee_user_id', 
			'follower_user_id', 
			'follows_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("follows_id LIKE :search"),
		];
	}

	
	
}
Follows.init();
export default Follows;
