
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'bookmarks' })
export default class Bookmarks extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("bookmarks");
	}
	
	@PrimaryGeneratedColumn({name: 'bookmark_id'})
	bookmark_id: number

	@Column({name: 'user_id' })
	user_id: string
	
	@Column({name: 'content_id' })
	content_id: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"bookmark_id", 
			"user_id", 
			"content_id", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"bookmark_id", 
			"user_id", 
			"content_id", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"bookmark_id", 
			"user_id", 
			"content_id", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"bookmark_id", 
			"user_id", 
			"content_id", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"bookmark_id", 
			"user_id", 
			"content_id"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"bookmark_id LIKE :search", 
			"user_id LIKE :search", 
			"content_id LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


