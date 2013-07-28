/*
 *Kyle Kauck
 *ASD 1307
 *Warcraft Character Tracker Javascript
*/

$("#index").on("pageinit", function(){
    
    //Keeping code in case need to add in more information!
    
});

$(document).on("pageinit", "#toon", function() {
	
	var urlData = $(this).data("url");
	var urlParts = urlData.split("?");
	var urlPairs = urlParts[1].split("&");
	
	var urlValues = {};
	for (var i in urlPairs){
		var keyValue = urlPairs[i].split("=");
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	
	var keyInfo = urlValues["toon"];
	
	$.couch.db("toontracker").view("toontrackerdb/toons", {
	
		key: keyInfo,
		
		success: function(toonData){
		
			$.each(toonData.rows, function(index, toonInfo) {
				var toonItem = (toonInfo.value || toonInfo.doc)
				
				var toonDoc = {
					"id"  : toonItem.id,
					"rev" : toonItem.rev, 
				};
				
				$("#deleteToon").attr("href", "delete.html?toon=" + toonItem.characterName)
				
				if (toonItem.toonClass === "Warrior") {
			            var imgTag = "<img src='warrior.png' />"
			       } else if (toonItem.toonClass === "Paladin") {
			            var imgTag = "<img src='paladin.png' />"
			       } else if (toonItem.toonClass === "Death Knight") {
			               var imgTag = "<img src='deathknight.png' />"
			       } else if (toonItem.toonClass === "Druid") {
			                var imgTag = "<img src='druid.png' />"
		           } else if (toonItem.toonClass === "Monk") {
		                var imgTag = "<img src='monk.png' />"
	    	       } else if (toonItem.toonClass === "Warlock") {
			                var imgTag = "<img src='warlock.png' />"
			       } else if (toonItem.toonClass === "Shaman") {
			                var imgTag = "<img src='shaman.png' />"
			       } else if (toonItem.toonClass === "Rogue") {
			                var imgTag = "<img src='rogue.png' />"
			       } else if (toonItem.toonClass === "Priest") {
			                var imgTag = "<img src='priest.png' />"
			       } else if (toonItem.toonClass === "Mage") {
			                var imgTag = "<img src='mage.png' />"
			       } else if (toonItem.toonClass === "Hunter") {
			                var imgTag = "<img src='hunter.png' />"
			       }
				
				//$("#toonInfo").append(
					//$("<li>").append(
					var toonLI = $("<li></li>");
					var toonDisplayInfo = $(
						imgTag +
						"<h3>" + toonItem.characterName + "</h3>" +
						"<p>" + toonItem.serverName + "</p>" +
						"<p>" + toonItem.race + "</p>" +
						"<p>" + toonItem.toonClass + "</p>" +
						"<p>" + toonItem.role + "</p>" +
						"<p>" + toonItem.specialization + "</p>" +
						"<p>" + toonItem.level + "</p>" +
						"<p>" + toonItem.itemLevel + "</p>" +
						"<p>" + toonItem.professions + "</p>" +
						"<p>" + toonItem.extraInfo + "</p>"
					);
					toonLI.append(toonDisplayInfo).appendTo("#toonInfo");
			});
			$("#toonInfo").listview('refresh');
		}
		
	});
	
});

$(document).on("pageinit", "#delete", function (){
	
	var urlData = $(this).data("url");
	var urlParts = urlData.split("?");
	var urlPairs = urlParts[1].split("&");
	
	var urlValues = {};
	for (var i in urlPairs){
		var keyValue = urlPairs[i].split("=");
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	
	var keyInfo = urlValues["toon"];
	
	$.couch.db("toontracker").view("toontrackerdb/toons", {
		
		key: keyInfo,
		success: function(toonData){
			
			$.each(toonData.rows, function(index, toonInfo) {
				var toonItem = (toonInfo.value || toonInfo.doc)
				
				var doc = {
					_id   : toonItem.id,
					_rev  : toonItem.rev
				}
				
				var toonDoc = {
					_id  : toonItem.id,
					_rev : toonItem.rev,
					name : toonItem.characterName,
				};
				
				//Displays name at the top of the page
				$("#deleteName").html("Please confirm you would like to delete " + toonDoc.name)
				
				//Popluates the delete form!
				$("#toonName").val(toonDoc.name);
				$("#toonID").val(toonDoc._id);
				$("#toonRev").val(toonDoc._rev);
				
				$(".deleteThisToon").on("click", function (){

			        var confirmDelete = confirm("Please confirm that you would like to delete " + toonDoc.name);
			            if (confirmDelete) {
			                //Deletes item from Database
			                $.couch.db("toontracker").removeDoc(doc, {
				                success: function(data) {
				                	alert("This toon was successfully deleted from the database!")
					                $.mobile.changePage("index.html");
				                }
			                });
			                } else {
			                alert("Your toon was not deleted.");
			                $.mobile.changePage("index.html");
			            }
			     })
				
			});
		}
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
            toonStorage(data);
            window.location.reload();
        }
    
    });
    
    toonStorage = function (data) {
	    
	    var toonData = {
	   
	    	"characterName"  : $("#characterName").val(),
	    	"serverName"     : $("#serverName").val(),
            "race"           : $("#race").val(),
            "toonClass"      : $("#class").val(),
            "role"           : $("#role").val(),
            "specialization" : $("#specialization").val(),
            "level"          : $("#level").val(),
            "itemLevel"      : $("#itemLevel").val(),
            "professions"    : $("#professions").val(),
            "extraInfo"      : $("#extraInfo").val(),
            "toonKey"        : $("#toonKey").val() + $("#characterName").val(),
            
	    };
	    
	    $.couch.db("toontracker").saveDoc(toonData, {
		   
		   success: function(data) {
		   	   console.log (data)
		   },
		   error: function(status) {
			   console.log (status)
		   }
	    });
	    
	    alert("Your data has been saved to the Database!");
	    
    };
    
    /*storeToon = function (data) {
        
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
        
    };*/

});

$("#display").on("pageinit", function (toonLibrary) {

	$.couch.db("toontracker").view("toontrackerdb/toons", {
	    success: function(toonData) {
	    	
	    //$.mobile.changePage("#dbDisplay");
			$("#toonDisplay").empty();
			    	
			$.each(toonData.rows, function(index, toonInfo) {
				var toonItem = (toonInfo.value || toonInfo.doc);
				$("#toonDisplay").append(
					$("<li>").append(
				    	$("<a>")
				    		.attr("href", "toon.html?toon=" + toonItem.characterName)
				    		.text(toonItem.characterName + " (" + toonItem.toonClass + ")")
				    	)
				    );
			});
		    $("#toonDisplay").listview("refresh");
		 }
	});
    
    /*$("#displayList").append("<ul class='gameListUL'></ul>")

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
    });*/

});