import gulshan from "../copyright/literature-review.md";
import citations from "raw-loader!../copyright/lit-rev.bib";
import {style} from "../common/css/pub.css";
import * as bibtex from "bibtex-parser";

$( document.body ).append( $("<div id='content'/>").html(gulshan) );
$( document.body ).append( $("<div id='citations'/>"));

var cites = bibtex(citations);

function layoutCitation(cite) {
	var out = cite.AUTHOR + ". "
		+ cite.YEAR + ". "
		+ cite.TITLE +". "
		+"<em>"+cite.JOURNAL +"</em> "
		+cite.VOLUME+"("+cite.NUMBER+") "
		+cite.PAGES;
	return out;
}

var i = 1;
Object
	.keys(cites)
	.sort()
	.filter(e => (e != ""))
	.forEach( e => {
		$("#citations").append( 
				$( "<cite id='"+e+"'/>" )
				.html( layoutCitation(cites[e]) )
			);
		$("a[href='#"+e+"']").text(i); //fix citation numbers not supported by css3 target-counter
		i++;
	});


