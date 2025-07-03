
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'users' })
export default class Users extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("users");
	}
	
	@PrimaryGeneratedColumn({name: 'user_id'})
	user_id: number

	@Column({name: 'username' })
	username: string
	
	@Column({name: 'email' })
	email: string
	
	@Column({name: 'bio' })
	bio: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	@Column({name: 'updated_at' })
	updated_at: string
	
	@Column({name: 'password' })
	password: string
	
	@Column({name: 'tele' })
	tele: string
	
	@Column({name: 'photo' })
	photo: string
	
	@Column({name: 'user_role_id' })
	user_role_id: number
	
	
  	public roleName: any;

	
	
	static listFields(): string[]{
		return [
			"user_id", 
			"username", 
			"email", 
			"bio", 
			"created_at", 
			"updated_at", 
			"tele", 
			"photo", 
			"user_role_id"
		];
	}

	static exportListFields(): string[]{
		return [
			"user_id", 
			"username", 
			"email", 
			"bio", 
			"created_at", 
			"updated_at", 
			"tele", 
			"photo", 
			"user_role_id"
		];
	}

	static viewFields(): string[]{
		return [
			"user_id", 
			"username", 
			"email", 
			"bio", 
			"created_at", 
			"updated_at", 
			"tele", 
			"user_role_id"
		];
	}

	static exportViewFields(): string[]{
		return [
			"user_id", 
			"username", 
			"email", 
			"bio", 
			"created_at", 
			"updated_at", 
			"tele", 
			"user_role_id"
		];
	}

	static accounteditFields(): string[]{
		return [
			"user_id", 
			"username", 
			"bio", 
			"tele", 
			"photo", 
			"user_role_id"
		];
	}

	static accountviewFields(): string[]{
		return [
			"user_id", 
			"username", 
			"email", 
			"bio", 
			"created_at", 
			"updated_at", 
			"tele", 
			"user_role_id"
		];
	}

	static exportAccountviewFields(): string[]{
		return [
			"user_id", 
			"username", 
			"email", 
			"bio", 
			"created_at", 
			"updated_at", 
			"tele", 
			"user_role_id"
		];
	}

	static editFields(): string[]{
		return [
			"user_id", 
			"username", 
			"bio", 
			"tele", 
			"photo", 
			"user_role_id"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"user_id LIKE :search", 
			"username LIKE :search", 
			"email LIKE :search", 
			"bio LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


declare global {
	namespace Express {
		interface User extends Users {}
	}
}

