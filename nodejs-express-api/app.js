import express from 'express';
import compression from 'compression';
import cors from 'cors';
import ejs from 'ejs';
import config from './config.js';
import extendExpressMiddleware from './helpers/express_middleware.js';
import { passportJwtLogin, authMiddleware } from './helpers/auth_middleware.js';
import AuthController from './controllers/auth.js';
import AccountController from './controllers/account.js';
import HomeController from './controllers/home.js';
import ComponentsDataController from './controllers/components_data.js';
import FileUploaderController from './controllers/fileuploader.js';
import S3UploaderController from './controllers/s3uploader.js';
import AuditsController from  './controllers/audits.js';
import CCollectController from  './controllers/ccollect.js';
import ContentsController from  './controllers/contents.js';
import ContentsLikesController from  './controllers/contentslikes.js';
import ContentsReplyController from  './controllers/contentsreply.js';
import ContentsReplyReplyController from  './controllers/contentsreplyreply.js';
import CStartController from  './controllers/cstart.js';
import FansController from  './controllers/fans.js';
import FollowsController from  './controllers/follows.js';
import MCollectController from  './controllers/mcollect.js';
import MLikesController from  './controllers/mlikes.js';
import MultimediaController from  './controllers/multimedia.js';
import MultimediaReplyController from  './controllers/multimediareply.js';
import MultimediaReplyReplyController from  './controllers/multimediareplyreply.js';
import NotificationController from  './controllers/notification.js';
import PermissionsController from  './controllers/permissions.js';
import RolesController from  './controllers/roles.js';
import TagController from  './controllers/tag.js';
import UserAuthenticationsController from  './controllers/userauthentications.js';
import UsersController from  './controllers/users.js';


const app = express();

//set view engine use to return Html
app.set('views', 'views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
// compress all responses
app.use(compression({ threshold: 0 }));
//allow cors on localhost
app.use(cors()); // disable when deploy to production
app.use(express.static(config.app.publicDir))
app.use(express.json()) // Parses json, multi-part (file), url-encoded
app.use(express.urlencoded({ extended:true, limit:'50mb' }));
extendExpressMiddleware(app);
app.use(passportJwtLogin);
app.use('/api/', authMiddleware);

//bind page route to the controllers
app.use('/api/', HomeController);
app.use('/api/auth', AuthController);
app.use('/api/account', AccountController);
app.use('/api/audits', AuditsController);
app.use('/api/ccollect', CCollectController);
app.use('/api/contents', ContentsController);
app.use('/api/contentslikes', ContentsLikesController);
app.use('/api/contentsreply', ContentsReplyController);
app.use('/api/contentsreplyreply', ContentsReplyReplyController);
app.use('/api/cstart', CStartController);
app.use('/api/fans', FansController);
app.use('/api/follows', FollowsController);
app.use('/api/mcollect', MCollectController);
app.use('/api/mlikes', MLikesController);
app.use('/api/multimedia', MultimediaController);
app.use('/api/multimediareply', MultimediaReplyController);
app.use('/api/multimediareplyreply', MultimediaReplyReplyController);
app.use('/api/notification', NotificationController);
app.use('/api/permissions', PermissionsController);
app.use('/api/roles', RolesController);
app.use('/api/tag', TagController);
app.use('/api/userauthentications', UserAuthenticationsController);
app.use('/api/users', UsersController);
app.use('/api/components_data', ComponentsDataController);
app.use('/api/fileuploader', FileUploaderController);
app.use('/api/s3uploader', S3UploaderController);
app.get('*', function(req, res){
    res.status(404).json("Page not found");
});

let port = 8060;
//start app
app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});