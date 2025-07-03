
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'smart_contract_events' })
export default class SmartContractEvents extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("smart_contract_events");
	}
	
	@PrimaryGeneratedColumn({name: 'event_id'})
	event_id: number

	@Column({name: 'contract_address' })
	contract_address: string
	
	@Column({name: 'event_name' })
	event_name: string
	
	@Column({name: 'event_data' })
	event_data: string
	
	@Column({name: 'block_number' })
	block_number: number
	
	@Column({name: 'transaction_hash' })
	transaction_hash: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"event_id", 
			"contract_address", 
			"event_name", 
			"event_data", 
			"block_number", 
			"transaction_hash", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"event_id", 
			"contract_address", 
			"event_name", 
			"event_data", 
			"block_number", 
			"transaction_hash", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"event_id", 
			"contract_address", 
			"event_name", 
			"event_data", 
			"block_number", 
			"transaction_hash", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"event_id", 
			"contract_address", 
			"event_name", 
			"event_data", 
			"block_number", 
			"transaction_hash", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"event_id", 
			"contract_address", 
			"event_name", 
			"event_data", 
			"block_number", 
			"transaction_hash"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"event_id LIKE :search", 
			"contract_address LIKE :search", 
			"event_name LIKE :search", 
			"transaction_hash LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


