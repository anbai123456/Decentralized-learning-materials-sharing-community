
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Fans extends BaseModel {
	static init() {
		return super.init(
			{
				
				fans_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				followee_user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				follower_user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				follow_time: { type:Sequelize.DATE , allowNull: false  },
				ismutualfollow: { type:Sequelize.STRING   }
			}, 
			{ 
				sequelize,
				
				tableName: "fans",
				modelName: "fans",
			}
		);
	}
	
	static listFields() {
		return [
			'fans_id', 
			'followee_user_id', 
			'follower_user_id', 
			'follow_time', 
			Sequelize.literal('isMutualFollow AS ismutualfollow')
		];
	}

	static viewFields() {
		return [
			'fans_id', 
			'followee_user_id', 
			'follower_user_id', 
			'follow_time', 
			Sequelize.literal('isMutualFollow AS ismutualfollow')
		];
	}

	static editFields() {
		return [
			'fans_id', 
			'followee_user_id', 
			'follower_user_id', 
			Sequelize.literal('isMutualFollow AS ismutualfollow')
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("fans_id LIKE :search"), 
			Sequelize.literal("isMutualFollow LIKE :search"),
		];
	}

	
	
}
Fans.init();
export default Fans;
