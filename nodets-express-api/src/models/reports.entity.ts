
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'reports' })
export default class Reports extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("reports");
	}
	
	@PrimaryGeneratedColumn({name: 'report_id'})
	report_id: number

	@Column({name: 'reporter_id' })
	reporter_id: string
	
	@Column({name: 'reported_content_id' })
	reported_content_id: string
	
	@Column({name: 'reason' })
	reason: string
	
	@Column({name: 'status' })
	status: string
	
	@Column({name: 'created_at' })
	created_at: string
	
	@Column({name: 'updated_at' })
	updated_at: string
	
	
	
	
	static listFields(): string[]{
		return [
			"report_id", 
			"reporter_id", 
			"reported_content_id", 
			"reason", 
			"status", 
			"created_at", 
			"updated_at"
		];
	}

	static exportListFields(): string[]{
		return [
			"report_id", 
			"reporter_id", 
			"reported_content_id", 
			"reason", 
			"status", 
			"created_at", 
			"updated_at"
		];
	}

	static viewFields(): string[]{
		return [
			"report_id", 
			"reporter_id", 
			"reported_content_id", 
			"reason", 
			"status", 
			"created_at", 
			"updated_at"
		];
	}

	static exportViewFields(): string[]{
		return [
			"report_id", 
			"reporter_id", 
			"reported_content_id", 
			"reason", 
			"status", 
			"created_at", 
			"updated_at"
		];
	}

	static editFields(): string[]{
		return [
			"report_id", 
			"reporter_id", 
			"reported_content_id", 
			"reason", 
			"status"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"report_id LIKE :search", 
			"reporter_id LIKE :search", 
			"reported_content_id LIKE :search", 
			"reason LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


