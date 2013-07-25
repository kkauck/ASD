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
        
        //Dynamically generates image based on toons class
        if (toonInfo.toonClass[0] === "Warrior") {
            var imgTag = "<img src='warrior.png' />"
        } else if (toonInfo.toonClass[0] === "Paladin") {
                var imgTag = "<img src='paladin.png' />"
        } else if (toonInfo.toonClass[0] === "Death Knight") {
                var imgTag = "<img src='deathknight.png' />"
        } else if (toonInfo.toonClass[0] === "Druid") {
                var imgTag = "<img src='druid.png' />"
        } else if (toonInfo.toonClass[0] === "Monk") {
                var imgTag = "<img src='monk.png' />"
        } else if (toonInfo.toonClass[0] === "Warlock") {
                var imgTag = "<img src='warlock.png' />"
        } else if (toonInfo.toonClass[0] === "Shaman") {
                var imgTag = "<img src='shaman.png' />"
        } else if (toonInfo.toonClass[0] === "Rogue") {
                var imgTag = "<img src='rogue.png' />"
        } else if (toonInfo.toonClass[0] === "Priest") {
                var imgTag = "<img src='priest.png' />"
        } else if (toonInfo.toonClass[0] === "Mage") {
                var imgTag = "<img src='mage.png' />"
        } else if (toonInfo.toonClass[0] === "Hunter") {
                var imgTag = "<img src='hunter.png' />"
        }
        
        if (toonInfo.role[0] === "Tank") {
        
            
            //Creates the listview data
            var toonList = $("<li data-role='collapsible'></li>");
            var toonListInfo = $(
                imgTag +
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

            var toonList = $("<li></li>");
            var toonListInfo = $(
                imgTag+
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

            var toonList = $("<li></li>");
            var toonListInfo = $(
                imgTag +
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
    
    //Refresh the main page listviews to display proper styles
    $("#tankDisplay").listview('refresh');
    $("#healerDisplay").listview('refresh');
    $("#dpsDisplay").listview('refresh');
    
    
    //Loads in my JSON Data to Local Storage
    $(".loadJSON").on("click", function(){
        
        $.ajax({
            url: "data.json",
            type: "GET",
            dataType: "json",
            success: function(toonData) {
                $.each(toonData.toonInfo, function(index, singleToon){
                    var idGen = Math.floor(Math.random()*1000000000);
                    var storeToon = JSON.stringify(singleToon);
                    localStorage.setItem(idGen, storeToon)
                    //console.log("Saved item " + singleToon + " to Local Storage with a ID of: " + idGen)
                })
                alert ("JSON Data has been successfully loaded into storage!");
                window.location.reload();
                //console.log(response.toonInfo[1].characterName);
            },
            error: function(error, errorparse){
                console.log(error, errorparse)
            }
        });
        
    });
    
    //Loads in my XML Data to Local Storage
    $(".loadXML").on("click", function(){
        
        $.ajax({
            url: "data.xml",
            type: "GET",
            dataType: "xml",
            success: function(toonDataXML) {
                $('toonInfo', toonDataXML).each(function(){
                    var idGen = Math.floor(Math.random()*1000000000);
                    var storeToon = {
                        characterName  :[$("characterName", this).text()],
                        serverName     :[$("serverName", this).text()],
                        race           :[$("race", this).text()],
                        toonClass      :[$("toonClass", this).text()],
                        role           :[$("role", this).text()],
                        specialization :[$("specialization", this).text()],
                        level          :[$("level", this).text()],
                        itemLevel      :[$("itemLevel", this).text()],
                        professions    :[$("professions", this).text()],
                        extraInfo      :[$("extraInfo", this).text()],
                    }
                    localStorage.setItem(idGen, JSON.stringify(storeToon))
                    //console.log(storeToon)
                });
                alert ("XML Data has been successfully loaded into storage!");
                window.location.reload();
            },
            error: function(error, errorparse){
                console.log(error, errorparse)
            }
        });
        
    });
    
    //Loads in my Database Data to Display
    $(".loadDB").on("click", function() {
    
    	$.couch.db("toontracker").view("toontrackerdb/toons", {
	    	success: function(toonData) {
	    	
	    		$.mobile.changePage("#dbDisplay");
		    	$("#displayToonDB").empty();
		    	
		    	$.each(toonData.rows, function(index, toonInfo) {
			    	var toonItem = (toonInfo.value || toonInfo.doc);
			    	$("#displayToonDB").append(
			    		$("<li>").append(
			    			$("<a>")
			    			.attr("href", "display.html?display=" + toonItem.characterName)
			    			.text(toonItem.characterName + " (" + toonItem.toonClass + ")")
			    		)
			    	);
		    	})
		    	$("#displayToonDB").listview("refresh");
	    	}
    	});
	   
	   /*$.ajax({
		   url: "_view/toons",
		   type: "GET",
		   dataType: "json",
		   success: function(toonData) {
		   
		       $.mobile.changePage('#dbDisplay');
		       $("#displayToonDB").empty();
		   
		       $.each(toonData.rows, function(index, toonInfo) {
		       
		           if (toonInfo.value.toonClass === "Warrior") {
			            var imgTag = "<img src='warrior.png' />"
			       } else if (toonInfo.value.toonClass === "Paladin") {
			            var imgTag = "<img src='paladin.png' />"
			       } else if (toonInfo.value.toonClass === "Death Knight") {
			               var imgTag = "<img src='deathknight.png' />"
			       } else if (toonInfo.value.toonClass === "Druid") {
			                var imgTag = "<img src='druid.png' />"
		           } else if (toonInfo.value.toonClass === "Monk") {
		                var imgTag = "<img src='monk.png' />"
	    	       } else if (toonInfo.value.toonClass === "Warlock") {
			                var imgTag = "<img src='warlock.png' />"
			       } else if (toonInfo.value.toonClass === "Shaman") {
			                var imgTag = "<img src='shaman.png' />"
			       } else if (toonInfo.value.toonClass === "Rogue") {
			                var imgTag = "<img src='rogue.png' />"
			       } else if (toonInfo.value.toonClass === "Priest") {
			                var imgTag = "<img src='priest.png' />"
			       } else if (toonInfo.value.toonClass === "Mage") {
			                var imgTag = "<img src='mage.png' />"
			       } else if (toonInfo.value.toonClass === "Hunter") {
			                var imgTag = "<img src='hunter.png' />"
			       }
		       
			       var characterName  = toonInfo.value.characterName;
			       var serverName     = toonInfo.value.serverName;
			       var race           = toonInfo.value.race;
			       var toonClass      = toonInfo.value.toonClass;
			       var role           = toonInfo.value.role;
			       var specialization = toonInfo.value.specialization;
			       var level          = toonInfo.value.level;
			       var itemLevel      = toonInfo.value.itemLevel;
			       var professions    = toonInfo.value.professions;
			       var extraInfo      = toonInfo.value.extraInfo;
			       
			       $("#displayToonDB").append(
			           $("<li>").append(
			               imgTag +
			               "<h3>" + characterName + "</h3>" +
			               "<p>" + serverName + "</p>" +
			               "<p>" + race + "</p>" +
			               "<p>" + toonClass + "</p>" +
			               "<p>" + role + "</p>" +
			               "<p>" + specialization + "</p>" +
			               "<p>" + level + "</p>" +
			               "<p>" + itemLevel + "</p>" +
			               "<p>" + professions + "</p>" +
			               "<p>" + extraInfo + "</p>" 
			           )
                   );
		       });
		       $("#displayToonDB").listview('refresh');
		   }
		   
	   });*/
	    
    });
    
});

$("#addCharacter").on("pageinit", function() {
    
    $("#characterAdd").validate({
        invalidHandler: function(form, validator) {
            $("#errors").empty();
            $("#characterAdd").prepend("<p id='errors'></p>")
            $("#errors").append("<span class='errorText'>Please recheck these required fields...</span>")
            for (var errorKey in validator.submitted){
                var errorLabel = $('label[for^="'+ errorKey +'"]').not('.error');
                $("#errors").append("<span class='errorText'>" + errorLabel.text() +"</span>");
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
        
        //console.log("This ID is: " + toonKey)
        
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
        
        //console.log(idGen);
        
        localStorage.setItem(idGen, JSON.stringify(toonLibrary));
        alert("Your Toon Inforamtion Has Been Saved!");
        
    };

});

$("#display").on("pageinit", function (toonLibrary) {
    
    $("#displayList").append("<ul class='gameListUL'></ul>")

    for (var i = 0, f = localStorage.length; i < f; i++) {
        
        var toonID = localStorage.key(i);
        var toonValue = localStorage.getItem(toonID);
        var toonInfo = JSON.parse(toonValue);
        
        //Dynamically generates images based on the toons class
        if (toonInfo.toonClass[0] === "Warrior") {
            var imgTag = "<img src='warrior.png' />"
        } else if (toonInfo.toonClass[0] === "Paladin") {
                var imgTag = "<img src='paladin.png' />"
        } else if (toonInfo.toonClass[0] === "Death Knight") {
                var imgTag = "<img src='deathknight.png' />"
        } else if (toonInfo.toonClass[0] === "Druid") {
                var imgTag = "<img src='druid.png' />"
        } else if (toonInfo.toonClass[0] === "Monk") {
                var imgTag = "<img src='monk.png' />"
        } else if (toonInfo.toonClass[0] === "Warlock") {
                var imgTag = "<img src='warlock.png' />"
        } else if (toonInfo.toonClass[0] === "Shaman") {
                var imgTag = "<img src='shaman.png' />"
        } else if (toonInfo.toonClass[0] === "Rogue") {
                var imgTag = "<img src='rogue.png' />"
        } else if (toonInfo.toonClass[0] === "Priest") {
                var imgTag = "<img src='priest.png' />"
        } else if (toonInfo.toonClass[0] === "Mage") {
                var imgTag = "<img src='mage.png' />"
        } else if (toonInfo.toonClass[0] === "Hunter") {
                var imgTag = "<img src='hunter.png' />"
        }

        //console.log (toonInfo)
        
        //Saves the key to a data-role in the button
        //console.log(toonInfo.characterName[0] + "'s ID is: " + toonID);
        var toonList = $("<li></li>");
        var toonListInfo = $(
            imgTag+
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
            "<button class='deleteToon' data-key=" + toonID + ">Delete This Toon!</button>"
        )
        var editLink = $("<a href='#' class='editToon' id=" + toonID + ">Edit This Toon</a>");
        editLink.html(toonListInfo);
        toonList.append(editLink).appendTo("#toonDisplay");
        
        editLink.on('click', function() {
            var toonKey = this.id
            editToon(toonKey)
            //console.log("My ID is: " + toonKey)
        });
    };
    
    $("#toonDisplay").listview('refresh')
    
    $(".deleteToon").on("click", function (){

        var confirmDelete = confirm("Please confirm that you would like to delete this toon.");
            if (confirmDelete) {
                //Pulls the Key for selected item in Local Storage
                localStorage.removeItem($(this).attr('data-key'));
                alert("This toon was successfully deleted from storage.")
                window.location.reload("#index");
            } else {
                alert("Your toon was not deleted.");
                window.location.reload();
            }
    });
      
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
        
        $("#submitCharacter").val("Edit My Toon!");
        $("#submitCharacter").button('refresh');

    };
    
    $("#clearData").on("click", function(){
        if(localStorage.length === 0){
            alert("You have no toons saved to storage");
            window.location.reload("#index");
        } else {
            var confirmClear = confirm("Are you sure you want to delete all stored toons?")
            if (confirmClear) {
                localStorage.clear();
                alert("You have successfully cleared all stored data!");
                $.mobile.changePage('#index');
                window.location.reload();
            } else {
                alert("Your saved data has not been deleted!");
                window.location.reload();
            }
        }
    });

});