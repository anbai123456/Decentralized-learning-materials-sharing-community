
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class ContentsLikes extends BaseModel {
	static init() {
		return super.init(
			{
				
				like_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				content_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				liked_at: { type:Sequelize.DATE , allowNull: false  }
			}, 
			{ 
				sequelize,
				
				tableName: "contents_likes",
				modelName: "contents_likes",
			}
		);
	}
	
	static listFields() {
		return [
			'like_id', 
			Sequelize.literal('`users`.`username` AS `users_username`'), 
			'user_id', 
			'content_id', 
			'liked_at'
		];
	}

	static viewFields() {
		return [
			'like_id', 
			'user_id', 
			'content_id', 
			'liked_at'
		];
	}

	static editFields() {
		return [
			'user_id', 
			'content_id', 
			'like_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("like_id LIKE :search"),
		];
	}

	
	
}
ContentsLikes.init();
export default ContentsLikes;
