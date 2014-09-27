var workspace = [];

$(document).ready(function(){
    //From command palette, we just need to clone
    $('.command-object').draggable({
        snap:true,
        snapMode: "inner",
        revert: "invalid",
        helper: "clone"
    });

    $('#save-workspace').on('click', function(){
        console.log("Saving: " + JSON.stringify(workspace));
    });

    //Start listening to drops
    listenDrag();

});

var listenDrag = function(){

    $('.command-placeholder').droppable({
        accept: ".command-object",
        drop: function(event, ui){

            //Remove the existing text
            $(this).find('h4').remove();

            //Create a new command-object
            $(ui.draggable).clone().appendTo(this);

            //Create a new placeholder
            $("#workspace-main .workspace-row").first().clone().appendTo($(this).parent().parent()).removeClass("hidden");

            //Save data
            var data = $(event.target).find('.command-object').data();
            var rowData = $(this).data();
            console.log(rowData);
            //console.log(lineData);
            workspace[workspace.length]={
                line: rowData.line,
                nestLevel: rowData.nestlevel,
                type: data.type,
                direction: data.direction,
                steps: data.steps
            };

            console.log("Current workspace state: " + JSON.stringify(workspace));

        }
    });
}
