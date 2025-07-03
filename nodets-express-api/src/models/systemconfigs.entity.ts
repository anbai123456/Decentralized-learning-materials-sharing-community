
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'system_configs' })
export default class SystemConfigs extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("system_configs");
	}
	
	@PrimaryGeneratedColumn({name: 'config_id'})
	config_id: number

	@Column({name: 'config_key' })
	config_key: string
	
	@Column({name: 'config_value' })
	config_value: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	@Column({name: 'updated_at' })
	updated_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"config_id", 
			"config_key", 
			"config_value", 
			"created_at", 
			"updated_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"config_id", 
			"config_key", 
			"config_value", 
			"created_at", 
			"updated_at"
		];
	}

	static viewFields(): string[]{
		return [
			"config_id", 
			"config_key", 
			"config_value", 
			"created_at", 
			"updated_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"config_id", 
			"config_key", 
			"config_value", 
			"created_at", 
			"updated_at"
		];
	}

	static editFields(): string[]{
		return [
			"config_id", 
			"config_key", 
			"config_value"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"config_id LIKE :search", 
			"config_key LIKE :search", 
			"config_value LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


