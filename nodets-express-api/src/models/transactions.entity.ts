
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'transactions' })
export default class Transactions extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("transactions");
	}
	
	@PrimaryGeneratedColumn({name: 'transaction_id'})
	transaction_id: number

	@Column({name: 'from_user_id' })
	from_user_id: string
	
	@Column({name: 'to_user_id' })
	to_user_id: string
	
	@Column({name: 'amount' })
	amount: number
	
	@Column({name: 'transaction_type' })
	transaction_type: string
	
	@Column({name: 'status' })
	status: string
	
	@Column({name: 'blockchain_tx' })
	blockchain_tx: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"transaction_id", 
			"from_user_id", 
			"to_user_id", 
			"amount", 
			"transaction_type", 
			"status", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"transaction_id", 
			"from_user_id", 
			"to_user_id", 
			"amount", 
			"transaction_type", 
			"status", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"transaction_id", 
			"from_user_id", 
			"to_user_id", 
			"amount", 
			"transaction_type", 
			"status", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"transaction_id", 
			"from_user_id", 
			"to_user_id", 
			"amount", 
			"transaction_type", 
			"status", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"transaction_id", 
			"from_user_id", 
			"to_user_id", 
			"amount", 
			"transaction_type", 
			"status", 
			"blockchain_tx"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"transaction_id LIKE :search", 
			"from_user_id LIKE :search", 
			"to_user_id LIKE :search", 
			"blockchain_tx LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


