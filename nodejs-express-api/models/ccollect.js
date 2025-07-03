
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class CCollect extends BaseModel {
	static init() {
		return super.init(
			{
				
				collect_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				content_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				collect_at: { type:Sequelize.DATE , allowNull: false  }
			}, 
			{ 
				sequelize,
				
				tableName: "c_collect",
				modelName: "c_collect",
			}
		);
	}
	
	static listFields() {
		return [
			'collect_id', 
			'user_id', 
			'content_id', 
			'collect_at'
		];
	}

	static viewFields() {
		return [
			'collect_id', 
			'user_id', 
			'content_id', 
			'collect_at'
		];
	}

	static editFields() {
		return [
			'user_id', 
			'content_id', 
			'collect_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("collect_id LIKE :search"),
		];
	}

	
	
}
CCollect.init();
export default CCollect;
