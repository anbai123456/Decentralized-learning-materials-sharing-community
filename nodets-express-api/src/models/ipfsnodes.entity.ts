
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'ipfs_nodes' })
export default class IpfsNodes extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("ipfs_nodes");
	}
	
	@PrimaryGeneratedColumn({name: 'node_id'})
	node_id: number

	@Column({name: 'node_address' })
	node_address: string
	
	@Column({name: 'status' })
	status: string
	
	@Column({name: 'last_seen' })
	last_seen: string
	
	
	
	
	static listFields(): string[]{
		return [
			"node_id", 
			"node_address", 
			"status", 
			"last_seen"
		];
	}

	static exportListFields(): string[]{
		return [
			"node_id", 
			"node_address", 
			"status", 
			"last_seen"
		];
	}

	static viewFields(): string[]{
		return [
			"node_id", 
			"node_address", 
			"status", 
			"last_seen"
		];
	}

	static exportViewFields(): string[]{
		return [
			"node_id", 
			"node_address", 
			"status", 
			"last_seen"
		];
	}

	static editFields(): string[]{
		return [
			"node_id", 
			"node_address", 
			"status"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"node_id LIKE :search", 
			"node_address LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


