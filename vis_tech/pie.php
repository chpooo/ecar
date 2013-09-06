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

  <script src="javascripts/modernizr.foundation.js"></script>
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
     <div class="row"><h4>pie chart</h4></div>
     <hr>
     <div class="row">
         <div class="introduction">
             <strong>输入数据格式：</strong>
         </div>
     </div>
     <hr>
     <div class="row">
        <div class="show">
           <form action="../upload_file.php" method="post" enctype="multipart/form-data">
           <label for="file">上传数据文件</label>
           <input type="file" name="file" id="file"/>
           <input type="submit" name="submit" value="submit"/>
           </form>    
        </div>
     </div>
     </div>
</div>
  <script src="http://d3js.org/d3.v3.min.js"></script>
<script>
function draw_pie_chart()
{
var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select(".show").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("data.csv", function(error, data) {

  data.forEach(function(d) {
    d.population = +d.population;
  });

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.age); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.age; });

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
