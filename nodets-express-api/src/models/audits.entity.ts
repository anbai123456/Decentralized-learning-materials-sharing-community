
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'audits' })
export default class Audits extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("audits");
	}
	
	@PrimaryGeneratedColumn({name: 'log_id'})
	log_id: number

	@Column({name: 'action' })
	action: string
	
	@Column({name: 'page' })
	page: string
	
	@Column({name: 'record_id' })
	record_id: string
	
	@Column({name: 'user_id' })
	user_id: string
	
	@Column({name: 'user_ip' })
	user_ip: string
	
	@Column({name: 'user_agent' })
	user_agent: string
	
	@Column({name: 'request_url' })
	request_url: string
	
	@Column({name: 'old_values' })
	old_values: string
	
	@Column({name: 'new_values' })
	new_values: string
	
	@Column({name: 'timestamp' })
	timestamp: string
	
	
	
	
	static listFields(): string[]{
		return [
			"log_id", 
			"action", 
			"page", 
			"record_id", 
			"user_id", 
			"user_ip", 
			"user_agent", 
			"request_url", 
			"old_values", 
			"new_values", 
			"timestamp"
		];
	}

	static exportListFields(): string[]{
		return [
			"log_id", 
			"action", 
			"page", 
			"record_id", 
			"user_id", 
			"user_ip", 
			"user_agent", 
			"request_url", 
			"old_values", 
			"new_values", 
			"timestamp"
		];
	}

	static viewFields(): string[]{
		return [
			"log_id", 
			"action", 
			"page", 
			"record_id", 
			"user_id", 
			"user_ip", 
			"user_agent", 
			"request_url", 
			"old_values", 
			"new_values", 
			"timestamp"
		];
	}

	static exportViewFields(): string[]{
		return [
			"log_id", 
			"action", 
			"page", 
			"record_id", 
			"user_id", 
			"user_ip", 
			"user_agent", 
			"request_url", 
			"old_values", 
			"new_values", 
			"timestamp"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"log_id LIKE :search", 
			"action LIKE :search", 
			"page LIKE :search", 
			"record_id LIKE :search", 
			"user_id LIKE :search", 
			"user_ip LIKE :search", 
			"user_agent LIKE :search", 
			"request_url LIKE :search", 
			"old_values LIKE :search", 
			"new_values LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


