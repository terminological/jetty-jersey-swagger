import content from "../copyright/docs/Literature review.md";
import citations from "raw-loader!../copyright/references/lit-rev.bib";
import {style} from "../common/css/pub.less";
import * as BibTEX from "bibtex-citations";

$(document.body).append( $("<div id='markdown'/>").html(content) );

import '../copyright/figures/machine-learning-methods.js';
import '../copyright/figures/gulshan-fig-2.js';

$(document).ready(function () {
    $(document.body).append( $("<div id='citations'/>") );
    var contentDiv = $("#markdown").get(0);
    var citationsDiv = $("#citations").get(0);
    BibTEX.process(citations, contentDiv, citationsDiv);
});
