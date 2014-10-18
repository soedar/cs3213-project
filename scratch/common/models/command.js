var Engine = require('../../engine/engine.js');

module.exports = function(Command) {
  console.log(Engine);
  Command.afterRemote('create', function(ctx, unused, next) {
    var VisualEvent = Command.app.models.VisualEvent;

    var engine = new Engine(ctx.result.map, ctx.result.commands);
    VisualEvent.create({commandId: ctx.result.id, events: engine.run()}, function(error, e) {
      ctx.res.send(ctx.result);
    });
  });
};
