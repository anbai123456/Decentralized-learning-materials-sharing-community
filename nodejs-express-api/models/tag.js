
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Tag extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				tag: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "tag",
				modelName: "tag",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'tag'
		];
	}

	static viewFields() {
		return [
			'id', 
			'tag'
		];
	}

	static editFields() {
		return [
			'tag', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("tag LIKE :search"),
		];
	}

	
	
}
Tag.init();
export default Tag;
