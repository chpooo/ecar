//document
//		.write("<script type='text/javascript' src='../lib/d3.v3.min.js' charset='utf-8'></script>");

//document.write("<script type='text/javascript' src='../lib/d3.js'></script>");
//document
//		.write("<script type='text/javascript' src='../lib/d3.geo.js'></script>");

/*
 * document .write("<link type='text/css' rel='stylesheet'
 * href='../lib/style.css'/>"); document .write("<link type='text/css'
 * rel='stylesheet' href='../lib/colorbrewer.css'/>");
 * 
 * document.write("<style type='text/css'>" + "svg {\n"+ "width: 1280px;\n"+
 * "height: 800px;\n"+ "pointer-events: all;\n"+ "}\n"+ "circle {\nfill:
 * #dbe4f0;\n}\n"+ "path {\n"+ "fill: #aaa;\n"+ "stroke: #fff;\n}\n<"+"/style>);");
 * 
 */
function D2() {

	this.addSomeTag = function() {
		d3.select("head").append("script").attr("id", "script1").attr("type",
				"text/javascript").attr("src", "lib/d3.js");
		d3.select("head").append("script").attr("id", "script2").attr("type",
				"text/javascript").attr("src", "lib/d3.geo.js");

		d3.select("head").append("link").attr("id", "link1").attr("type",
				"text/css").attr("rel", "stylesheet").attr("href",
				"../lib/style.css");

		d3.select("head").append("link").attr("id", "link2").attr("type",
				"text/css").attr("rel", "stylesheet").attr("href",
				"../lib/colorbrewer.css");

		d3.select("head").append("style").attr("id", "style1").attr("type",
				"text/css").text(
				"svg {\n" + "width: 1280px;\n" + "height: 800px;\n"
						+ "pointer-events: all;\n" + "}\n"
						+ "circle {\nfill:#dbe4f0;\n}\n" + "path {\n"
						+ "fill: #aaa;\n" + "stroke: #fff;\n}\n");

	}
	this.deleteSomeTag = function() {
		d3.select("head").select("#script1").remove();
		d3.select("head").select("#script2").remove();
		// d3.select("head").select("#script3").remove();

		d3.select("head").select("#link1").remove();
		d3.select("head").select("#link2").remove();
		d3.select("head").select("#style1").remove();

	}
//window.location.href("index2.html");
	this.deleteChartOrGraph = function() {

		var theChild = document.getElementById("show");
		theChild.innerHTML="";
/*
		if (theChild != null) {

			var parent = document.getElementsById("show");
			parent[0].removeChild(theChild);
		}
*/
	}
	this.drawGeoGraph = function(dataUrl) {

		

		var div = d3.select("#show").append("div").attr("id","tooltip");

		var div = d3.select("#show").append("div").attr("id","curChart");
/*
		div.append("link").attr("id", "link1").attr("type", "text/css").attr(
				"rel", "stylesheet").attr("href", "lib/style.css");

		div.append("link").attr("id", "link2").attr("type", "text/css").attr(
				"rel", "stylesheet").attr("href", "lib/colorbrewer.css");

		div.append("style").attr("id", "style1").attr("type", "text/css").text(
				"svg {\n" + "width: 1280px;\n" + "height: 800px;\n"
						+ "pointer-events: all;\n" + "}\n"
						+ "circle {\nfill:#dbe4f0;\n}\n" + "path {\n"
						+ "fill: #aaa;\n" + "stroke: #fff;\n}\n");

		var div1 = div.append("div");
		div1.attr("id", function() {
			return "body";
		});
		var div2 = div1.append("div");
		div2.attr("id", function() {
			return "footer";
		});
*/
		//div2.text("d3.geo.azimuthal");

//		var div3 = div2.append("div");
//		div3.attr("class", function() {
//			return "hint"
//		});
		//div3.text("drag to rotate the origin");
//		var div4 = div3.append("div");
		/*
		var select = div4.append("select");
		var option1 = select.append("option");
		option1.attr("value", function() {
			return "equalarea";
		});
		option1.text("equalarea");

		var option2 = select.append("option");
		option2.attr("value", function() {
			return "equidistant";
		});
		option2.text("equidistant");

		var option3 = select.append("option");
		option3.attr("value", function() {
			return "gnomonic";
		});
		option3.text("gnomonic");

		var option4 = select.append("option");
		option4.attr("value", function() {
			return "orthographic"
		});
		option4.text("orthographic");

		var option5 = select.append("option");
		option5.attr("value", function() {
			return "stereographic";
		});
		option5.text("stereographic");
		*/
		var feature;

		var projection = d3.geo.azimuthal().scale(380)
				.origin([ -71.03, 42.37 ]).mode("orthographic").translate(
						[ 640, 400 ]);

		var circle = d3.geo.greatCircle().origin(projection.origin());

		// circle.attr("fill",function(){return "dbe4f0";});

		// TODO fix d3.geo.azimuthal to be consistent with scale
		var scale = {
			orthographic : 380,
			stereographic : 380,
			gnomonic : 380,
			equidistant : 380 / Math.PI * 2,
			equalarea : 380 / Math.SQRT2
		};

		var path = d3.geo.path().projection(projection);

		// path.style("fill",function(){return "#aaa";});
		// path.style("stroke",function(){return "#fff";});

	       	var svg = d3.select("#curChart").append("svg:svg").attr("width", 1080)
			.attr("height", 800).on("mousedown", mousedown);

		//		.attr("height", 800).on("mousedown", mousedown);
		// svg.style("width",function(){return "1280px";});
		// svg.style("height",function(){return "800px";});
		// svg.style("pointer-events",function(){return "all";});

		var geoInfo = [ {
			"name" : "China",
			"data" : 12
		} ];

		d3.json(dataUrl, function(data) {
			geoInfo = data;
			console.log(data);
		});

		d3.json("lib/world-countries.json", function(collection) {

			feature = svg.selectAll("path").data(collection.features).enter()
					.append("svg:path").attr("d", clip);
                        d3.select("#curChart").select("svg").selectAll("path").on("mouseclick",
					function(d){
					showTooltip(d);	
					}).on(
					"mouseover",
					function(e) {
						d3.select(this).transition().duration(250)
						.style("fill", "steelblue");
					}).on("mouseout", function() {
						d3.select(this).transition().duration(250)
						.style("fill", "#aaa");
			});

		        svg.selectAll("path").style("fill",function(){return "#aaa";});
			svg.selectAll("path").style("stroke",function(){return "#fff";});
			// 显示图标
			feature.append("svg:title").text(function(d) {
				var outputStr = null;
				var i = 0;
				for (i = 0; i < geoInfo.length; i++) {
					if (geoInfo[i].name == d.properties.name) {
						outputStr = geoInfo[i].data;

						break;
					}

				}
				return d.properties.name + ":" + outputStr + "%";
			}).style("fill",function(){return "steelblue";});

		});
		// 控制转动

		d3.select(window).on("mousemove", mousemove).on("mouseup", mouseup);

		/*d3.select("select").on("change", function() {

			projection.mode(this.value).scale(scale[this.value]);
			refresh(750);
		});*/


function showTooltip( html) {
  var tt = $("#tooltip"), x = (e.pageX + 10), y = (e.pageY + 10);
  tt.html(html.properties.name);
  if (y -10 + tt.height() > $(window).height()) {
    y = $(window).height() - tt.height() - 20;
  }
  if (x -10 + tt.width() > $(window).width()) {
    x = $(window).width() - tt.width() - 20;
  }
  tt.css("left", x + "px")
    .css("top", y + "px")
    .css("display", "block");
}
function hideTooltip() {
  $("#tooltip")
    .text("")
    .css("display", "none");
}
		var m0, o0;

		function mousedown() {
			m0 = [ d3.event.pageX, d3.event.pageY ];
			o0 = projection.origin();
			d3.event.preventDefault();
		}

		function mousemove() {
			if (m0) {
				var m1 = [ d3.event.pageX, d3.event.pageY ], o1 = [
						o0[0] + (m0[0] - m1[0]) / 8,
						o0[1] + (m1[1] - m0[1]) / 8 ];
				projection.origin(o1);
				circle.origin(o1)
				refresh();
			}
		}

		function mouseup() {
			if (m0) {
				mousemove();
				m0 = null;
			}
		}

		function refresh(duration) {
			(duration ? feature.transition().duration(duration) : feature)
					.attr("d", clip);
		}

		function clip(d) {
			return path(circle.clip(d));
		}

	}

this.drawCollapseTree=function(file_path)
{
var div = d3.select("#show").append("div").attr("id","curChart");
div.append("style").attr("id", "style1").attr("type", "text/css").text(".node circle {"+
  "cursor: pointer;"+
  "fill: #fff;"+
  "stroke: steelblue;"+
  "stroke-width: 1.5px;"+
"}"+
".node text {"+
  "font-size: 11px;"+
"}"+
"path.link {"+
  "fill: none;"+
  "stroke: #ccc;"+
  "stroke-width: 1.5px;"+
"}");

    var m = [20,120,20,120],
    w = 1280 - m[1] - m[3],
    h = 800 - m[0] - m[2],
    i = 0,
    root;

var tree = d3.layout.tree()
    .size([h, w]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var vis = d3.select("#curChart").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
  .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

d3.json(file_path, function(json) {
  root = json;
  root.x0 = h / 2;
  root.y0 = 0;

  function toggleAll(d) {
    if (d.children) {
      d.children.forEach(toggleAll);
      toggle(d);
    }
  }

  // Initialize the display to show a few nodes.
  root.children.forEach(toggleAll);
  toggle(root.children[1]);
  toggle(root.children[1].children[2]);
  toggle(root.children[9]);
  toggle(root.children[9].children[0]);

  update(root);
});

function update(source) {
  var duration = d3.event && d3.event.altKey ? 5000 : 500;

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = vis.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", function(d) { toggle(d); update(d); });

  nodeEnter.append("svg:circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("svg:text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = vis.selectAll("path.link")
      .data(tree.links(nodes), function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("svg:path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })
    .transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children.
function toggle(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
}
}

this.drawZoomableCircle = function(dataUrl)
{


var div = d3.select("#show").append("div").attr("id","curChart");

div.append("style").attr("id", "style1").attr("type", "text/css").text(
"text {"+
  "font-size: 11px;"+
  "pointer-events: none;"+
"}"+
"text.parent {"+
  "fill: #1f77b4;"+
"}"+
"circle {"+
  "fill: #ccc;"+
  "stroke: #999;"+
  "pointer-events: all;"+
"}"+
"circle.parent {"+
  "fill: #1f77b4;"+
  "fill-opacity: .1;"+
  "stroke: steelblue;"+
"}"+
"circle.parent:hover {"+
  "stroke: #ff7f0e;"+
  "stroke-width: .5px;"+
"}"+
"circle.child {"+
  "pointer-events: none;"+
"}"
);
var w = 1280,
    h = 800,
    r = 720,
    x = d3.scale.linear().range([0, r]),
    y = d3.scale.linear().range([0, r]),
    node,
    root;

var pack = d3.layout.pack()
    .size([r, r])
    .value(function(d) { return d.size; })

var vis = d3.select("#curChart").insert("svg:svg", "h2")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");

d3.json(dataUrl, function(data) {
  node = root = data;

  var nodes = pack.nodes(root);

  vis.selectAll("circle")
      .data(nodes)
    .enter().append("svg:circle")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
      .on("click", function(d) { return zoom(node == d ? root : d); });

  vis.selectAll("text")
      .data(nodes)
    .enter().append("svg:text")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
      .text(function(d) { return d.name; });

  d3.select(window).on("click", function() { zoom(root); });
});

function zoom(d, i) {
  var k = r / d.r / 2;
  x.domain([d.x - d.r, d.x + d.r]);
  y.domain([d.y - d.r, d.y + d.r]);

  var t = vis.transition()
      .duration(d3.event.altKey ? 7500 : 750);

  t.selectAll("circle")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function(d) { return k * d.r; });

  t.selectAll("text")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

  node = d;
  d3.event.stopPropagation();
}

    
}
	this.drawPieChart = function(dataUrl) {

		

		// this.deleteSomeTag();
		d3.json(dataUrl, function(error, data) {

			console.log(data);
			useData(data);

		});
		function useData(data) {
			var i = 0;
			var dataset = [];
			for (i = 0; i < data.length; i++) {
				dataset[i] = data[i].data;

			}
			// var dataset=[5,10,20,40,6,25];

			var pie = d3.layout.pie(dataset);

			var h = 300 * 1.8;
			var w = 300 * 1.8;

			var outerRadius = w / 2;

			var innerRadius = 0 / 3;

			var arc = d3.svg.arc().outerRadius(outerRadius).innerRadius(
					innerRadius);

			var div = d3.select("#show").append("div").attr("id","curChart");

			var svg = div.append("svg").attr("width", w).attr("height", h);

			var color = d3.scale.category10();
			var arcs = svg.selectAll("g.arc").data(pie(dataset)).enter()
					.append("g").attr("class", "arc").attr(
							"transform",
							"translate(" + outerRadius + "," + outerRadius
									+ ")");

			arcs.append("path").attr("fill", function(d, i) {
				return color(i);
			}).attr("d", arc);

			arcs.append("text").attr("transform", function(d) {
				return "translate(" + arc.centroid(d) + ")";
			}).attr("text-anchor", "middle").text(function(d, i) {
				return data[i].name + ":" + d.value + "%";
			});

		}

	}

	this.drawLineChart = function(dataUrl) {

		

		var margin = {
			top : 20,
			right : 20,
			bottom : 30,
			left : 40
		}, width = 960 - margin.left - margin.right, height = 500 - margin.top
				- margin.bottom;

		var formatPercent = d3.format(".0%");

		var x = d3.scale.ordinal().rangeRoundBands([ 0, width ], .1);

		var y = d3.scale.linear().range([ height, 0 ]);

		var xAxis = d3.svg.axis().scale(x).orient("bottom");

		var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(
				formatPercent);
		var line = d3.svg.line().x(function(d) {
			return x(d.name);
		}).y(function(d) {
			return y(d.data);
		});
		var div = d3.select("#show").append("div").attr("id","curChart");
		var svg = div.append("svg").attr("width",
				width + margin.left + margin.right).attr("height",
				height + margin.top + margin.bottom).append("g").attr(
				"transform",
				"translate(" + margin.left + "," + margin.top + ")");

		d3.json(dataUrl, function(error, data) {

			console.log(data);
			useData(data);

		});

		function useData(data) {

			x.domain(data.map(function(d) {
				return d.name;
			}));
			y.domain([ 0, d3.max(data, function(d) {
				return d.data;
			}) ]);

			svg.append("g").attr("class", "x axis").attr("transform",
					"translate(0," + height + ")").call(xAxis);

			svg.append("g").attr("class", "y axis").call(yAxis).append("text")
					.attr("transform", "rotate(-90)").attr("y", 6).attr("dy",
							".71em").style("text-anchor", "end").text(
							"Frequency");

			svg.append("path").datum(data).attr("class", "line").style("fill",
					"white").style("stroke", "#363636").style("stroke-width",
					2.5).attr("d", line);

			var circles = svg.selectAll("circle").data(data).enter().append(
					"circle").on(
					"mouseover",
					function(d, i) {

						svg.append("text").attr("id", "tooltip3").attr("x",
								x(d.name)).attr("y", y(d.data)).attr(
								"text-anchor", "middle").attr("font-family",
								"sans-serif").attr("font-size", "11px").attr(
								"font-weight", "bold").attr("fill", "black")
								.text(data[i].data + " " + data[i].name);
					}).on("mouseout", function(d, i) {

				d3.select("#tooltip3").remove();
			});
			circles.attr("cx", function(d, i) {
				return x(d.name);
			}).attr("cy", function(d, i) {
				return y(d.data);
			}).attr("r", function(d, i) {
				return 4;
			}).style("fill", function(d, i) {
				return "#FF0000";
			});

		}

		function type(d) {
			d.data = +d.data;
			return d;
		}

	}

	this.drawBarChart = function(dataUrl) {

		

		var margin = {
			top : 20,
			right : 20,
			bottom : 30,
			left : 40
		}, width = 960 - margin.left - margin.right, height = 500 - margin.top
				- margin.bottom;

		var formatPercent = d3.format(".0%");

		var x = d3.scale.ordinal().rangeRoundBands([ 0, width ], .1);

		var y = d3.scale.linear().range([ height, 0 ]);

		var xAxis = d3.svg.axis().scale(x).orient("bottom");

		var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(
				formatPercent);
		var line = d3.svg.line().x(function(d) {
			return x(d.name);
		}).y(function(d) {
			return y(d.data);
		});

		var div = d3.select("#show").append("div").attr("id","curChart");
		var svg = div.append("svg").attr("width",
				width + margin.left + margin.right).attr("height",
				height + margin.top + margin.bottom).append("g").attr(
				"transform",
				"translate(" + margin.left + "," + margin.top + ")");

		d3.json(dataUrl, function(error, data) {

			console.log(data);
			useData(data);

		});

		function useData(data) {

			x.domain(data.map(function(d) {
				return d.name;
			}));
			y.domain([ 0, d3.max(data, function(d) {
				return d.data;
			}) ]);

			svg.append("g").attr("class", "x axis").attr("transform",
					"translate(0," + height + ")").call(xAxis);

			svg.append("g").attr("class", "y axis").call(yAxis).append("text")
					.attr("transform", "rotate(-90)").attr("y", 6).attr("dy",
							".71em").style("text-anchor", "end").text(
							"Frequency");

			svg.selectAll(".bar").data(data).enter().append("rect").style(
					"fill", "steelblue")
					.on(
							"mouseover",
							function(d, i) {
								d3.select(this).transition().duration(250)
										.style("fill", "orange");

								var xPosition = parseFloat(d3.select(this)
										.attr("x")) + 40 / 2;
								var yPosition = parseFloat(d3.select(this)
										.attr("y")) + 14;

								svg.append("text").attr("id", "tooltip").attr(
										"x", xPosition).attr("y", yPosition)
										.attr("text-anchor", "middle").attr(
												"font-family", "sans-serif")
										.attr("font-size", "11px").attr(
												"font-weight", "bold").attr(
												"fill", "black").text(
												data[i].data + " "
														+ data[i].name);

							}).on(
							"mouseout",
							function() {
								d3.select(this).transition().duration(250)
										.style("fill", "steelblue");

								d3.select("#tooltip").remove();

							}).attr("class", "bar").attr("x", function(d) {
						return x(d.name);
					}).attr("width", x.rangeBand()).attr("y", function(d) {
						return y(d.data);
					}).attr("height", function(d) {
						return height - y(d.data);
					});

			/*
			 * svg.append("path").datum(data).attr("class", "line") .attr("d",
			 * line);
			 * 
			 * var circles = svg.selectAll("circle").data(data).enter().append(
			 * "circle").on( "mouseover", function(d, i) {
			 * 
			 * svg.append("text").attr("id", "tooltip3").attr("x",
			 * x(d.name)).attr("y", y(d.data)).attr( "text-anchor",
			 * "middle").attr("font-family", "sans-serif").attr("font-size",
			 * "11px").attr( "font-weight", "bold").attr("fill", "black")
			 * .text(data[i].data + " " + data[i].name); }).on("mouseout",
			 * function(d, i) {
			 * 
			 * d3.select("#tooltip3").remove(); }); circles.attr("cx",
			 * function(d, i) { return x(d.name); }).attr("cy", function(d, i) {
			 * return y(d.data); }).attr("r", function(d, i) { return 4;
			 * }).style("fill", function(d, i) { return "red"; });
			 */

		}

		function type(d) {
			d.data = +d.data;
			return d;
		}

	}

	this.drawBarAndLineChart = function(dataURL) {

		var margin = {
			top : 20,
			right : 20,
			bottom : 30,
			left : 40
		}, width = 960 - margin.left - margin.right, height = 500 - margin.top
				- margin.bottom;

		var formatPercent = d3.format(".0%");

		var x = d3.scale.ordinal().rangeRoundBands([ 0, width ], .1);

		var y = d3.scale.linear().range([ height, 0 ]);

		var xAxis = d3.svg.axis().scale(x).orient("bottom");

		var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(
				formatPercent);
		var line = d3.svg.line().x(function(d) {
			return x(d.name);
		}).y(function(d) {
			return y(d.data);
		});
		var svg = d3.select("body").append("svg").attr("width",
				width + margin.left + margin.right).attr("height",
				height + margin.top + margin.bottom).append("g").attr(
				"transform",
				"translate(" + margin.left + "," + margin.top + ")");

		/*
		 * d3.tsv(file_path, type, function(error, data) { console.log(data);
		 * useData(data);
		 * 
		 * });
		 * 
		 */

		d3.json(dataURL, function(error, data) {

			console.log(data);
			useData(data);

		});

		function useData(data) {

			x.domain(data.map(function(d) {
				return d.name;
			}));
			y.domain([ 0, d3.max(data, function(d) {
				return d.data;
			}) ]);

			svg.append("g").attr("class", "x axis").attr("transform",
					"translate(0," + height + ")").call(xAxis);

			svg.append("g").attr("class", "y axis").call(yAxis).append("text")
					.attr("transform", "rotate(-90)").attr("y", 6).attr("dy",
							".71em").style("text-anchor", "end").text(
							"Frequency");

			svg.selectAll(".bar").data(data).enter().append("rect")
					.on(
							"mouseover",
							function(d, i) {
								d3.select(this).transition().duration(250)
										.style("fill", "orange");

								var xPosition = parseFloat(d3.select(this)
										.attr("x")) + 40 / 2;
								var yPosition = parseFloat(d3.select(this)
										.attr("y")) + 14;

								svg.append("text").attr("id", "tooltip").attr(
										"x", xPosition).attr("y", yPosition)
										.attr("text-anchor", "middle").attr(
												"font-family", "sans-serif")
										.attr("font-size", "11px").attr(
												"font-weight", "bold").attr(
												"fill", "black").text(
												data[i].data + " "
														+ data[i].name);

							}).on(
							"mouseout",
							function() {
								d3.select(this).transition().duration(250)
										.style("fill", "steelblue");

								d3.select("#tooltip").remove();

							}).attr("class", "bar").attr("x", function(d) {
						return x(d.name);
					}).attr("width", x.rangeBand()).attr("y", function(d) {
						return y(d.data);
					}).attr("height", function(d) {
						return height - y(d.data);
					});

			svg.append("path").datum(data).attr("class", "line")
					.attr("d", line);

			var circles = svg.selectAll("circle").data(data).enter().append(
					"circle").on(
					"mouseover",
					function(d, i) {

						svg.append("text").attr("id", "tooltip3").attr("x",
								x(d.name)).attr("y", y(d.data)).attr(
								"text-anchor", "middle").attr("font-family",
								"sans-serif").attr("font-size", "11px").attr(
								"font-weight", "bold").attr("fill", "black")
								.text(data[i].data + " " + data[i].name);
					}).on("mouseout", function(d, i) {

				d3.select("#tooltip3").remove();
			});
			circles.attr("cx", function(d, i) {
				return x(d.name);
			}).attr("cy", function(d, i) {
				return y(d.data);
			}).attr("r", function(d, i) {
				return 4;
			}).style("fill", function(d, i) {
				return "red";
			});

		}

		function type(d) {
			d.data = +d.data;
			return d;
		}

	}

}

var d2 = new D2();
