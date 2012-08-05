var ListOfLines = new Array();
var MyNewLine = null;
var ListOfParticles = ["e","\u03BC","\u03C4","\u03BD","\u03BD","\u03BD","u","d","c","s","t","b","\u03B3","Z","w+","w-","H","g","p","n"];
var ColorOfParticles = ["#99CCFF","#CCCC00","#FF6600","#AAAAAA","#999999","#BBBBBB","#99FF00","#FF0000","#9900FF","#99CC00","#AAEE00","#CC9999","#FFEE00","#FFCC33","#990066","#CC00FF","#FF3300","#770077","#995533"];
var DescOfParticles= ["Electron : \n Composition : Elementary particle \n Statistics : Fermionic \n Generation : First \n Interactions	 : \n -Gravity, \n -Electromagnetic,\n -Weak \n Mass : 0.510998928 MeV/c \ Spin : 	1/2","Muon \n Composition :  Elementary particle \n Statistics : Fermionic \n Generation : Second \n Interactions : \n -Gravity \n -Electromagnetic \n -Weak \n Mass : 105.65836668(38) MeV/c2 \n Spin : 1/2","Tau \n Composition : Elementary particle \n Statistics : Fermionic \n Generation : Third \n Interactions : \n -Gravity \n -Electromagnetic \n -Weak \n Mass : 1,776.82±0.16 MeV/c2 \n Spin : 1/2","","","","","","","","","","","","","","","","",""]
var PanelDescription = null;
var TextDescription = null;
var gridSize=20;
var gParticleType=13;
var nstepx=0;
var nstepy=0;
var MySize=0;

function Feynman(div,reaction){
     
   //define if the usercan modify or not the graph
    var ReadOnly = 1;
    
    //allow to modifiy if the graph is read only or not 
    this.IsReadOnly=function(Bool){ ReadOnly= Bool;}
   
    // this variable will contain all lines of this graph 
   
    Tuples=JSON.parse(reaction);
	
    this.TuplesLength = Tuples.lines.length;
    this.maxX = 0;
    this.maxY = 0;
	
    for(i = 0 ; i<TuplesLength;i++)
    {
	   if(Tuples.lines[i][2]>maxX)
	   {
			maxX=Tuples.lines[i][2];
	   }
	   if(Tuples.lines[i][3]>maxY)
	   {
			maxY=Tuples.lines[i][3];
	   }
	   if(Tuples.lines[i][0]>maxX)
	   {
			maxX=Tuples.lines[i][0];
	   }
	   if(Tuples.lines[i][1]>maxY)
	   {
			maxY=Tuples.lines[i][1];
	   }
    }
	nstepx = paper.width / maxX;
	nstepy =  paper.height/ maxY;
	
	for(i = 0 ; i<TuplesLength;i++)
    {
	   MyNewLine = new Line(new Vertex( Tuples.lines[i][0]*nstepx,Tuples.lines[i][1]*nstepy),Tuples.lines[i][4],paper);
       MyNewLine.SetEndVertex(new Vertex(Tuples.lines[i][2]*nstepx,Tuples.lines[i][3]*nstepy));
	   ListOfLines[i] = MyNewLine;
    }
	
    for(i=0;i<ListOfLines.length;i++)
    {
		ListOfLines[i].Draw();
	}   
}
    
function Vertex(x,y){
	
	this.X=x;
	this.Y=y;
	
	this.GetX = function() {return this.X; }
	this.GetY  = function() {return this.Y; }
	this.SetX = function(x) { this.X=x; }
	this.SetY = function(y) { this.Y=y; }
	this.CheckRules = function() { 
		if(this.noLines == 1) return true;
		if(this.noLines == 2) return false;    
	}
	return this;
}
    

