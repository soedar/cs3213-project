var Engine = require('../../engine/engine.js');
var _ = require('lodash');

module.exports = function(Command) {
  Command.afterRemote('create', function(ctx, unused, next) {
    var VisualEvent = Command.app.models.VisualEvent;

    var engine = new Engine(ctx.result.map, ctx.result.commands);
    VisualEvent.create({commandId: ctx.result.id, events: engine.run()}, function(error, e) {
      ctx.res.send(ctx.result);
    });
  });

  Command.visualization = function(id, cb) {
    Command.findOne({where: {id: id}, limit: 1, include: 'event'}, function(error, command) {
      if (command) {
        cb(null, command.commands, command.event()[0].events);
      } else {
        cb('no_such_id');
      }
    });
  };

  Command.remoteMethod('visualization', {accepts: {arg: 'id', type: 'string'},
                                         returns: [{arg: 'commands', type: 'object'},
                                                   {arg: 'events', type: 'object'}],
                                         http: {verb: 'get'}});
};
