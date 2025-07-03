
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'roles' })
export default class Roles extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("roles");
	}
	
	@PrimaryGeneratedColumn({name: 'role_id'})
	role_id: number

	@Column({name: 'role_name' })
	role_name: string
	
	
	
	
	static listFields(): string[]{
		return [
			"role_id", 
			"role_name"
		];
	}

	static exportListFields(): string[]{
		return [
			"role_id", 
			"role_name"
		];
	}

	static viewFields(): string[]{
		return [
			"role_id", 
			"role_name"
		];
	}

	static exportViewFields(): string[]{
		return [
			"role_id", 
			"role_name"
		];
	}

	static editFields(): string[]{
		return [
			"role_id", 
			"role_name"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"role_id LIKE :search", 
			"role_name LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


