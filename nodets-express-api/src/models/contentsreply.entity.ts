
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'contents_reply' })
export default class ContentsReply extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("contents_reply");
	}
	
	@PrimaryGeneratedColumn({name: 'reply_id'})
	reply_id: number

	@Column({name: 'content_id' })
	content_id: number
	
	@Column({name: 'replay_content' })
	replay_content: string
	
	@Column({name: 'user_id' })
	user_id: number
	
	
	
	
	static listFields(): string[]{
		return [
			"reply_id", 
			"content_id", 
			"replay_content", 
			"user_id"
		];
	}

	static exportListFields(): string[]{
		return [
			"reply_id", 
			"content_id", 
			"replay_content", 
			"user_id"
		];
	}

	static viewFields(): string[]{
		return [
			"reply_id", 
			"content_id", 
			"replay_content", 
			"user_id"
		];
	}

	static exportViewFields(): string[]{
		return [
			"reply_id", 
			"content_id", 
			"replay_content", 
			"user_id"
		];
	}

	static editFields(): string[]{
		return [
			"reply_id", 
			"content_id", 
			"replay_content", 
			"user_id"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"reply_id LIKE :search", 
			"replay_content LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


