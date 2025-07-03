
import { createRouter, createWebHashHistory } from 'vue-router';

import { useAuth } from 'src/composables/auth';


function passRouteToProps(route){
	return {
		queryParams: route.query,
		fieldName: route.params.fieldName, 
		fieldValue: route.params.fieldValue
	}
}


let routes = [
	//Dashboard routes


//audits routes
			{
				path: '/audits/:fieldName?/:fieldValue?',
				name: 'auditslist',
				component: () => import('./pages/audits/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/audits/view/:id', 
				name: 'auditsview', 
				component: () => import('./pages/audits/view.vue'), 
				props: true
			},
		

//ccollect routes
			{
				path: '/ccollect/:fieldName?/:fieldValue?',
				name: 'ccollectlist',
				component: () => import('./pages/ccollect/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/ccollect/view/:id', 
				name: 'ccollectview', 
				component: () => import('./pages/ccollect/view.vue'), 
				props: true
			},
		
			{ 
				path: '/ccollect/add', 
				name: 'ccollectadd', 
				component: () => import('./pages/ccollect/add.vue'), 
				props: true
			},
	
			{ 
				path: '/ccollect/edit/:id', 
				name: 'ccollectedit', 
				component: () => import('./pages/ccollect/edit.vue'), 
				props: true
			},
		

//contents routes
			{
				path: '/contents/:fieldName?/:fieldValue?',
				name: 'contentslist',
				component: () => import('./pages/contents/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/contents/view/:id', 
				name: 'contentsview', 
				component: () => import('./pages/contents/view.vue'), 
				props: true
			},
		
			{ 
				path: '/contents/add', 
				name: 'contentsadd', 
				component: () => import('./pages/contents/add.vue'), 
				props: true
			},
	
			{ 
				path: '/contents/edit/:id', 
				name: 'contentsedit', 
				component: () => import('./pages/contents/edit.vue'), 
				props: true
			},
		

//contentslikes routes
			{
				path: '/contentslikes/:fieldName?/:fieldValue?',
				name: 'contentslikeslist',
				component: () => import('./pages/contentslikes/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/contentslikes/view/:id', 
				name: 'contentslikesview', 
				component: () => import('./pages/contentslikes/view.vue'), 
				props: true
			},
		
			{ 
				path: '/contentslikes/add', 
				name: 'contentslikesadd', 
				component: () => import('./pages/contentslikes/add.vue'), 
				props: true
			},
	
			{ 
				path: '/contentslikes/edit/:id', 
				name: 'contentslikesedit', 
				component: () => import('./pages/contentslikes/edit.vue'), 
				props: true
			},
		

//contentsreply routes
			{
				path: '/contentsreply/:fieldName?/:fieldValue?',
				name: 'contentsreplylist',
				component: () => import('./pages/contentsreply/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/contentsreply/view/:id', 
				name: 'contentsreplyview', 
				component: () => import('./pages/contentsreply/view.vue'), 
				props: true
			},
		
			{ 
				path: '/contentsreply/add', 
				name: 'contentsreplyadd', 
				component: () => import('./pages/contentsreply/add.vue'), 
				props: true
			},
	
			{ 
				path: '/contentsreply/edit/:id', 
				name: 'contentsreplyedit', 
				component: () => import('./pages/contentsreply/edit.vue'), 
				props: true
			},
		

//contentsreplyreply routes
			{
				path: '/contentsreplyreply/:fieldName?/:fieldValue?',
				name: 'contentsreplyreplylist',
				component: () => import('./pages/contentsreplyreply/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/contentsreplyreply/view/:id', 
				name: 'contentsreplyreplyview', 
				component: () => import('./pages/contentsreplyreply/view.vue'), 
				props: true
			},
		
			{ 
				path: '/contentsreplyreply/add', 
				name: 'contentsreplyreplyadd', 
				component: () => import('./pages/contentsreplyreply/add.vue'), 
				props: true
			},
	
			{ 
				path: '/contentsreplyreply/edit/:id', 
				name: 'contentsreplyreplyedit', 
				component: () => import('./pages/contentsreplyreply/edit.vue'), 
				props: true
			},
		

//cstart routes
			{
				path: '/cstart/:fieldName?/:fieldValue?',
				name: 'cstartlist',
				component: () => import('./pages/cstart/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/cstart/view/:id', 
				name: 'cstartview', 
				component: () => import('./pages/cstart/view.vue'), 
				props: true
			},
		
			{ 
				path: '/cstart/add', 
				name: 'cstartadd', 
				component: () => import('./pages/cstart/add.vue'), 
				props: true
			},
	
			{ 
				path: '/cstart/edit/:id', 
				name: 'cstartedit', 
				component: () => import('./pages/cstart/edit.vue'), 
				props: true
			},
		

//fans routes
			{
				path: '/fans/:fieldName?/:fieldValue?',
				name: 'fanslist',
				component: () => import('./pages/fans/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/fans/view/:id', 
				name: 'fansview', 
				component: () => import('./pages/fans/view.vue'), 
				props: true
			},
		
			{ 
				path: '/fans/add', 
				name: 'fansadd', 
				component: () => import('./pages/fans/add.vue'), 
				props: true
			},
	
			{ 
				path: '/fans/edit/:id', 
				name: 'fansedit', 
				component: () => import('./pages/fans/edit.vue'), 
				props: true
			},
		

//follows routes
			{
				path: '/follows/:fieldName?/:fieldValue?',
				name: 'followslist',
				component: () => import('./pages/follows/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/follows/view/:id', 
				name: 'followsview', 
				component: () => import('./pages/follows/view.vue'), 
				props: true
			},
		
			{ 
				path: '/follows/add', 
				name: 'followsadd', 
				component: () => import('./pages/follows/add.vue'), 
				props: true
			},
	
			{ 
				path: '/follows/edit/:id', 
				name: 'followsedit', 
				component: () => import('./pages/follows/edit.vue'), 
				props: true
			},
		

//mcollect routes
			{
				path: '/mcollect/:fieldName?/:fieldValue?',
				name: 'mcollectlist',
				component: () => import('./pages/mcollect/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/mcollect/view/:id', 
				name: 'mcollectview', 
				component: () => import('./pages/mcollect/view.vue'), 
				props: true
			},
		
			{ 
				path: '/mcollect/add', 
				name: 'mcollectadd', 
				component: () => import('./pages/mcollect/add.vue'), 
				props: true
			},
	
			{ 
				path: '/mcollect/edit/:id', 
				name: 'mcollectedit', 
				component: () => import('./pages/mcollect/edit.vue'), 
				props: true
			},
		

//mlikes routes
			{
				path: '/mlikes/:fieldName?/:fieldValue?',
				name: 'mlikeslist',
				component: () => import('./pages/mlikes/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/mlikes/view/:id', 
				name: 'mlikesview', 
				component: () => import('./pages/mlikes/view.vue'), 
				props: true
			},
		
			{ 
				path: '/mlikes/add', 
				name: 'mlikesadd', 
				component: () => import('./pages/mlikes/add.vue'), 
				props: true
			},
	
			{ 
				path: '/mlikes/edit/:id', 
				name: 'mlikesedit', 
				component: () => import('./pages/mlikes/edit.vue'), 
				props: true
			},
		

//multimedia routes
			{
				path: '/multimedia/:fieldName?/:fieldValue?',
				name: 'multimedialist',
				component: () => import('./pages/multimedia/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/multimedia/view/:id', 
				name: 'multimediaview', 
				component: () => import('./pages/multimedia/view.vue'), 
				props: true
			},
		
			{ 
				path: '/multimedia/add', 
				name: 'multimediaadd', 
				component: () => import('./pages/multimedia/add.vue'), 
				props: true
			},
	
			{ 
				path: '/multimedia/edit/:id', 
				name: 'multimediaedit', 
				component: () => import('./pages/multimedia/edit.vue'), 
				props: true
			},
		

//multimediareply routes
			{
				path: '/multimediareply/:fieldName?/:fieldValue?',
				name: 'multimediareplylist',
				component: () => import('./pages/multimediareply/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/multimediareply/view/:id', 
				name: 'multimediareplyview', 
				component: () => import('./pages/multimediareply/view.vue'), 
				props: true
			},
		
			{ 
				path: '/multimediareply/add', 
				name: 'multimediareplyadd', 
				component: () => import('./pages/multimediareply/add.vue'), 
				props: true
			},
	
			{ 
				path: '/multimediareply/edit/:id', 
				name: 'multimediareplyedit', 
				component: () => import('./pages/multimediareply/edit.vue'), 
				props: true
			},
		

//multimediareplyreply routes
			{
				path: '/multimediareplyreply/:fieldName?/:fieldValue?',
				name: 'multimediareplyreplylist',
				component: () => import('./pages/multimediareplyreply/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/multimediareplyreply/view/:id', 
				name: 'multimediareplyreplyview', 
				component: () => import('./pages/multimediareplyreply/view.vue'), 
				props: true
			},
		
			{ 
				path: '/multimediareplyreply/add', 
				name: 'multimediareplyreplyadd', 
				component: () => import('./pages/multimediareplyreply/add.vue'), 
				props: true
			},
	
			{ 
				path: '/multimediareplyreply/edit/:id', 
				name: 'multimediareplyreplyedit', 
				component: () => import('./pages/multimediareplyreply/edit.vue'), 
				props: true
			},
		

//notification routes
			{
				path: '/notification/:fieldName?/:fieldValue?',
				name: 'notificationlist',
				component: () => import('./pages/notification/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/notification/view/:id', 
				name: 'notificationview', 
				component: () => import('./pages/notification/view.vue'), 
				props: true
			},
		
			{ 
				path: '/notification/add', 
				name: 'notificationadd', 
				component: () => import('./pages/notification/add.vue'), 
				props: true
			},
	
			{ 
				path: '/notification/edit/:id', 
				name: 'notificationedit', 
				component: () => import('./pages/notification/edit.vue'), 
				props: true
			},
		
			{
				path: '/notification/loginpagelist/:fieldName?/:fieldValue?',
				name: 'notificationloginpagelist',
				component: () => import('./pages/notification/loginpagelist.vue'), 
				props: route => passRouteToProps(route)
			},
	

//permissions routes
			{
				path: '/permissions/:fieldName?/:fieldValue?',
				name: 'permissionslist',
				component: () => import('./pages/permissions/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/permissions/view/:id', 
				name: 'permissionsview', 
				component: () => import('./pages/permissions/view.vue'), 
				props: true
			},
		
			{ 
				path: '/permissions/add', 
				name: 'permissionsadd', 
				component: () => import('./pages/permissions/add.vue'), 
				props: true
			},
	
			{ 
				path: '/permissions/edit/:id', 
				name: 'permissionsedit', 
				component: () => import('./pages/permissions/edit.vue'), 
				props: true
			},
		

//roles routes
			{
				path: '/roles/:fieldName?/:fieldValue?',
				name: 'roleslist',
				component: () => import('./pages/roles/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/roles/view/:id', 
				name: 'rolesview', 
				component: () => import('./pages/roles/view.vue'), 
				props: true
			},
		
			{ 
				path: '/roles/add', 
				name: 'rolesadd', 
				component: () => import('./pages/roles/add.vue'), 
				props: true
			},
	
			{ 
				path: '/roles/edit/:id', 
				name: 'rolesedit', 
				component: () => import('./pages/roles/edit.vue'), 
				props: true
			},
		

//tag routes
			{
				path: '/tag/:fieldName?/:fieldValue?',
				name: 'taglist',
				component: () => import('./pages/tag/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/tag/view/:id', 
				name: 'tagview', 
				component: () => import('./pages/tag/view.vue'), 
				props: true
			},
		
			{ 
				path: '/tag/add', 
				name: 'tagadd', 
				component: () => import('./pages/tag/add.vue'), 
				props: true
			},
	
			{ 
				path: '/tag/edit/:id', 
				name: 'tagedit', 
				component: () => import('./pages/tag/edit.vue'), 
				props: true
			},
		

//userauthentications routes
			{
				path: '/userauthentications/:fieldName?/:fieldValue?',
				name: 'userauthenticationslist',
				component: () => import('./pages/userauthentications/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/userauthentications/view/:id', 
				name: 'userauthenticationsview', 
				component: () => import('./pages/userauthentications/view.vue'), 
				props: true
			},
		
			{ 
				path: '/userauthentications/add', 
				name: 'userauthenticationsadd', 
				component: () => import('./pages/userauthentications/add.vue'), 
				props: true
			},
	
			{ 
				path: '/userauthentications/edit/:id', 
				name: 'userauthenticationsedit', 
				component: () => import('./pages/userauthentications/edit.vue'), 
				props: true
			},
		

//users routes
			{
				path: '/users/:fieldName?/:fieldValue?',
				name: 'userslist',
				component: () => import('./pages/users/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/users/view/:id', 
				name: 'usersview', 
				component: () => import('./pages/users/view.vue'), 
				props: true
			},
		
			{ 
				path: '/index/register', 
				name: 'usersuserregister', 
				component: () => import('./pages/index/userregister.vue'), 
				props: true
			},
	
			{ 
				path: '/account/edit', 
				name: 'usersaccountedit', 
				component: () => import('./pages/account/accountedit.vue'), 
				props: true
			},
	
			{ 
				path: '/account', 
				name: 'usersaccountview', 
				component: () => import('./pages/account/accountview.vue'), 
				props: true
			},
	
			{ 
				path: '/users/add', 
				name: 'usersadd', 
				component: () => import('./pages/users/add.vue'), 
				props: true
			},
	
			{ 
				path: '/users/edit/:id', 
				name: 'usersedit', 
				component: () => import('./pages/users/edit.vue'), 
				props: true
			},
		

	
	
//Password reset routes
			{ 
				path: '/index/forgotpassword', 
				name: 'forgotpassword', 
				component: () => import('./pages/index/forgotpassword.vue'), 
				props: true
			},
			{ 
				path: '/index/resetpassword', 
				name: 'resetpassword', 
				component: () => import('./pages/index/resetpassword.vue'), 
				props: true
			},
			{ 
				path: '/index/resetpassword_completed', 
				name: 'resetpassword_completed', 
				component: () => import('./pages/index/resetpassword_completed.vue'), 
				props: true
			},
	
	
	
	{ 
		path:  '/error/forbidden', 
		name: 'forbidden', 
		component: () => import('./pages/errors/forbidden.vue'),
		props: true
	},
	{ 
		path: '/error/notfound', 
		name: 'notfound',
		component: () => import('./pages/errors/pagenotfound.vue'),
		props: true
	},
	{
		path: '/:catchAll(.*)', 
		component: () => import('./pages/errors/pagenotfound.vue')
	}
];

export default () => {
	
const auth = useAuth();

	
	const user = auth.user;
	if(user){
		const roleName = auth.userRole.toLowerCase();
		let rolePage;
		switch(roleName){
			case "admin":
				rolePage = "admin";
				break;
			case "contents":
				rolePage = "contents";
				break;
			case "multimedia":
				rolePage = "multimedia";
				break;
			case "history":
				rolePage = "history";
				break;
			default:
				rolePage = "home";
		}
		
		//Dashboard route
		//Display page based on user role
		routes.push({
			path: '/',
			alias: '/home', 
			name: 'home', 
			component: () => import(`./pages/home/${rolePage}.vue`),
			props: true
		});
	}
	else{
		routes.push({
			path: '/', 
			alias: '/index', 
			name: 'index', 
			component: () => import('./pages/index/index.vue'),
			props: true
		});
	}

	const router = createRouter({
		history: createWebHashHistory(),
		routes,
		scrollBehavior(to, from, savedPostion){
			if(savedPostion) return savedPostion;
			return { top:0 }
		}
	});
	
	router.beforeEach((to, from, next) => {
		const user = auth.user;
		let path = to.path;
		let authRequired = auth.pageRequiredAuth(path);
		if (authRequired) {
			if(!user){
				return next({ path: '/',  query: { nexturl: to.fullPath } });
			}
			//authorize user
			if (!auth.canView(path)) {
				return next({path: "/error/forbidden"});
			}
		}

		if(user && to.name == "index"){
			//already logged in, show home when try to access index page
			return next({ path: "/home"});
		}

		//navigate to redirect url if available
		if(to.name == "home" && to.query.nexturl){
			return next({ path: to.query.nexturl});
		}

 		//close dialog from previous page
		//store.closeDialogs('app/closeDialogs');
		
		next();
	});

	return router;
}
