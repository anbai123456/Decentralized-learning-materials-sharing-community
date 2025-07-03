
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'content_encryption_keys' })
export default class ContentEncryptionKeys extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("content_encryption_keys");
	}
	
	@PrimaryGeneratedColumn({name: 'key_id'})
	key_id: number

	@Column({name: 'content_id' })
	content_id: string
	
	@Column({name: 'encrypted_key' })
	encrypted_key: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"key_id", 
			"content_id", 
			"encrypted_key", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"key_id", 
			"content_id", 
			"encrypted_key", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"key_id", 
			"content_id", 
			"encrypted_key", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"key_id", 
			"content_id", 
			"encrypted_key", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"key_id", 
			"content_id", 
			"encrypted_key"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"key_id LIKE :search", 
			"content_id LIKE :search", 
			"encrypted_key LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


