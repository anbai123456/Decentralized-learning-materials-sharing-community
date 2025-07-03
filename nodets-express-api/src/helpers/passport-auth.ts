import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import DB from '../datasource';
import config from '../config';
const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.auth.apiTokenSecret
}
passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
	try{
		const userId = jwt_payload.sub; //get user id from jwt
		if(userId){
			const user = await DB.Users.findOne({ where: { user_id: userId } });
			done(null, user);
		}
		else{
			done(null, null);
		}
	}
	catch(err){
		done(err, null);
	}
}));
export default passport;
