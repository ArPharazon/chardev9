/**
 * @constructor
 * @param {Talents} talents
 * @param {TalentsGui} talentsGui
 * @param {Character} character
 */
function TalentsAdapter( talents, talentsGui, character ) {
	
	var facades = [];
	for( var i=0; i<talents.talents.length; i++ ) {
		facades[i] = [];
		for( var j=0; j<talents.talents[i].length; j++ ) {
			facades[i][j] = new TalentFacade(talents.talents[i][j], character); 
		}
	}
	
	talentsGui.init(facades);
	
	talents.addObserver(new GenericObserver(["select","deselect"], new Handler(function(e){
		switch( e.event ) {
		case "select":
			talentsGui.select(e.get("row"), e.get("col"));
			break;
		case "deselect":
			talentsGui.deselect(e.get("row"), e.get("col"));
			break;
		}
	}, this)));
	
	talentsGui.addObserver(new GenericObserver(["click"], new Handler(function(e){
		switch( e.event ) {
		case "click":
			talents.toggle(e.get("row"), e.get("col"));
			break;
		}
	}, this)));
}