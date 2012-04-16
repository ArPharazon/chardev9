/**
 * @constructor
 */
function TalentsGui () {
	this.node = DOM.create("div");
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent(["click"], ["row","col"]);
}

TalentsGui.prototype = {
		node: null,
		eventMgr: null,
		links: null,
		grid: null,
		facades: null,
		talents: null,
		init: function( facades ) {
			var a;
			var rows = facades.length;
			var cols = facades[0].length;
			
			this.grid = new StaticGrid(rows,cols+2);
			this.links = [];
			this.facades = facades;
			this.talents = [];
			
			this.grid.node.className = "ts_grid";
			
			for( var i=0; i<rows; i++ ) {
				this.links[i] = [];
				this.talents[i] = [];
				
				DOM.createAt(this.grid.cells[i][0], "div", {"class": "ts_tier", "text": (i+1)*15});
				
				for ( var j = 0; j < cols; j++) {
					var cell = this.grid.cells[i][j+1];
					var facade = facades[i][j];
					
					var talentParent = DOM.createAt(cell,"div",{"class": "ts_talent_p"});
					var talentDiv = DOM.createAt(talentParent, "div", {"class": "ts_talent"});  
					
					var iconDiv = DOM.createAt(talentDiv, "div", {"class": "ts_icon_p"});
					var icon = DOM.createAt(iconDiv, "img", {"class": "ts_icon", "src": "/images/icons/g/half/" + facade.getIcon() + ".png"});
					
					a = DOM.createAt(talentParent, "a", { "href": "javascript:;", "class": "ts_talent_title_p"});
					DOM.createAt(a,"span",{"text": facade.getName(), "class": "ts_talent_title"});
					
					Listener.add(a, "click", this.eventMgr.fire, this.eventMgr, ["click", {"row": i, "col": j}]);
					Listener.add(a, "mouseover", Tooltip.show, Tooltip, [facade.getTooltip()]);
					Listener.add(a, "mouseout", Tooltip.hide, Tooltip);
					Listener.add(a, "mousemove", Tooltip.move, Tooltip);
					
					this.talents[i][j] = [talentDiv, icon, a];
					
					this.links[i][j] = a;
				}
				
				this.grid.cells[i][cols+1].className = 'ts_right_end';
			}
			
			DOM.set(this.node, this.grid.node);
		},
		select: function( row, col) {
			DOM.addClass(this.talents[row][col][0],'ts_talent_active');
			this.talents[row][col][1].src = "/images/icons/half/" + this.facades[row][col].getIcon() + ".png";
			this.talents[row][col][1].style.borderColor = '#dcb531';
			this.talents[row][col][2].style.color = '#e0e0e0';
		},
		deselect: function( row, col) {
			DOM.removeClass(this.talents[row][col][0],'ts_talent_active');
			this.talents[row][col][1].src = "/images/icons/g/half/" + this.facades[row][col].getIcon() + ".png";
			this.talents[row][col][1].style.borderColor = '';
			this.talents[row][col][2].style.color = '';
		},
		addObserver: function( observer ) {
			this.eventMgr.addObserver(observer);
		}
};