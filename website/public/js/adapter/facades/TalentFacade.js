/**
 * @constructor
 * @param {Talent} talent
 * @param {Character} character
 */
function TalentFacade( talent, character ) {
	this._talent = talent;
	this._character = character;
}

TalentFacade.prototype= {
		_talent: null,
		_character: null,
		getIcon: function() {
			return this._talent.spell.icon;
		},
		getName: function() {
			return this._talent.spell.name;
		},
		getTooltip: function() {
			//TODO: Replace by TalentTooltip
			return SpellTooltip.getHTML(this._talent.spell, this._character);
		}
};