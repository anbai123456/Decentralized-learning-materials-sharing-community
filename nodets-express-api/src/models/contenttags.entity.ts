
import { Entity, PrimaryColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'content_tags' })
export default class ContentTags extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("content_tags");
	}
	
	@PrimaryColumn({name: 'content_id'})
	content_id: string

	@PrimaryColumn({name: 'tag_id'})
	tag_id: number

	
	
	
	static listFields(): string[]{
		return [
			"content_id", 
			"tag_id"
		];
	}

	static exportListFields(): string[]{
		return [
			"content_id", 
			"tag_id"
		];
	}

	static viewFields(): string[]{
		return [
			"content_id", 
			"tag_id"
		];
	}

	static exportViewFields(): string[]{
		return [
			"content_id", 
			"tag_id"
		];
	}

	static editFields(): string[]{
		return [
			"content_id", 
			"tag_id"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"content_id LIKE :search", 
			"tag_id LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


