import * as d3 from "d3";
import content from "./page.md";
import "../common/css/common.less"


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