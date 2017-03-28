/*
* Authentication service
* Author Ahmed H. Ismail
*/
angular.module('twitter').factory('UserAuth', function($auth, $q,
  localStorageService, User, UsersResource, Upload, endpoints, FormsHTTPCache) {
  var UserAuthService = function() {};
  var clearCaches = function() {
        FormsHTTPCache.removeAll();
  };
  UserAuthService.prototype.login = function(credentials) {
    var _this = this;
    clearCaches();
    return $auth.login(credentials).then(function(response) {
      _this.currentUserData = response.data.profile;
      localStorageService.set('currentUser', _this.currentUserData);
      _this.currentUser = User.fromJSON(_this.currentUserData);
      return _this.currentUser;
    });
  };

  UserAuthService.prototype.setToken = function(token, user) {
    clearCaches();
    $auth.setToken(token);
    this.currentUserData = user;
    localStorageService.set('currentUser', this.currentUserData);
    return this.currentUser = User.fromJSON(this.currentUserData);
  };

  Object.defineProperty(UserAuthService.prototype, 'token' ,{
    get: function() {
      return $auth.getToken();
    }
  });

  UserAuthService.prototype.setUser = function(user) {
    this.currentUserData = user.resource;
    localStorageService.set('currentUser', this.currentUserData);
    this.currentUser = User.fromJSON(this.currentUserData);
  };

  UserAuthService.prototype.signup = function(profile_data, files) {
    var url = endpoints.users.resourceUrl.replace(':id.json', '');
    var data = {};
    _.assign(data, profile_data, files);
    return Upload.upload({
      url: url,
      data: data
    });
  };
  
  UserAuthService.prototype.getUser = function() {
    if (!angular.isUndefined(this.currentUser)) {
      return this.currentUser;
    } else {
      return this.currentUser = User.fromJSON(localStorageService.get('currentUser'));
    }
  };
  
  UserAuthService.prototype.refreshUser = function() {
    var _this = this;
    clearCaches();
    return UsersResource.get({id: this.user.id}).$promise.then(function(resource) {
      var newUser = new User(resource);
      _this.setUser(newUser);
      return _this.user;
    });
  };

  UserAuthService.prototype.logout = function() {
    this.currentUser = undefined;
    this.currentUserData = undefined;
    clearCaches();
    localStorageService.remove('currentUser');
    if (this.signedIn) {
      $auth.logout();
    }
  };

  Object.defineProperty(UserAuthService.prototype, 'user', {
    get: function() {
      return this.getUser();
    }
  });

  Object.defineProperty(UserAuthService.prototype, 'signedIn', {
    get: function() {
      return $auth.isAuthenticated();
    }
  });

  return new UserAuthService();
});