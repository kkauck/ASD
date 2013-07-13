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
            extraInfo      :[$("#extraInfo").val()]
        };
        localStorage.setItem(idGenerator, JSON.stringify(toonLibrary));
        alert("Your Toon Inforamtion Has Been Saved!");
        
    };

});

$("#display").on("pageinit", function () {
                
    if(localStorage.length === 0){
	alert("You currently have no toons saved in local storage.");
    }
    
    $("#displayList").append("<ul id='gameListUL' data-role='listview' data-filter='true' data-filter-placeholder='Search for a toon...'></ul>");
    $("#gameListUL").empty();

    for (var i = 0, f = localStorage.length; i < f; i++) {
        var toonID = localStorage.key(i);
        var toonValue = localStorage.getItem(toonID);
        console.log (toonValue);
        console.log (toonID);
        var toonInfo = JSON.parse(toonValue);
        $("#gameListUL").append("<li id='holdingLI'></li>");
        $("#holdingLI").append("<ul data-key=" + toonID + " id='toonDisplay'></ul>");
        for (var x in toonInfo) {
            var toonInfoText = toonInfo[x][0];
            console.log (toonInfoText)
            $("#toonDisplay").append("<li id='toonDisplayInfo'>" + toonInfoText + "</li>");
        };
    };

});