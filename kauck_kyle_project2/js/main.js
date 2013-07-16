/*
 *Kyle Kauck
 *ASD 1307
 *Warcraft Character Tracker Javascript
*/

$("#index").on("pageinit", function(){
    
    for (var i = 0, f = localStorage.length; i < f; i++) {
        
        var toonID = localStorage.key(i);
        var toonValue = localStorage.getItem(toonID);
        var toonInfo = JSON.parse(toonValue);
        if (toonInfo.role[0] === "Tank") {
        
        //Saves the key to a data-role in the button
            console.log(toonInfo.characterName[0] + "'s ID is: " + toonID);
            var toonList = $("<li></li>");
            var toonListInfo = $(
                "<img src='img/paladin.png'>"+
                "<h3>" + toonInfo.characterName[0] + "</h3>"+
                "<h4>" + toonInfo.serverName[0] + "</h4>"+
                "<p>" + toonInfo.race[0] + "</p>"+
                "<p>" + toonInfo.toonClass[0] + "</p>"+
                "<p>" + toonInfo.role[0] + "</p>"+
                "<p>" + toonInfo.specialization[0] + "</p>"+
                "<p>" + toonInfo.level[0] + "</p>"+
                "<p>" + toonInfo.itemLevel[0] + "</p>"+
                "<p>" + toonInfo.professions[0] + "</p>"+
                "<p>" + toonInfo.extraInfo[0] + "</p>"
            )
            
            
            toonList.html(toonListInfo);
            toonList.appendTo("#tankDisplay");
        
        } else if (toonInfo.role[0] === "Healer") {
            
            console.log(toonInfo.characterName[0] + "'s ID is: " + toonID);
            var toonList = $("<li></li>");
            var toonListInfo = $(
                "<img src='img/paladin.png'>"+
                "<h3>" + toonInfo.characterName[0] + "</h3>"+
                "<h4>" + toonInfo.serverName[0] + "</h4>"+
                "<p>" + toonInfo.race[0] + "</p>"+
                "<p>" + toonInfo.toonClass[0] + "</p>"+
                "<p>" + toonInfo.role[0] + "</p>"+
                "<p>" + toonInfo.specialization[0] + "</p>"+
                "<p>" + toonInfo.level[0] + "</p>"+
                "<p>" + toonInfo.itemLevel[0] + "</p>"+
                "<p>" + toonInfo.professions[0] + "</p>"+
                "<p>" + toonInfo.extraInfo[0] + "</p>"
            )
            
            
            toonList.html(toonListInfo);
            toonList.appendTo("#healerDisplay"); 
            
        } else if (toonInfo.role[0] === "DPS") {
            
            console.log(toonInfo.characterName[0] + "'s ID is: " + toonID);
            var toonList = $("<li></li>");
            var toonListInfo = $(
                "<img src='img/paladin.png'>"+
                "<h3>" + toonInfo.characterName[0] + "</h3>"+
                "<h4>" + toonInfo.serverName[0] + "</h4>"+
                "<p>" + toonInfo.race[0] + "</p>"+
                "<p>" + toonInfo.toonClass[0] + "</p>"+
                "<p>" + toonInfo.role[0] + "</p>"+
                "<p>" + toonInfo.specialization[0] + "</p>"+
                "<p>" + toonInfo.level[0] + "</p>"+
                "<p>" + toonInfo.itemLevel[0] + "</p>"+
                "<p>" + toonInfo.professions[0] + "</p>"+
                "<p>" + toonInfo.extraInfo[0] + "</p>"
            )
            
            
            toonList.html(toonListInfo);
            toonList.appendTo("#dpsDisplay"); 
            
        }
    }
    
    $("#tankDisplay").listview('refresh');
    $("#healerDisplay").listview('refresh');
    $("#dpsDisplay").listview('refresh');
    
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
    
    storeToon = function (data) {
        
        var toonKey = $("#keyStorage").val();
        
        console.log("This ID is: " + toonKey)
        
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
   
    if(localStorage.length === 0){
	alert("You currently have no toons saved in local storage.");
    }
    
    $("#displayList").append("<ul class='gameListUL'></ul>")

    for (var i = 0, f = localStorage.length; i < f; i++) {
        
        var toonID = localStorage.key(i);
        var toonValue = localStorage.getItem(toonID);
        var toonInfo = JSON.parse(toonValue);

        //Saves the key to a data-role in the button
        console.log(toonInfo.characterName[0] + "'s ID is: " + toonID);
        var toonList = $("<li></li>");
        var toonListInfo = $(
            "<img src='img/paladin.png'>"+
            "<h3>" + toonInfo.characterName[0] + "</h3>"+
            "<h4>" + toonInfo.serverName[0] + "</h4>"+
            "<p>" + toonInfo.race[0] + "</p>"+
            "<p>" + toonInfo.toonClass[0] + "</p>"+
            "<p>" + toonInfo.role[0] + "</p>"+
            "<p>" + toonInfo.specialization[0] + "</p>"+
            "<p>" + toonInfo.level[0] + "</p>"+
            "<p>" + toonInfo.itemLevel[0] + "</p>"+
            "<p>" + toonInfo.professions[0] + "</p>"+
            "<p>" + toonInfo.extraInfo[0] + "</p>"+
            "<a href='#' class='deleteToon' data-key=" + toonID + ">Delete This Toon</a>"
        )
        var deleteButton = $("<a href='#' class='deleteToon' data-key=" + toonID + ">Delete This Toon</a>");
        var editLink = $("<a href='#' class='editToon' id=" + toonID + ">Edit This Toon</a>");
        editLink.html(toonListInfo);
        toonList.append(editLink).appendTo("#toonDisplay");
        
        editLink.on('click', function() {
            var toonKey = this.id
            editToon(toonKey)
            console.log("My ID is: " + toonKey)
        });
    };
    
    $("#toonDisplay").listview('refresh');
    
    $(".deleteToon").on("click", function (){

        var confirmDelete = confirm("Please confirm that you would like to delete this game.");
            if (confirmDelete) {
                //Pulls the Key for selected item in Local Storage
                localStorage.removeItem($(this).attr('data-key'));
                alert("This game was successfully deleted from storage.")
                window.location.reload();
            } else {
                alert("Your game was not deleted.");
                window.location.reload("#index");
            }
    });
        
    //$(".editToon").on("click", function() {
      
    editToon = function(toonKey){    
        
        $.mobile.changePage('#addCharacter');
        
        //var toonKey = this.id;
        var toonInfo = localStorage.getItem(toonKey);
        var toonLibrary = JSON.parse(toonInfo);
    
        $("#characterName").val(toonLibrary.characterName[0]);
        $("#serverName").val(toonLibrary.serverName[0]);
        $("#race").val(toonLibrary.race[0]).selectmenu();
        $("#race").selectmenu('refresh');
        $("#class").val(toonLibrary.toonClass[0]).selectmenu();
        $("#class").selectmenu('refresh');
        $("#role").val(toonLibrary.role[0]).selectmenu();
        $("#role").selectmenu('refresh');
        $("#specialization").val(toonLibrary.specialization[0]);
        $("#level").val(toonLibrary.level[0]).slider('refresh');
        $("#itemLevel").val(toonLibrary.itemLevel[0]);
        $("#professions").val(toonLibrary.professions[0]);
        $("#extraInfo").val(toonLibrary.extraInfo[0]);
        $("#keyStorage").val(toonKey);
        
        //saveInfo.removeEventListener("click", storeData);
        $("#submitCharacter").val("Edit My Toon!");
        $("#submitCharacter").button('refresh');
        //$("#submitCharacter").on("click", storeToon);

        /*var gameEditor = $("#submitGame");
        //gameEditor.addEventListener("click", fieldCheck);
        gameEditor.key = this.key;*/
            
    };

});