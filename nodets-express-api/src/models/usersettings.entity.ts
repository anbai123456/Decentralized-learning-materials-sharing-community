
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'user_settings' })
export default class UserSettings extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("user_settings");
	}
	
	@PrimaryGeneratedColumn({name: 'setting_id'})
	setting_id: number

	@Column({name: 'user_id' })
	user_id: string
	
	@Column({name: 'setting_key' })
	setting_key: string
	
	@Column({name: 'setting_value' })
	setting_value: string
	
	
	
	
	static listFields(): string[]{
		return [
			"setting_id", 
			"user_id", 
			"setting_key", 
			"setting_value"
		];
	}

	static exportListFields(): string[]{
		return [
			"setting_id", 
			"user_id", 
			"setting_key", 
			"setting_value"
		];
	}

	static viewFields(): string[]{
		return [
			"setting_id", 
			"user_id", 
			"setting_key", 
			"setting_value"
		];
	}

	static exportViewFields(): string[]{
		return [
			"setting_id", 
			"user_id", 
			"setting_key", 
			"setting_value"
		];
	}

	static editFields(): string[]{
		return [
			"setting_id", 
			"user_id", 
			"setting_key", 
			"setting_value"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"setting_id LIKE :search", 
			"user_id LIKE :search", 
			"setting_key LIKE :search", 
			"setting_value LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


