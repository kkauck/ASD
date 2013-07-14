/*
 *Kyle Kauck
 *ASD 1307
 *Warcraft Character Tracker Javascript
*/

$("#index").on("pageinit", function(){
    //...
});

$("#addCharacter").on("pageinit", function() {
    
    $("#characterAdd").validate({
        invalidHandler: function(form, validator) {
            $("#errors").empty();
            for (var errorKey in validator.submitted){
                var errorLabel = $('label[for^="'+ errorKey +'"]').not('.error');
                $("#errors").append("<span>" + errorLabel.text() +"</span>");
            };
        },
		
        submitHandler: function() {
            var data = $("#characterAdd").serializeArray();
            storeToon(data);
            window.location.reload();
        }
    
    });
    
    storeToon = function (data, toonKey) {
        if (!toonKey) {
            var idGenerator = Math.floor(Math.random()*1000000000);
        } else {
            idGenerator = toonKey;    
        }
                
        var idGenerator = Math.floor(Math.random()*1000000000);
        var toonLibrary = {
            characterName  :[$("#characterName").val()],
            serverName     :[$("#serverName").val()],
            race           :[$("#race").val()],
            class          :[$("#class").val()],
            roll           :[$("#role").val()],
            specialization :[$("#specialization").val()],
            level          :[$("#level").val()],
            itemLevel      :[$("#itemLevel").val()],
            professions    :[$("#professions").val()],
            extraInfo      :[$("#extraInfo").val()],
        };
        localStorage.setItem(idGenerator, JSON.stringify(toonLibrary));
        alert("Your Toon Inforamtion Has Been Saved!");
        
    };

});

$("#display").on("pageinit", function () {
    
   
    if(localStorage.length === 0){
	alert("You currently have no toons saved in local storage.");
    }
    
    $("#displayList").append("<ul class='gameListUL'></ul>")

    for (var i = 0, f = localStorage.length; i < f; i++) {
        $(".gameListUL").append("<li class='holdingLI'></li>");
        $("<ul class='toonDisplay'></ul>").appendTo(".holdingLI:last");
        var toonID = localStorage.key(i);
        var toonValue = localStorage.getItem(toonID);
        console.log (toonID);
        var toonInfo = JSON.parse(toonValue);
        for (var x in toonInfo) {
            var toonInfoText = toonInfo[x][0];
            console.log (toonInfoText)
            $("<li class='toonDisplayInfo'>" + toonInfoText + "</li>").appendTo(".toonDisplay:last");
        };
        //Saves the key to a data-role in the button
        $(".toonDisplay:last").append("<button id='deleteToon' data-key=" + toonID + ">Delete This Toon</button>");
        $(".toonDisplay:last").append("<button id='editToon' data-key=" + toonID + ">Edit This Toon</button>");
    };
    
    $("#deleteToon").on("click", function (){

        var confirmDelete = confirm("Please confirm that you would like to delete this game.");
            if (confirmDelete) {
                //Pulls the Key for selected item in Local Storage
                localStorage.removeItem($(this).attr('data-key'));
                alert("This game was successfully deleted from storage.")
                window.location.reload('refresh');
            } else {
                alert("Your game was not deleted.");
            }
    });
        
    $("#editToon").on("click", function() {
        
        $("#editToon").load('#addCharacter');
        
    });

});