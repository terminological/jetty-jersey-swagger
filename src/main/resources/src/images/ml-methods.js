import data from '../copyright/machine-learning-methods.mm';

import {style} from '../common/css/d3.css'

$( document.body ).append( $("<svg  width='1200' height='1000' id='content'/>") );



var svg = d3.select("svg");
var width = +svg.attr("width");
var height = +svg.attr("height");
var g = svg.append("g").attr("transform", "translate(100,0)"); 
//.attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

var children = function(node) {
	console.log(node);
	return node.node;
}

var tree = d3.tree()
.size([height,width-500])//; //[2 * Math.PI, 400])
.separation(function(a, b) { 
	return ((a.children ? a.children.length : 1) + (b.children ? b.children.length : 1))/2 });
	//return (a.childr ? 1 : b.children.length/2); });// / a.depth; });
//console.log(data);


var hier = d3.hierarchy(data.map.node[0],children);

console.log(hier);

var root = tree(hier);

var link = g.selectAll(".link")
.data(root.links())
.enter().append("path")
.attr("class", "link")
.attr("d", d3.linkHorizontal() //d3.linkRadial()
		.x(function(d) { return d.y; })
		.y(function(d) { return d.x; }));
//.angle(function(d) { return d.x; })
//.radius(function(d) { return d.y; }));

var node = g.selectAll(".node")
.data(root.descendants())
.enter().append("g")
.attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
// .attr("transform", function(d) { return "translate(" + radialPoint(d.x, d.y) + ")"; });
.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

node.append("circle")
.attr("r", 2.5);

node.append("text")
.attr("dy", "0.31em")
.attr("x", function(d) { return d.children ? -8 : 8; }) // { return d.x < Math.PI === !d.children ? 6 : -6; })
.style("text-anchor", function(d) { return d.children ? "end" : "start"; })
// .attr("text-anchor", function(d) { return d.x < Math.PI === !d.children ? "start" : "end"; })
// .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; })
.text(function(d) {return d.data.$.TEXT; });


/*function radialPoint(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}*/