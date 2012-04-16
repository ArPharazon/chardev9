var SpellItemEnchantmentTooltip = {
	/**
	 * @param {enchant} enchant
	 */
	 getDescription: function( enchant ) {
			var str = enchant.description;
			
			if( ! str ) {
				return "";
			}
			
			str = str.replace(/\$k(\d)/g,function(str,p1){ return enchant.values[p1-1]; });
			return str.replace(/\$i\b/g, enchant.spellIds[0]);
	},
	/**
	 * @param {enchant} enchant
	 * @param {Character} characterScope
	 * @returns {string}
	 */
	getHtml : function( enchant, characterScope )
	{
		var html = "<table cellpadding = 0 cellspacing = 0>";
		var fitsLevelReqs = enchant.fitsLevelRequirements(characterScope);
		var fitsSkillReqs = enchant.fitsSkillLineRequirements(characterScope);
		var fitsGemConditions = enchant.isGemActive(characterScope);
		var desc;
		
		if( enchant.types[0] == 7 ) {
			desc = locale["use"]+": " + enchant.spells[0].getDescription(characterScope).join("<br />");
		}
		else {
			desc = SpellItemEnchantmentTooltip.getDescription(enchant);
		}
		

		html += Tools.addTr1("<span "+( fitsSkillReqs && fitsLevelReqs ? ( fitsGemConditions ? "class='green'" : "class='grey'" ):"class='red'")+">"+desc + "</span>");
		
		if( !fitsLevelReqs )
		{
			html += Tools.addTr1(
				"<span class='red'>" +
				TextIO.sprintf1(locale['reqLevel'],enchant.requiredCharacterLevel)+
				"</span>"
			);
		}
		if( !fitsSkillReqs )
		{
			html += Tools.addTr1(
				"<span class='red'>" +
				locale['req']+" "+enchant.requiredSkillLine.name+" ("+enchant.requiredSkillLineLevel+")"+
				"</span>"
			);
		}
		return html + "</table>";
	}
};