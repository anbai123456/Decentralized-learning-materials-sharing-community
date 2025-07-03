
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'tags' })
export default class Tags extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("tags");
	}
	
	@PrimaryGeneratedColumn({name: 'tag_id'})
	tag_id: number

	@Column({name: 'name' })
	name: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"tag_id", 
			"name", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"tag_id", 
			"name", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"tag_id", 
			"name", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"tag_id", 
			"name", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"tag_id", 
			"name"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"tag_id LIKE :search", 
			"name LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


