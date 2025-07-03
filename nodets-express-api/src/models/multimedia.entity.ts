
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'multimedia' })
export default class Multimedia extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("multimedia");
	}
	
	@PrimaryGeneratedColumn({name: 'multimedata_id'})
	multimedata_id: number

	@Column({name: 'user_id' })
	user_id: number
	
	@Column({name: 'image_file' })
	image_file: string
	
	@Column({name: 'video_file' })
	video_file: string
	
	@Column({name: 'doc_file' })
	doc_file: string
	
	
	
	
	static listFields(): string[]{
		return [
			"multimedata_id", 
			"user_id", 
			"image_file", 
			"video_file", 
			"doc_file"
		];
	}

	static exportListFields(): string[]{
		return [
			"multimedata_id", 
			"user_id", 
			"image_file", 
			"video_file", 
			"doc_file"
		];
	}

	static viewFields(): string[]{
		return [
			"multimedata_id", 
			"user_id", 
			"image_file", 
			"video_file", 
			"doc_file"
		];
	}

	static exportViewFields(): string[]{
		return [
			"multimedata_id", 
			"user_id", 
			"image_file", 
			"video_file", 
			"doc_file"
		];
	}

	static editFields(): string[]{
		return [
			"user_id", 
			"image_file", 
			"video_file", 
			"doc_file", 
			"multimedata_id"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"multimedata_id LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


