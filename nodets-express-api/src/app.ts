import express, { Application } from 'express';
import passport from './helpers/passport-auth';
import cors from 'cors';
import ejs from 'ejs';
import config from './config';
import { HttpRequest, HttpResponse, HttpMiddleWare } from './helpers/http';
import RbacMiddleWare from  './helpers/rbac';
import { AppDataSource } from './datasource';
import HomeController from './controllers/home';
import ComponentsDataController from './controllers/components_data';
import FileUploaderController from './controllers/fileuploader';
import S3UploaderController from './controllers/s3uploader';
import AuthController from './controllers/auth';
import AccountController from './controllers/account';
import AuditsController from './controllers/audits';
import ContentsController from './controllers/contents';
import ContentslikesController from './controllers/contentslikes';
import ContentsreplyController from './controllers/contentsreply';
import MultimediaController from './controllers/multimedia';
import NotificationController from './controllers/notification';
import PermissionsController from './controllers/permissions';
import RolesController from './controllers/roles';
import UsersController from './controllers/users';
AppDataSource.initialize().then(() => {
    console.log("Database initialized!")
}).catch((err) => {
    console.error("Database initialization Error", err)
});


const app: Application = express();

//set view engine use to return Html
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(HttpMiddleWare);

app.use(cors());

app.use(express.static(config.app.publicDir));

app.use(express.json()) // Parses json, multi-part (file), url-encoded
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

//authenticate user and set current user data
app.use('/api',
	async (req:HttpRequest, res:HttpResponse, next) => {
		passport.authenticate('jwt', async (err, user, info) => {
			req.login(user, { session: false }, async (error) => {});
			return next();
		}
		)(req, res);
	}
);

//bind page route to the controllers
app.use('/api/components_data', ComponentsDataController);
app.use('/api/fileuploader', FileUploaderController);
app.use('/api/s3uploader', S3UploaderController);

app.use('/api/auth', AuthController);


// pages which do not need authentication
const publicPages = ['notification/loginpagelist'];

//authenticate all /api/ endpoints
app.use('/api', (req:HttpRequest, res:HttpResponse, next) => {
	const arrPath = req.path.split("/").filter(Boolean);
	const page = arrPath[0];
	const action = arrPath[1] || "index";
	const pagePath = `${page}/${action}`;
	if (publicPages.includes(pagePath)) {
		return next(); //exclude pages from auth check
	}
	else{
		if(req.user){
			return next();// user is authenticated
		}
		return res.unauthorized();
	}
});



app.use('/api', RbacMiddleWare); // access control middleware.
app.use('/api/account', AccountController);

app.use('/api/', HomeController);
app.use('/api/audits', AuditsController)
app.use('/api/contents', ContentsController)
app.use('/api/contentslikes', ContentslikesController)
app.use('/api/contentsreply', ContentsreplyController)
app.use('/api/multimedia', MultimediaController)
app.use('/api/notification', NotificationController)
app.use('/api/permissions', PermissionsController)
app.use('/api/roles', RolesController)
app.use('/api/users', UsersController)

app.get('*', function (req, res) {
    res.status(404).json("Page not found");
});

let port = 8060;
//start app
app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});