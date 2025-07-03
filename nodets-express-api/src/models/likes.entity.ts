
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'likes' })
export default class Likes extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("likes");
	}
	
	@PrimaryGeneratedColumn({name: 'like_id'})
	like_id: number

	@Column({name: 'user_id' })
	user_id: number
	
	@Column({name: 'content_id' })
	content_id: number
	
	@Column({name: 'liked_at' })
	liked_at: string
	
	@Column({name: 'liked_count' })
	liked_count: number
	
	
	
	
	static listFields(): string[]{
		return [
			"like_id", 
			"user_id", 
			"content_id", 
			"liked_at", 
			"liked_count"
		];
	}

	static exportListFields(): string[]{
		return [
			"like_id", 
			"user_id", 
			"content_id", 
			"liked_at", 
			"liked_count"
		];
	}

	static viewFields(): string[]{
		return [
			"like_id", 
			"user_id", 
			"content_id", 
			"liked_at", 
			"liked_count"
		];
	}

	static exportViewFields(): string[]{
		return [
			"like_id", 
			"user_id", 
			"content_id", 
			"liked_at", 
			"liked_count"
		];
	}

	static editFields(): string[]{
		return [
			"user_id", 
			"content_id", 
			"liked_count", 
			"like_id"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"like_id LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


