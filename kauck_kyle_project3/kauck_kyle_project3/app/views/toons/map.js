function (doc) {
	if(doc._id.substr(0, 6) === "d4f14e") {
		emit(doc._id, {
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