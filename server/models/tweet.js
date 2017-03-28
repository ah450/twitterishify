

module.exports = function (sequelize, DataTypes) {
  let Tweet = sequelize.define("Tweet", {
    text: { type: DataTypes.TEXT, allowNull: false, validate: { notNull: true, notEmpty: true } },
    lat: { type: DataTypes.TEXT, allowNull: true, validate: { notEmpty: true } },
    long: { type: DataTypes.TEXT, allowNull: true, validate: { notEmpty: true } },
    tweetedAt: { type: DataTypes.DATE, allowNull: false, validate: { notNull: true } },
    tweetIdStr: { type: DataTypes.TEXT, allowNull: false, validate: { notNull: true, notEmpty: true } },
    tweetOwnerIdStr: { type: DataTypes.STRING(1024), allowNull: false, validate: { notNull: true, notEmpty: true } },
    tweetOwnerScreenName: { type: DataTypes.STRING(1024), allowNull: false, validate: { notNull: true, notEmpty: true } },
    retweetCount: { type: DataTypes.INTEGER, allowNull: false, validate: { notNull: true } },
    inReplyToTweetIdStr: { type: DataTypes.TEXT, allowNull: true, validate: { notNull: false } },
    inReplyToUserIdStr: { type: DataTypes.TEXT, allowNull: true, validate: { notNull: false } },
    twitterParsedEntitiesJSON: { type: DataTypes.TEXT, allowNull: true }
  }, {
      classMethods: {
        associate: function (models) {
          Tweet.belongsToMany(models.Tag, {
            through: 'TweetTags',
          });
        }
      },
      indexes: [
        {
          fields: ['tweetOwnerIdStr'],
          name: 'tweetOwnerIdStr_index'
        }, {
          fields: ['tweetOwnerScreenName'],
          name: 'tweetOwnerScreenName_index'
        }
      ]
    });
  return Tweet;
}