
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class MCollect extends BaseModel {
	static init() {
		return super.init(
			{
				
				collect_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				multimedia_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				collect_at: { type:Sequelize.DATE , allowNull: false  }
			}, 
			{ 
				sequelize,
				
				tableName: "m_collect",
				modelName: "m_collect",
			}
		);
	}
	
	static listFields() {
		return [
			'collect_id', 
			'user_id', 
			'multimedia_id', 
			'collect_at'
		];
	}

	static viewFields() {
		return [
			'collect_id', 
			'user_id', 
			'multimedia_id', 
			'collect_at'
		];
	}

	static editFields() {
		return [
			'multimedia_id', 
			'collect_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("collect_id LIKE :search"),
		];
	}

	
	
}
MCollect.init();
export default MCollect;
