
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'user_wallets' })
export default class UserWallets extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("user_wallets");
	}
	
	@PrimaryGeneratedColumn({name: 'wallet_id'})
	wallet_id: number

	@Column({name: 'user_id' })
	user_id: string
	
	@Column({name: 'wallet_address' })
	wallet_address: string
	
	@Column({name: 'balance' })
	balance: number
	
	@Column({name: 'last_updated' })
	last_updated: string
	
	
	
	
	static listFields(): string[]{
		return [
			"wallet_id", 
			"user_id", 
			"wallet_address", 
			"balance", 
			"last_updated"
		];
	}

	static exportListFields(): string[]{
		return [
			"wallet_id", 
			"user_id", 
			"wallet_address", 
			"balance", 
			"last_updated"
		];
	}

	static viewFields(): string[]{
		return [
			"wallet_id", 
			"user_id", 
			"wallet_address", 
			"balance", 
			"last_updated"
		];
	}

	static exportViewFields(): string[]{
		return [
			"wallet_id", 
			"user_id", 
			"wallet_address", 
			"balance", 
			"last_updated"
		];
	}

	static editFields(): string[]{
		return [
			"wallet_id", 
			"user_id", 
			"wallet_address", 
			"balance"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"wallet_id LIKE :search", 
			"user_id LIKE :search", 
			"wallet_address LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


