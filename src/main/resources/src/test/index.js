import * as d3 from "d3";
import content from "./page.md";
import "../common/css/common.less"

import data from "./data.csv"

document.body.innerHTML = content;

d3.select("#graph1")
	.selectAll("p")
	.data(["hello d3 world"])
	.enter().append("p")
    .text(function(d) { return d + "!"; });


/* 
import Data from './data.csv'

Data.forEach((row, index) => {
  console.log(`Row ${index}: `, row)
})
*/

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