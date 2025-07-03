
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'content_versions' })
export default class ContentVersions extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("content_versions");
	}
	
	@PrimaryGeneratedColumn({name: 'version_id'})
	version_id: number

	@Column({name: 'content_id' })
	content_id: string
	
	@Column({name: 'body' })
	body: string
	
	@Column({name: 'media_hash' })
	media_hash: string
	
	@Column({name: 'ipfs_hash' })
	ipfs_hash: string
	
	@Column({name: 'blockchain_tx' })
	blockchain_tx: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"version_id", 
			"content_id", 
			"body", 
			"media_hash", 
			"ipfs_hash", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"version_id", 
			"content_id", 
			"body", 
			"media_hash", 
			"ipfs_hash", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static viewFields(): string[]{
		return [
			"version_id", 
			"content_id", 
			"body", 
			"media_hash", 
			"ipfs_hash", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"version_id", 
			"content_id", 
			"body", 
			"media_hash", 
			"ipfs_hash", 
			"blockchain_tx", 
			"created_at"
		];
	}

	static editFields(): string[]{
		return [
			"version_id", 
			"content_id", 
			"body", 
			"media_hash", 
			"ipfs_hash", 
			"blockchain_tx"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"version_id LIKE :search", 
			"content_id LIKE :search", 
			"body LIKE :search", 
			"media_hash LIKE :search", 
			"ipfs_hash LIKE :search", 
			"blockchain_tx LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


