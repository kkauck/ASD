function (doc) {
	if(doc.toonKey.substr(0, 9) === "character") {
		emit(doc.toonKey.substr(9), {
			"id"             : doc._id,
			"rev"            : doc._rev,
			"characterName"  : doc.characterName,
			"serverName"     : doc.serverName,
			"race"           : doc.race,
			"toonClass"      : doc.toonClass,
			"role"           : doc.role,
			"specialization" : doc.specialization,
			"level"          : doc.level,
			"itemLevel"      : doc.itemLevel,
			"professions"    : doc.professions,
			"extraInfo"      : doc.extraInfo
		});
	}
};