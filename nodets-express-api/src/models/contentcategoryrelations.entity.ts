
import { Entity, PrimaryColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'content_category_relations' })
export default class ContentCategoryRelations extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("content_category_relations");
	}
	
	@PrimaryColumn({name: 'content_id'})
	content_id: string

	@PrimaryColumn({name: 'category_id'})
	category_id: number

	
	
	
	static listFields(): string[]{
		return [
			"content_id", 
			"category_id"
		];
	}

	static exportListFields(): string[]{
		return [
			"content_id", 
			"category_id"
		];
	}

	static viewFields(): string[]{
		return [
			"content_id", 
			"category_id"
		];
	}

	static exportViewFields(): string[]{
		return [
			"content_id", 
			"category_id"
		];
	}

	static editFields(): string[]{
		return [
			"content_id", 
			"category_id"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"content_id LIKE :search", 
			"category_id LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