function Line(vert,pidA,paper){
	var startVertex = vert;     
	var endVertex;
	 var pid = pidA
	 
	this.SetEndVertex = function(endvert) {
		endVertex = endvert;
	}
	
	this.SetStartVertex = function(startvert) {
		startVertex = startvert;
	}
	
	this.Draw = function() {
		if((pid<13)||(Math.abs(pid)>18)) {
			if(pid>0) this.direction=1;
			else this.direction=-1;
			DrawStraightLine();
		} else {
			if(pid==13) DrawPhotonLine();
			else {
				if(pid<=17) DrawDashedLine();
				else DrawGluonLine();
			}
		}   
	}
        
	this.Delete = function() {
            
	}
        
	function DrawStraightLine() {
			
		// draw a straight line from startVertex to endVertex
					dir_angle = 0;
					if ( this.direction == -1 ) dir_angle = 180; //turn the arrow in the opposite direction
					path_string = "M"+ startVertex.GetX() + " " + startVertex.GetY()+ "L" + endVertex.GetX() + " " + endVertex.GetY();
		pathA = paper.path(path_string).attr("stroke", "black").attr("stroke-width", "2");
		//compute the mean point for the line
		mean = new Vertex((startVertex.GetX() + endVertex.GetX() ) / 2, (startVertex.GetY() + endVertex.GetY() ) / 2);
		//draw the arrow
		var angle = Math.atan2(startVertex.GetX()-endVertex.GetX(),endVertex.GetY()-startVertex.GetY());
		angle = (angle / (2 * Math.PI)) * 360;
		x2 = mean.GetX();
		y2 = mean.GetY();
		size = 8; // change it to change dimension of the arrow!!!
		if(pid>0)
		{
			textA=paper.text(x2,y2-nstepy/3,ListOfParticles[pid-1]);
		}
		else
		{
			
			textA=paper.text(x2,y2-nstepy/3,ListOfParticles[pid*-1-1]);
		}
		var sign=1;
		if(pid<0) sign=-1;
		var arrowPath = paper.path("M" + x2 + " " + y2 + " L" + (x2 - size) + " " + (y2 - size) + " L" + (x2 - size) + " " + (y2 + size) + " L" + x2 + " " + y2 ).attr("fill","black").rotate(sign* 90+angle+dir_angle,x2,y2);
		
		if(pid<0)
		{
			pid = pid*-1;
		}
		textA.attr({"font-size": nstepy/4 });
		textA.hover(function(){ this.attr ("fill", ColorOfParticles[pid-1] );MySize = this.attr('font-size'); this.attr({"font-size": MySize +20 }); }, function(){this.attr ("fill", "#000000");this.attr({"font-size": MySize })},textA, textA);
		pathA.hover(function(){ this.attr ("stroke", ColorOfParticles[pid-1] ); }, function(){this.attr ("stroke", "#000000");},pathA, pathA);
		pathA.hover(function(){ this.attr ("stroke", ColorOfParticles[pid-1] );this.attr("fill",ColorOfParticles[pid-1]); }, function(){this.attr ("stroke", "#000000");this.attr("fill","#000000");},arrowPath, arrowPath);
		pathA.hover(function(){ this.attr ("fill", ColorOfParticles[pid-1] );MySize = this.attr('font-size'); this.attr({"font-size": MySize +20 }); }, function(){this.attr ("fill", "#000000");this.attr({"font-size": MySize })},textA, textA);
		textA.hover(function(){this.attr ("stroke", ColorOfParticles[pid-1] ); }, function(){this.attr ("stroke", "#000000");},pathA, pathA);
		textA.hover(function(){this.attr ("stroke", ColorOfParticles[pid-1] );this.attr("fill",ColorOfParticles[pid-1]); }, function(){this.attr ("stroke", "#000000");this.attr("fill","#000000");},arrowPath, arrowPath);
		textA.click(function(){
			
		if(PanelDescription!=null)
		{
			PanelDescription.remove();
			TextDescription.remove();
		}
		PanelDescription = paper.rect(paper.width/4,paper.height/4,paper.width/2,paper.width/2,10).attr("fill","#EFEFEF").attr ("stroke", "#FEFEFE");
		PanelDescription.click(function(){this.remove();TextDescription.remove();});
		TextDescription = paper.text(paper.width/2,paper.height/2,DescOfParticles[pid-1]).attr("font-size", nstepy/10);
		TextDescription.click(function(){this.remove();PanelDescription.remove();});
		
		});
			
			
	}
        
	function DrawDashedLine() {
		path_string = "M"+ startVertex.GetX() + " " + startVertex.GetY()+ "L" + endVertex.GetX() + " " + endVertex.GetY();
		pathA =paper.path(path_string).attr("stroke", "black").attr("stroke-width", "2").attr("stroke-dasharray", "-");
            
		mean = new Vertex((startVertex.GetX() + endVertex.GetX() ) / 2, (startVertex.GetY() + endVertex.GetY() ) / 2);
		x2 = mean.GetX();
		y2 = mean.GetY();
		textA=paper.text(x2,y2-nstepy/3,ListOfParticles[pid-1]);
		textA.attr({"font-size": nstepy/4 });
		textA.hover(function(){this.attr ("fill", ColorOfParticles[pid-1] );MySize = this.attr('font-size'); this.attr({"font-size": MySize +20 }); }, function(){this.attr ("fill", "#000000");this.attr({"font-size": MySize })},textA, textA);
		pathA.hover(function(){ this.attr ("stroke", ColorOfParticles[pid-1] ); }, function(){this.attr ("stroke", "#000000");},pathA, pathA);
		pathA.hover(function(){ this.attr ("fill", ColorOfParticles[pid-1] );MySize = this.attr('font-size'); this.attr({"font-size": MySize +20 }); }, function(){this.attr ("fill", "#000000");this.attr({"font-size": MySize })},textA, textA);
		textA.hover(function(){this.attr ("stroke", ColorOfParticles[pid-1] ); }, function(){this.attr ("stroke", "#000000");},pathA, pathA);        
			
	}
			
    function svg_path_sin(x0, y0, x1, y1) {
        // sine path from 0 to rads radians scales by sx
        var N = 29;
        var pi = 3.141592653579;
        var dx=2*pi/N;
        var x=0;
        var px = x0;
        var py = y0;
        var p0 = "M"+ px +","+ py;
        var p = p0;
       
        for (var i=1;i<7*N;i++)
        {
            x += dx;
            y = Math.sin(x);
            px += (180.0/pi)*dx;
            py = 100 - 50*y;
            p += "L"+ px +","+ py;
        }
        p += " " + p0;
        
        //console.log("circ path : "+p);
        return p;
    }                    function svg_path_sin(x0, y0, len)
    {
        // sine path from 0 to rads radians scales by sx
        //var N = 29;
        var pi = 3.141592653579;
        //var dx=(2*pi/N);
                var dx = 0.5; // augment dx to get page load faster 
                var N = (len)/dx; 
               
        var x=0;
        var px = x0;
        var py = y0;
                var c = 10; //amplitude
                var wavelength = 20;
                var K = Math.floor((len)/wavelength);
                var w = (2*pi*K)/(len); // pulse
        var p0 = "M"+ px +","+ py;
        var p = p0;
       
        for (var i=1;i<=N;i++)
        {
            x += dx;
            y = Math.sin(w*x);
            //px += (180.0/pi)*dx;
                        px += dx;
            py = y0 - c*y;
            p += "L"+ px +","+ py;
        }
        p += " " + p0;
        
        //console.log("circ path : "+p);
        return p;
    }
	function DrawPhotonLine() {
		var x0 = startVertex.GetX();
		var x1 = endVertex.GetX();
		var y0 = startVertex.GetY();
		var y1 = endVertex.GetY();
		var len = Math.sqrt((x0-x1)*(x0-x1) + (y0-y1)*(y0-y1));
		var theta = Math.atan2((y1-y0),(x1-x0));
		var angle = ((theta/Math.PI)*180);
		path_string = svg_path_sin(x0, y0,len);
		var pathA = paper.path(path_string).attr("stroke", "black").attr("stroke-width", "2");
		pathA.transform("r"+angle+","+startVertex.GetX()+","+startVertex.GetY());
		mean = new Vertex((startVertex.GetX() + endVertex.GetX() ) / 2, (startVertex.GetY() + endVertex.GetY() ) / 2);
		x2 = mean.GetX();
		y2 = mean.GetY();
		textA = paper.text(x2,y2-nstepy/3,ListOfParticles[12]);
		textA.attr({"font-size": nstepy/4 });
		textA.hover(function(){this.attr ("fill", ColorOfParticles[pid-1] );MySize = this.attr('font-size'); this.attr({"font-size": MySize +20 }); }, function(){this.attr ("fill", "#000000");this.attr({"font-size": MySize })},textA, textA);
		pathA.hover(function(){ this.attr ("stroke", ColorOfParticles[pid-1] ); }, function(){this.attr ("stroke", "#000000");},pathA, pathA);
		pathA.hover(function(){ this.attr ("fill", ColorOfParticles[pid-1] );MySize = this.attr('font-size'); this.attr({"font-size": MySize +20 }); }, function(){this.attr ("fill", "#000000");this.attr({"font-size": MySize })},textA, textA);
		textA.hover(function(){this.attr ("stroke", ColorOfParticles[pid-1] ); }, function(){this.attr ("stroke", "#000000");},pathA, pathA);
		
		


	}
	function DrawGluonLine() {
	
		var x0 = startVertex.GetX();
		var x1 = endVertex.GetX();
		var y0 = startVertex.GetY();
		var y1 = endVertex.GetY();
		var len = Math.sqrt((x0-x1)*(x0-x1) + (y0-y1)*(y0-y1));
		var theta = Math.atan2((y1-y0),(x1-x0));
		var angle = ((theta/Math.PI)*180);
		path_string = svg_path_coil(x0, y0,len);
		var pathA = paper.path(path_string).attr("stroke", "black").attr("stroke-width", "2");
		pathA.transform("r"+angle+","+startVertex.GetX()+","+startVertex.GetY());
		mean = new Vertex((startVertex.GetX() + endVertex.GetX() ) / 2, (startVertex.GetY() + endVertex.GetY() ) / 2);
		x2 = mean.GetX();
		y2 = mean.GetY();
		textA = paper.text(x2,y2-nstepy/3,ListOfParticles[12]);
		textA.attr({"font-size": nstepy/4 });
		textA.hover(function(){this.attr ("fill", ColorOfParticles[pid-1] );MySize = this.attr('font-size'); this.attr({"font-size": MySize +20 }); }, function(){this.attr ("fill", "#000000");this.attr({"font-size": MySize })},textA, textA);
		pathA.hover(function(){ this.attr ("stroke", ColorOfParticles[pid-1] ); }, function(){this.attr ("stroke", "#000000");},pathA, pathA);
		pathA.hover(function(){ this.attr ("fill", ColorOfParticles[pid-1] );MySize = this.attr('font-size'); this.attr({"font-size": MySize +20 }); }, function(){this.attr ("fill", "#000000");this.attr({"font-size": MySize })},textA, textA);
		textA.hover(function(){this.attr ("stroke", ColorOfParticles[pid-1] ); }, function(){this.attr ("stroke", "#000000");},pathA, pathA);
		
            
    }
    return this;
}
	
	
function Editor(div) {
	var Rubber=false;
	
	console.log("Editor!");

	var ListOfLines = new Array();
	var noLines=0;
	
	var ReadOnly = 1;
	this.IsReadOnly = function (Bool) { ReadOnly=Bool; }
	
	var nstepx = Math.round(paper.width/gridSize);
	var nstepy = Math.round(paper.height/gridSize);
	
	trigger = false;

	document.getElementById(div).onclick = function(e) {	
		console.log("CLICK!!");
		var x;
		var y;
		x = event.clientX + document.body.scrollLeft -
		document.getElementById(div).offsetLeft;
		y = event.clientY + document.body.scrollTop -
		document.getElementById(div).offsetTop;
		
		var xpos = gridSize*Math.round(x/gridSize);
		var ypos = gridSize*Math.round(y/gridSize);
		var vert = new Vertex(xpos,ypos);
		
		console.log("X "+x);
		console.log("Y "+y);
		
		if(trigger) {
			console.log("triggered!!");
			ListOfLines[noLines].SetEndVertex(vert);
			ListOfLines[noLines++].Draw();
			trigger=false;
		} else {
			console.log("reset!!");
			ListOfLines[noLines] = new Line(vert,gParticleType,paper);
			trigger=true;
		}
	};
	console.log("THE END");
	
}

function GetPos(obj){
    var x=0,y=0;
    while (obj!=null){
     x+=obj.offsetLeft-obj.scrollLeft;
     y+=obj.offsetTop-obj.scrollTop;
     obj=obj.offsetParent;
    }
    return {x:x,y:y};
    }


function Popup(ContainerA,PopupA,StringA)
{
			alert('1');
			var GraphPopup = document.getElementById(PopupA);
			alert('2');
			var Container = document.getElementById(ContainerA);
			alert('3');
            GraphPopup.style.visibility='visible';
			alert('4');
            GraphPopup.innerHTML = "" ;
			
}