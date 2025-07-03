
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'content_categories' })
export default class ContentCategories extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("content_categories");
	}
	
	@PrimaryGeneratedColumn({name: 'category_id'})
	category_id: number

	@Column({name: 'name' })
	name: string
	
	@Column({name: 'description' })
	description: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"category_id", 
			"name", 
			"description", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"category_id", 
			"name", 
			"description", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"category_id", 
			"name", 
			"description", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"category_id", 
			"name", 
			"description", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"category_id", 
			"name", 
			"description"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"category_id LIKE :search", 
			"name LIKE :search", 
			"description LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


