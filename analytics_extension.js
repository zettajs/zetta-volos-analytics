module.exports = function(analytics) {
  return function(server) {
    var argo = server.httpServer.cloud;

    argo.use(function(handle) {
      handle('request', function(env, next) {
        wrapForExpressCompatibility(env);
        analytics.apply(env.request, env.response);
        next(env);
      });
    })
  };
};

// Volos Analytics expects Express middleware.
var wrapForExpressCompatibility = function(env) {
  var proto = env.request.connection.encrypted
    ? 'https'
    : 'http';

  proto = env.request.headers['x-forwarded-proto'] || proto;

  env.request.protocol = proto.split(/\s*,\s*/)[0];

  env.request.get =
  env.request.header = function(name){
    switch (name = name.toLowerCase()) {
      case 'referer':
      case 'referrer':
        return this.headers.referrer
          || this.headers.referer;
      default:
        return this.headers[name];
    }
  };

  env.response.get = function(header) {
    return env.response.getHeader(header);
  };
};
