<!DOCTYPE html>

<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8" />

  <!-- Set the viewport width to device width for mobile -->
  <meta name="viewport" content="width=device-width" />

  <title>Welcome to Foundation</title>
  
  <!-- Included CSS Files (Uncompressed) -->
  <!--
  <link rel="stylesheet" href="stylesheets/foundation.css">
  -->
  
  <!-- Included CSS Files (Compressed) -->
  <link rel="stylesheet" href="../stylesheets/foundation.min.css">
  <link rel="stylesheet" href="../stylesheets/app.css">

  <script src="../javascripts/modernizr.foundation.js"></script>
</head>
<body>
<nav class="top-bar">
  <ul>
    <li class="name"><h1><a href="#">ECar Data Visualize</a></h1></li>
  </ul>
  <section>
    <ul class="right">
      <li><a href="#">Sign In</a></li>
      <li><a href="#">Contact us</a></li>
    </ul>
  </section>
</nav>
<div class="row" style="width:1180px">
     <div class="three columns">
     <ul class="nav-bar vertical">
       <li><a href="../index.php">首页</a></li>
       <li><a href="../index.php">数据导入</a></li>
       <li><a href="../index.php">数据处理</a></li>
       <li><a href="../index.php">技术成熟度</a></li>
       <li><a href="../index.php">关键技术的关联与演变</a></li>
       <li><a href="../index.php">研发人员与研发团体关系</a></li>
       <li><a href="../index.php">核心专利与知识产权布局</a></li>
       <li><a href="../index.php">重点企业的技术研发轨迹</a></li>
       <li class="active"><a href="../visual_index.php">现有可视化技术展示</a></li>
     </ul>
     </div>
     <div class="nine columns">
     <div class="row"><h4>line chart</h4></div>
     <hr>
     <div class="row">
         <div class="introduction">
             <strong>输入数据格式：line.tsv</strong>
             <br/>
             <pre>
             <code class="undefined">
"name,data
5,2704659
5-13,4499890
14-17,2159981
18-24,3853788
25-44,14106543
45-64,8819342
65,612463
"
             </code>
             </pre>
         </div>
     </div>
     <hr>
<!--
     <div class="row">
        <div class="show">
           <form action="../upload_file.php" method="post" enctype="multipart/form-data">
           <label for="file">上传数据文件</label>
           <input type="file" name="file" id="file"/>
           <input type="submit" name="submit" value="submit"/>
           </form>    
        </div>
     </div>
-->
     <div class="row">
          <div class="two columns">
          <label for="file_path"> 请选择数据文件</label>
          </div>
          <div class="five columns">
          <select name="file_path">
          <?php
            $basedir="../upload/"; 
            $dir = opendir($basedir); 
            while ($fileDir = readdir($dir)) {
               if (!strcmp($fileDir,".")||!strcmp($fileDir,"..")) { 
               continue; 
            } 
            echo '<option value="../upload/'.$fileDir.'">'.$fileDir."</option>"; 
            }  
            closedir($dir); 
          ?> 
          </select>
          </div>
          <div class="five columns">
          <input id="file_path_submit" type="submit" onclick="draw_line_chart(document.getElementsByName('file_path')[0].value)"/>
          </div>
     </div>
     <div class="row">
     <div class="show">
     </div> 
     </div>
     </div>
</div>
<style>

body {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.x.axis path {
  display: none;
}

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 1.5px;
}

</style>
  <script src="../javascripts/d3/d3.v3.min.js"></script>
<script>
function draw_line_chart(file_path)
{
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv(file_path, function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});
}

</script>
  <script src="../javascripts/jquery.js"></script>
  <script src="../javascripts/foundation.min.js"></script>
  
  <!-- Initialize JS Plugins -->
  <script src="../javascripts/app.js"></script>

  
    <script>
    $(window).load(function(){
      $("#featured").orbit();
    });
    </script> 
  
</body>
</html>
