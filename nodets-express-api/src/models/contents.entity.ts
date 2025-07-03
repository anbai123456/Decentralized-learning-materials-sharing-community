
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'contents' })
export default class Contents extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("contents");
	}
	
	@PrimaryGeneratedColumn({name: 'content_id'})
	content_id: number

	@Column({name: 'user_id' })
	user_id: number
	
	@Column({name: 'content_type' })
	content_type: string
	
	@Column({name: 'title' })
	title: string
	
	@Column({name: 'body' })
	body: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	@Column({name: 'updated_at' })
	updated_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"content_id", 
			"user_id", 
			"content_type", 
			"title", 
			"body", 
			"created_at", 
			"updated_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"content_id", 
			"user_id", 
			"content_type", 
			"title", 
			"body", 
			"created_at", 
			"updated_at"
		];
	}

	static viewFields(): string[]{
		return [
			"content_id", 
			"user_id", 
			"content_type", 
			"title", 
			"body", 
			"created_at", 
			"updated_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"content_id", 
			"user_id", 
			"content_type", 
			"title", 
			"body", 
			"created_at", 
			"updated_at"
		];
	}

	static editFields(): string[]{
		return [
			"content_id", 
			"user_id", 
			"content_type", 
			"title", 
			"body"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"content_id LIKE :search", 
			"title LIKE :search", 
			"body LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


