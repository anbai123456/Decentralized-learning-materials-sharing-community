
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'notification' })
export default class Notification extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("notification");
	}
	
	@PrimaryGeneratedColumn({name: 'id'})
	id: number

	@Column({name: 'title' })
	title: string
	
	@Column({name: 'content' })
	content: string
	
	@Column({name: 'publish_flag' })
	publish_flag: number
	
	@Column({name: 'publish_date' })
	publish_date: string
	
	@Column({name: 'top' })
	top: number
	
	@Column({name: 'classification' })
	classification: string
	
	
	
	
	static listFields(): string[]{
		return [
			"id", 
			"title", 
			"content", 
			"publish_flag", 
			"publish_date", 
			"top", 
			"classification"
		];
	}

	static exportListFields(): string[]{
		return [
			"id", 
			"title", 
			"content", 
			"publish_flag", 
			"publish_date", 
			"top", 
			"classification"
		];
	}

	static viewFields(): string[]{
		return [
			"id", 
			"title", 
			"content", 
			"publish_flag", 
			"publish_date", 
			"top", 
			"classification"
		];
	}

	static exportViewFields(): string[]{
		return [
			"id", 
			"title", 
			"content", 
			"publish_flag", 
			"publish_date", 
			"top", 
			"classification"
		];
	}

	static editFields(): string[]{
		return [
			"id", 
			"title", 
			"content", 
			"publish_flag", 
			"publish_date", 
			"top", 
			"classification"
		];
	}

	static loginpagelistFields(): string[]{
		return [
			"classification", 
			"title", 
			"content", 
			"id"
		];
	}

	static exportLoginpagelistFields(): string[]{
		return [
			"classification", 
			"title", 
			"content", 
			"id"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"id LIKE :search", 
			"title LIKE :search", 
			"content LIKE :search", 
			"classification LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


