import pkg from 'jsonwebtoken';

function signToken(payload, isAccessToken) {
    return pkg.sign(payload, isAccessToken? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET, {algorithm: "HS256", expiresIn: "1h"});
}

function generateAccessToken(user) {
    return signToken({user}, true);
}

function generateRefreshToken(user) {
    return signToken({user}, false);

}

export function createAccessToken(user) {
    return generateAccessToken(user);
}

export function createRefreshToken(user){
    return generateRefreshToken(user);
}