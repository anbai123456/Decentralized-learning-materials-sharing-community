
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'user_authentications' })
export default class UserAuthentications extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("user_authentications");
	}
	
	@PrimaryGeneratedColumn({name: 'ua_id'})
	ua_id: number

	@Column({name: 'user_id' })
	user_id: string
	
	@Column({name: 'auth_type' })
	auth_type: string
	
	@Column({name: 'auth_id' })
	auth_id: string
	
	@Column({name: 'auth_data' })
	auth_data: string
	
	
	
	
	static listFields(): string[]{
		return [
			"ua_id", 
			"user_id", 
			"auth_type", 
			"auth_id", 
			"auth_data"
		];
	}

	static exportListFields(): string[]{
		return [
			"ua_id", 
			"user_id", 
			"auth_type", 
			"auth_id", 
			"auth_data"
		];
	}

	static viewFields(): string[]{
		return [
			"ua_id", 
			"user_id", 
			"auth_type", 
			"auth_id", 
			"auth_data"
		];
	}

	static exportViewFields(): string[]{
		return [
			"ua_id", 
			"user_id", 
			"auth_type", 
			"auth_id", 
			"auth_data"
		];
	}

	static editFields(): string[]{
		return [
			"ua_id", 
			"user_id", 
			"auth_type", 
			"auth_id", 
			"auth_data"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"ua_id LIKE :search", 
			"user_id LIKE :search", 
			"auth_id LIKE :search", 
			"auth_data LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


