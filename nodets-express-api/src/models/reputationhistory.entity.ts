
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'reputation_history' })
export default class ReputationHistory extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("reputation_history");
	}
	
	@PrimaryGeneratedColumn({name: 'history_id'})
	history_id: number

	@Column({name: 'user_id' })
	user_id: string
	
	@Column({name: 'change_amount' })
	change_amount: number
	
	@Column({name: 'reason' })
	reason: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"history_id", 
			"user_id", 
			"change_amount", 
			"reason", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"history_id", 
			"user_id", 
			"change_amount", 
			"reason", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"history_id", 
			"user_id", 
			"change_amount", 
			"reason", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"history_id", 
			"user_id", 
			"change_amount", 
			"reason", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"history_id", 
			"user_id", 
			"change_amount", 
			"reason"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"history_id LIKE :search", 
			"user_id LIKE :search", 
			"reason LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


