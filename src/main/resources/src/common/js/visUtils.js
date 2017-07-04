var vis = require('vis/index-network.js');

var VU = new Object();

VU.setupGraph = function(nodes,edges,caption,divId = "") {
    $(document).ready(
        function () {
            var container = $(divId);
            if (container.length == 0) container = $(document.body);

            var fig = $("<figure width='100%'></figure>").appendTo(container)
            var div = $("<div/>").appendTo(fig);
            $("<figcaption>" + caption + "</figcaption>").appendTo(fig);

            var data = {
                nodes: nodes,
                edges: edges
            };
            var options = {
                nodes: {
                    borderWidth: 1,
                    size: 32,
                    color: {
                        border: '#000000',
                        background: '#eeeeee'
                    },
                    font: {color: '#000'},
                    shapeProperties: {
                        useBorderWithImage: false
                    },
                    shadow: true
                },
                edges: {
                    color: 'gray',
                    // font: {color: '#FF0000'},
                    arrows: 'to',
                    physics: true,
                    smooth: true,
                },
                layout: {
                    //randomSeed: 2,
                    hierarchical: {
                        enabled: true,
                        levelSeparation: 100,
                        nodeSpacing: 100,
                        treeSpacing: 50,
                        parentCentralization: true,
                        direction: 'UD',        // UD, DU, LR, RL
                        sortMethod: 'directed'   // hubsize, directed
                    },
                },
                physics: {
                    hierarchicalRepulsion: {
                        springLength: 150,
                        nodeDistance: 150
                    }
                }

            };

            var network = new vis.Network(div.get(0), data, options);

            //network.setSize(div.width(), 5000);

            var maxWidth = Object.values(network.getPositions())
                .map(v => v.x).reduce((acc, cur) => Math.max(acc, cur));
            var minWidth = Object.values(network.getPositions())
                .map(v => v.x).reduce((acc, cur) => Math.min(acc, cur));
            var maxHeight = Object.values(network.getPositions())
                .map(v => v.y).reduce((acc, cur) => Math.max(acc, cur));
            var minHeight = Object.values(network.getPositions())
                .map(v => v.y).reduce((acc, cur) => Math.min(acc, cur));

            var aspectRatio = (maxWidth - minWidth) / (maxHeight - minHeight);

            network.setSize(div.width(), div.width() / aspectRatio / 4);
            network.fit();

            window.onresize = function () {
                var width = div.width();
                var height = width / aspectRatio / 4;
                network.setSize(width, height);
                network.fit();
            }
        }
    );
}

module.exports = VU;