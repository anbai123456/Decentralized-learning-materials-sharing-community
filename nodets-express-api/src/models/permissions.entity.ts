
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'permissions' })
export default class Permissions extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("permissions");
	}
	
	@PrimaryGeneratedColumn({name: 'permission_id'})
	permission_id: number

	@Column({name: 'permission' })
	permission: string
	
	@Column({name: 'role_id' })
	role_id: number
	
	
	
	
	static listFields(): string[]{
		return [
			"permission_id", 
			"permission", 
			"role_id"
		];
	}

	static exportListFields(): string[]{
		return [
			"permission_id", 
			"permission", 
			"role_id"
		];
	}

	static viewFields(): string[]{
		return [
			"permission_id", 
			"permission", 
			"role_id"
		];
	}

	static exportViewFields(): string[]{
		return [
			"permission_id", 
			"permission", 
			"role_id"
		];
	}

	static editFields(): string[]{
		return [
			"permission_id", 
			"permission", 
			"role_id"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"permission_id LIKE :search", 
			"permission LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


