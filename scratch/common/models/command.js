module.exports = function(Command) {

  Command.afterRemote('create', function(ctx, unused, next) {
    var VisualEvent = Command.app.models.VisualEvent;

    VisualEvent.create({commandId: ctx.result.id, events: {list: [1,2]}}, function(error, e) {
      ctx.res.send(ctx.result);
    });
  });
};
