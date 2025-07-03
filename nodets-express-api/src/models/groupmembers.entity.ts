
import { Entity, PrimaryColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'group_members' })
export default class GroupMembers extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("group_members");
	}
	
	@PrimaryColumn({name: 'group_id'})
	group_id: string

	@PrimaryColumn({name: 'user_id'})
	user_id: string

	@Column({name: 'role' })
	role: string
	
	@Column({name: 'joined_at' })
	joined_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"group_id", 
			"user_id", 
			"role", 
			"joined_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"group_id", 
			"user_id", 
			"role", 
			"joined_at"
		];
	}

	static viewFields(): string[]{
		return [
			"group_id", 
			"user_id", 
			"role", 
			"joined_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"group_id", 
			"user_id", 
			"role", 
			"joined_at"
		];
	}

	static editFields(): string[]{
		return [
			"group_id", 
			"user_id", 
			"role"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"group_id LIKE :search", 
			"user_id LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


