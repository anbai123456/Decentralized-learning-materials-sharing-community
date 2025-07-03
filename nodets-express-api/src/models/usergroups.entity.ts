
import { Entity, PrimaryColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'user_groups' })
export default class UserGroups extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("user_groups");
	}
	
	@PrimaryColumn({name: 'group_id'})
	group_id: string

	@Column({name: 'name' })
	name: string
	
	@Column({name: 'description' })
	description: string
	
	@Column({name: 'creator_id' })
	creator_id: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	@Column({name: 'updated_at' })
	updated_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"group_id", 
			"name", 
			"description", 
			"creator_id", 
			"created_at", 
			"updated_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"group_id", 
			"name", 
			"description", 
			"creator_id", 
			"created_at", 
			"updated_at"
		];
	}

	static viewFields(): string[]{
		return [
			"group_id", 
			"name", 
			"description", 
			"creator_id", 
			"created_at", 
			"updated_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"group_id", 
			"name", 
			"description", 
			"creator_id", 
			"created_at", 
			"updated_at"
		];
	}

	static editFields(): string[]{
		return [
			"group_id", 
			"name", 
			"description", 
			"creator_id"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"group_id LIKE :search", 
			"name LIKE :search", 
			"description LIKE :search", 
			"creator_id LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


