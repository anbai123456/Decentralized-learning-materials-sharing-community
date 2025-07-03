
import { Entity, PrimaryColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'messages' })
export default class Messages extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("messages");
	}
	
	@PrimaryColumn({name: 'message_id'})
	message_id: string

	@Column({name: 'sender_id' })
	sender_id: string
	
	@Column({name: 'receiver_id' })
	receiver_id: string
	
	@Column({name: 'encrypted_content' })
	encrypted_content: string
	
	@Column({name: 'ipfs_hash' })
	ipfs_hash: string
	
	@Column({name: 'blockchain_tx' })
	blockchain_tx: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"message_id", 
			"sender_id", 
			"receiver_id", 
			"encrypted_content", 
			"ipfs_hash", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"message_id", 
			"sender_id", 
			"receiver_id", 
			"encrypted_content", 
			"ipfs_hash", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"message_id", 
			"sender_id", 
			"receiver_id", 
			"encrypted_content", 
			"ipfs_hash", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"message_id", 
			"sender_id", 
			"receiver_id", 
			"encrypted_content", 
			"ipfs_hash", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"message_id", 
			"sender_id", 
			"receiver_id", 
			"encrypted_content", 
			"ipfs_hash", 
			"blockchain_tx"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"message_id LIKE :search", 
			"sender_id LIKE :search", 
			"receiver_id LIKE :search", 
			"encrypted_content LIKE :search", 
			"ipfs_hash LIKE :search", 
			"blockchain_tx LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


