export default {
	app: {
		name: "Study-Materials-Sharing",
		url: "http://localhost:8060",
		frontendUrl: "http://localhost:8050",
		secret: "b1f992dca535d11eef0db6b79cef7840",
		language: "english",
		publicDir: "public",
	},
	meta: {
		author:"",
		description: "__metadescription",
		charset: "UTF-8",
	},
	auth: {
		userTokenSecret: "eb79481A-1ax%W@7e3f3YY6Q!!0-2caf76e05f2e77d2c0b5",
		apiTokenSecret: "ea3de388$Xax%W!4e1429B#Q-!07258d8cfaf4e77f2894a5",
		jwtDuration: 30, //in minutes
		otpDuration: 5, //in minutes
	},
	database: {
		name:"chenanqian_xxzlfx",
		type: "mysql",
		host: "localhost",
		username: "root",
		password: "123456",
		port: "3306",
		charset: "utf8",
		recordlimit: 10,
		ordertype: "DESC"
	},
	mail: {
		username:"13870303152@163.com",
		password: "JHVNej6wmAjy9Ynd",
		senderemail:"13870303152@163.com",
		sendername:"anbai",
		host: "pop.163.com",
		secure: true,
		port: "465"
	},
	upload: {
		tempDir: "uploads/temp/",
		importdata: {
			filenameType: "timestamp",
			extensions: "csv",
			maxFiles: "10",
			maxFileSize: "3",
			returnFullpath: "false",
			filenamePrefix: "",
			uploadDir: "uploads/files/"
		},
		
		image_file: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			maxFiles: "1",
			maxFileSize: "3000", // in MB
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		video_file: {
			filenameType: "random",
			extensions: "mp3,mp4,webm,wav,avi,mpg,mpeg",
			maxFiles: "1",
			maxFileSize: "3000", // in MB
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		doc_file: {
			filenameType: "random",
			extensions: "docx,doc,xls,xlsx,xml,csv,pdf,xps",
			maxFiles: "1",
			maxFileSize: "3000", // in MB
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		photo: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			maxFiles: "1",
			maxFileSize: "3", // in MB
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

	},
	s3: {
		secretAccessKey: "",
		accessKeyId: "",
		region: "us-west-2",
		bucket: "",
	},
	
	locales: {
		'english': 'English',
	}

}