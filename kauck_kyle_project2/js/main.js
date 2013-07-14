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
            var idGen = Math.floor(Math.random()*1000000000);
        } else {
            idGen = toonKey;    
        }
        
        var toonLibrary = {
            characterName  :[$("#characterName").val()],
            serverName     :[$("#serverName").val()],
            race           :[$("#race").val()],
            toonClass      :[$("#class").val()],
            role           :[$("#role").val()],
            specialization :[$("#specialization").val()],
            level          :[$("#level").val()],
            itemLevel      :[$("#itemLevel").val()],
            professions    :[$("#professions").val()],
            extraInfo      :[$("#extraInfo").val()],
        };
        
        console.log(idGen);
        
        localStorage.setItem(idGen, JSON.stringify(toonLibrary));
        alert("Your Toon Inforamtion Has Been Saved!");
        
    };

});

$("#display").on("pageinit", function (toonLibrary) {
    
    console.log (toonLibrary);
   
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
        $(".toonDisplay:last").append("<button class='deleteToon' data-key=" + toonID + ">Delete This Toon</button>");
        $(".toonDisplay:last").append("<button class='editToon' data-key=" + toonID + ">Edit This Toon</button>");
    };
    
    $(".deleteToon").on("click", function (){

        var confirmDelete = confirm("Please confirm that you would like to delete this game.");
            if (confirmDelete) {
                //Pulls the Key for selected item in Local Storage
                localStorage.removeItem($(this).attr('data-key'));
                alert("This game was successfully deleted from storage.")
                window.location.reload();
            } else {
                alert("Your game was not deleted.");
            }
    });
        
    $(".editToon").on("click", function() {
        
        window.location = '#addCharacter'
        
        var toonKey = $(this).attr('data-key');
        var toonInfo = localStorage.getItem($(this).attr('data-key'));
        var toonLibrary = JSON.parse(toonInfo);
    
        console.log(toonLibrary);
        console.log(toonKey)
    
        $("#characterName").val(toonLibrary.characterName[0]);
        $("#serverName").val(toonLibrary.serverName[0]);
        $("#race").val(toonLibrary.race[0]).selectmenu('refresh');
        $("#class").val(toonLibrary.toonClass[0]).selectmenu('refresh');
        $("#role").val(toonLibrary.role[0]).selectmenu('refresh');
        $("#specialization").val(toonLibrary.specialization[0]);
        $("#level").val(toonLibrary.level[0]).slider('refresh');
        $("#itemLevel").val(toonLibrary.itemLevel[0]);
        $("#professions").val(toonLibrary.professions[0]);
        $("#extraInfo").val(toonLibrary.extraInfo[0]);
        
        //saveInfo.removeEventListener("click", storeData);
        $("#submitCharacter").val("Edit My Toon!");
        $("#submitCharacter").button('refresh');
        //$("#submitCharacter").on("click", storeToon);

        /*var gameEditor = $("#submitGame");
        //gameEditor.addEventListener("click", fieldCheck);
        gameEditor.key = this.key;*/
            
        });

});