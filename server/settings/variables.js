

let saltRoundsEnv = process.env.TWITTERISHIFY_SALT_ROUND || '12';
exports.saltRounds = parseInt(saltRoundsEnv, 10);

exports.SERVER_PORT = process.env.TWITTERISHIFY_SERVER_PORT || '3000';
exports.jwtSecret = process.env.TWITTERISHIFY_JWT_SECRET || 'secret';
exports.isProduction = process.env.NODE_ENV === 'production';