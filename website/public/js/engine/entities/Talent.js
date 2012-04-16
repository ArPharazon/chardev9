/**
 * @constructor
 * @param {Array} serialized
 */
function Talent( serialized ){
	this.id = serialized[0];
	this.spell = new Spell(serialized[1]); 
}

Talent.prototype = {
		id: 0,
		selected: false,
		spell: null
};