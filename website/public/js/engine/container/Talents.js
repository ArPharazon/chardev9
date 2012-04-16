/**
 * @constructor
 * @param serialized
 */
function Talents ( serialized ) {
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent("select", ["row","col"]);
	this.eventMgr.registerEvent("deselect", ["row","col"]);
	
	this.id = serialized[0];
	this.talents = [];
	
	for( var row = 0; row < Talents.ROWS; row ++ ) {
		this.talents[row] = [null,null,null];
		for( var col = 0; col < Talents.COLUMNS; col++ ) {
			this.talents[row][col] = new Talent(serialized[1][row][col]);
		}
	}
}

Talents.ROWS = 6;
Talents.COLUMNS = 3;

Talents.prototype = {
		id: 0,
		talents: null,
		eventMgr: null,
		
		toggle: function( row, col, talents ) {
			
			if( ! this.talents[row][col].selected ) {
				for( var i = 0; i < row; i++ ) {
					var b = false;
					for( var j = 0; j < Talents.COLUMNS; j++ ) {
						if( this.talents[i][j].selected ) {
							b = true;
						}
					}
					if( ! b ) {
						return false;
					}
				}
				for( var j = 0; j < Talents.COLUMNS; j++ ) {
					if( this.talents[row][j].selected ) {
						this.talents[row][j].selected = false;
						this.eventMgr.fire( "deselect", { "row": row, "col": j });
					}
				}
				this.talents[row][col].selected = true;
				this.eventMgr.fire( "select", { "row": row, "col": col });
			}
			else {
				for( var i = row + 1; i < Talents.ROWS; i++ ) {
					for( var j = col; j < Talents.COLUMNS; j++ ) {
						if( this.talents[i][j].selected ) {
							return false;
						}
					}
				}
				this.talents[row][col].selected = false;
				this.eventMgr.fire( "deselect", { "row": row, "col": col });
			} 
		},
		addObserver: function( observer ){
			this.eventMgr.addObserver(observer);
		}
};