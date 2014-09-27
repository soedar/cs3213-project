var workspace = [];

$(document).ready(function(){
    $('.command-object').draggable({
        snap:true,
        snapMode: "inner",
        revert: "invalid",
        helper: "clone"
    });

    $('.command-placeholder').droppable({
        accept: ".command-object",
        drop: function(event, ui){
            $(this).find('h4').remove();
            $(ui.draggable).clone().appendTo(this);
            $("#workspace-main .workspace-row").first().clone().appendTo($(this).parent().parent()).removeClass("hidden");
            var data = $(event.target).find('.command-object').data();
            //var lineData = $(event.target);
            //console.log(lineData);
            workspace[workspace.length]={
                type: data.type,
                direction: data.direction,
                steps: data.steps
            };

            console.log(workspace);

        }
    });

});
