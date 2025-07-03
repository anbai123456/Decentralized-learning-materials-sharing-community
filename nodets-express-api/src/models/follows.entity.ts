
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'follows' })
export default class Follows extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("follows");
	}
	
	@PrimaryGeneratedColumn({name: 'follow_id'})
	follow_id: number

	@Column({name: 'follower_id' })
	follower_id: string
	
	@Column({name: 'followed_id' })
	followed_id: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"follow_id", 
			"follower_id", 
			"followed_id", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"follow_id", 
			"follower_id", 
			"followed_id", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"follow_id", 
			"follower_id", 
			"followed_id", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"follow_id", 
			"follower_id", 
			"followed_id", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"follow_id", 
			"follower_id", 
			"followed_id"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"follow_id LIKE :search", 
			"follower_id LIKE :search", 
			"followed_id LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


