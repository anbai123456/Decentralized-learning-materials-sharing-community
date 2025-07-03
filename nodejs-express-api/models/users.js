
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Users extends BaseModel {
	static init() {
		return super.init(
			{
				
				user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				username: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				email: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				bio: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE   },
				updated_at: { type:Sequelize.DATE   },
				password: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				tele: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				photo: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				user_role_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_created: { type:Sequelize.DATE   },
				date_updated: { type:Sequelize.DATE   },
				followers_count: { type:Sequelize.INTEGER   },
				following_count: { type:Sequelize.INTEGER   }
			}, 
			{ 
				sequelize,
				
				tableName: "users",
				modelName: "users",timestamps:true,
				createdAt: 'date_updated',updatedAt: 'date_created',
				
			}
		);
	}
	
	static listFields() {
		return [
			'user_id', 
			'username', 
			'email', 
			'bio', 
			'created_at', 
			'updated_at', 
			'tele', 
			'photo', 
			'user_role_id', 
			'date_created', 
			'date_updated', 
			'followers_count', 
			'following_count'
		];
	}

	static viewFields() {
		return [
			'user_id', 
			'username', 
			'email', 
			'bio', 
			'created_at', 
			'updated_at', 
			'tele', 
			'user_role_id', 
			'date_created', 
			'date_updated', 
			'followers_count', 
			'following_count'
		];
	}

	static accounteditFields() {
		return [
			'user_id', 
			'username', 
			'bio', 
			'tele', 
			'photo', 
			'user_role_id', 
			'followers_count', 
			'following_count'
		];
	}

	static accountviewFields() {
		return [
			'user_id', 
			'username', 
			'email', 
			'bio', 
			'created_at', 
			'updated_at', 
			'tele', 
			'user_role_id', 
			'date_created', 
			'date_updated', 
			'followers_count', 
			'following_count'
		];
	}

	static editFields() {
		return [
			'user_id', 
			'username', 
			'bio', 
			'tele', 
			'photo', 
			'user_role_id', 
			'followers_count', 
			'following_count'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("user_id LIKE :search"), 
			Sequelize.literal("username LIKE :search"), 
			Sequelize.literal("email LIKE :search"), 
			Sequelize.literal("bio LIKE :search"),
		];
	}

	
	
}
Users.init();
export default Users;
