import * as d3 from "d3";
import content from "./page.md"
import data from "./data.csv"



document.body.innerHTML = content;

console.log(data);

var table = d3.select("#graph1")
	.append("table");
table
	.append("thead")
	.selectAll("th")
	.data(data.shift())
	.enter().append("th")
	.text(function(d) { return d + "!"; });

while (data.length > 0) {
	table
		.append("tbody")
		.selectAll("td")
		.data(data.shift())
		.enter().append("td")
	    .text(function(d) { return d + "!"; });
}

/* 
import Data from './data.csv'

Data.forEach((row, index) => {
  console.log(`Row ${index}: `, row)
})
*/