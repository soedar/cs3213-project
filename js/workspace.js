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
            console.log($("#workspace-main .workspace-row").last());
            $("#workspace-main .workspace-row").first().clone().appendTo($(this).parent().parent()).removeClass("hidden");
        }
    });
});
