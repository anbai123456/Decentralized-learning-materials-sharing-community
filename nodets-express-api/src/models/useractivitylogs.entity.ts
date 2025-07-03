
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'user_activity_logs' })
export default class UserActivityLogs extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("user_activity_logs");
	}
	
	@PrimaryGeneratedColumn({name: 'log_id'})
	log_id: number

	@Column({name: 'user_id' })
	user_id: string
	
	@Column({name: 'activity_type' })
	activity_type: string
	
	@Column({name: 'activity_data' })
	activity_data: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"log_id", 
			"user_id", 
			"activity_type", 
			"activity_data", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"log_id", 
			"user_id", 
			"activity_type", 
			"activity_data", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"log_id", 
			"user_id", 
			"activity_type", 
			"activity_data", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"log_id", 
			"user_id", 
			"activity_type", 
			"activity_data", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"log_id", 
			"user_id", 
			"activity_type", 
			"activity_data"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"log_id LIKE :search", 
			"user_id LIKE :search", 
			"activity_type LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


