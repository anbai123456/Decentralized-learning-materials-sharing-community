
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'notifications' })
export default class Notifications extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("notifications");
	}
	
	@PrimaryGeneratedColumn({name: 'notification_id'})
	notification_id: number

	@Column({name: 'user_id' })
	user_id: string
	
	@Column({name: 'type' })
	type: string
	
	@Column({name: 'content' })
	content: string
	
	@Column({name: 'is_read' })
	is_read: number
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"notification_id", 
			"user_id", 
			"type", 
			"content", 
			"is_read", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"notification_id", 
			"user_id", 
			"type", 
			"content", 
			"is_read", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"notification_id", 
			"user_id", 
			"type", 
			"content", 
			"is_read", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"notification_id", 
			"user_id", 
			"type", 
			"content", 
			"is_read", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"notification_id", 
			"user_id", 
			"type", 
			"content", 
			"is_read"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"notification_id LIKE :search", 
			"user_id LIKE :search", 
			"content LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


