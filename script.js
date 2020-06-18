var tags = ["Amines","Aldehydes","Boronic acids","Carboxylic acids","Isocyanates","Phenols"];
var chosenSubstructures = [];

// To enable auto complete for text inputs
$(document).ready(function(){
    $(".tags").autocomplete({
        source: tags,
        appendTo: "#substructureDialog"
    });
});

// Makes autocomplete menu sortable
$(document).ready(function(){
    $(".ui-menu").sortable({disable:true});
});

// When save and continue is clicked, writes chosen substructures to file scope
// data structure, right now it assumes 3 entires are there
$(document).ready(function(){
    $("#save").click(function(){
        var inputs = $(".tags");
        var notASubstance = true;

        for (i = 0; i < inputs.size(); i++) {
            var currentSubstructure = inputs.get(i).value;
            var existsInList = tags.includes(currentSubstructure);

            if(existsInList || currentSubstructure == ''){
                if(currentSubstructure != ''){
                    chosenSubstructures.push(currentSubstructure);
                }
            }else{
                alert("'"+currentSubstructure+"' Not a substructure");
                notASubstance = false;
                break;
            }
        }

        if(chosenSubstructures.length == 0 && notASubstance){
            alert("Input at least 1 substructure");
        }
        console.log(chosenSubstructures);
        chosenSubstructures=[];
    });
});

// Resets css, removes values from input fields and wipes array
function closeDialog(){
    $("#cancel").click(function(){
        $('#substructureDialog').dialog('close');
        $(".wrapper").css("width", "0");
        $(".wrapper").css("height", "0");
        document.getElementsByClassName("tags")[0].value='';
        document.getElementsByClassName("tags")[1].value='';
        document.getElementsByClassName("tags")[2].value='';
        chosenSubstructures=[];
    });
}

// Makes the form a dialog
$(document).ready(function(){
    $('#substructureDialog').dialog({
        autoOpen:false,
        dialogClass: "no-close",
        show: "fade",
        width: 500,
        resizable: false,
        closeOnEscape: false,
        hide : {
            effect : 'fade',
            duration : 200
        },
        close : closeDialog()
    });
    $('.ui-dialog').removeClass("ui-corner-all");
});

// Has a button to open dialog window
$(document).ready(function(){
    $("#opener").on("click", function() {
        $('#substructureDialog').dialog("open");
        $(".wrapper").css("width", "100%");
        $(".wrapper").css("height", "100%");
        $(".wrapper").css("position", "fixed");
        $(".wrapper").css("top", "0");
        $(".wrapper").css("left", "0");
        $(".wrapper").css("background-color", "black");
        $(".wrapper").css("opacity", "0.8");
        $(".wrapper").fadeIn(3000);
        $(".ui-dialog-titlebar").hide();

    });
});

// https://stackoverflow.com/questions/4027158/jqueryui-sortable-handling-disableselection-on-form-inputs/4188004
// My attempt to fix a bug where the autocomplete being in a dialog and be sortable does not work in FireFox
/*
$(document).ready(function(){
    $(".ui-menu").sortable({
        $(".ui-menu").find("input")
        .bind('mousedown.ui-disableSelection selectstart.ui-disableSelection', function(e) {
        e.stopImmediatePropagation();
        }
    });
}).disableSelection();

$(document).ready(function(){
    $(".ui-menu").find("input")
    .bind('mousedown.ui-disableSelection selectstart.ui-disableSelection', function(e) {
        e.stopImmediatePropagation();
    });
});
*/
