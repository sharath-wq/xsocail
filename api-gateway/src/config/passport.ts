import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import bcrypt from 'bcrypt';
import _ from 'lodash';

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: '208073718655-s8cgruef2fqbi97jbsbvsdd24md5a34h.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'https://xsocial.dev/api/users/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            try {
                const user = {
                    username: `${profile.displayName}${Date.now().toString().slice(0, 6)}`,
                    fullName: `${profile.name?.givenName} ${profile.name?.familyName}`,
                    email: profile.emails![0].value,
                    imageUrl: profile.profileUrl,
                    password: generatePassword(),
                };

                const userClone = _.clone(user);

                return done(null, userClone);
            } catch (error: any) {
                console.log(error);
                return done(error);
            }
        }
    )
);

function generatePassword() {
    const saltRounds = 12;
    const randomPassword = Math.random().toString(36).slice(2);
    const hashedPassword = bcrypt.hashSync(randomPassword, saltRounds);
    return hashedPassword;
}
