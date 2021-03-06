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
  <link rel="stylesheet" href="stylesheets/foundation.min.css">
  <link rel="stylesheet" href="stylesheets/app.css">
<script type="text/javascript" src="lib/d3.v3.min.js"></script>
<script type="text/javascript" src=lib/d2.js></script>
<script type="text/javascript" src=lib/d3.geo.js></script>


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
       <li><a href="index.php">首页</a></li>
<!--       <li><a href="index.php">数据导入</a></li>
       <li><a href="index.php">数据处理</a></li>
       <li><a href="index.php">技术成熟度</a></li>
       <li><a href="index.php">关键技术的关联与演变</a></li>
       <li><a href="index.php">研发人员与研发团体关系</a></li>
       <li><a href="index.php">核心专利与知识产权布局</a></li>
       <li><a href="index.php">重点企业的技术研发轨迹</a></li>
!-->
       <li class="active"><a href="visual_index.php">现有可视化技术展示</a></li>
     </ul>
     </div>
     <div class="nine columns" sytle="width:1280px">
        <div>
                <select id="select"
                        onchange="ProcessFunc(this.options[this.options.selectedIndex].value)">

                        <option value="drawLineChart">drawLineChart</option>
                        <option value="drawBarChart">drawBarChart</option>
                        <option value="drawGeoGraph">drawGeoGraph</option>
                        <option value="drawCollapseTree">drawCollapseTree</option>
			<option value="drawZoomableCircle">drawZoomableCircle</option>
                        <option value="drawPieChart" selected>drawPieChart</option>

                </select>
        </div>
        <div id="show">
        </div>
        <div>

                <script type="text/javascript">
                        d2.drawPieChart("data/pie.json");

                        var select1 = document.getElementById("select");

                        function ProcessFunc(selectedValue) {
                                
                                d2.deleteChartOrGraph();

                                
                                if (selectedValue == "drawPieChart") {
                                        console.log("hello1");

                                        d2.drawPieChart("data/pie.json");
                                } else if (selectedValue == "drawLineChart") {
                                        console.log("hello2");

                                        d2.drawLineChart("data/line.json");
                                } else if (selectedValue == "drawBarChart") {
                                        console.log("hello3");

                                        d2.drawBarChart("data/bar.json");
                                } else if (selectedValue == "drawCollapseTree")
				{
					d2.drawCollapseTree("data/flare.json");
				} else if(selectedValue == "drawZoomableCircle")
				{
					d2.drawZoomableCircle("data/flare.json");
				}
				 else if (selectedValue == "drawGeoGraph") {
                                        console.log("pre addSomeTag()");
					d2.drawGeoGraph("data/geoInfo.json");
                                       // window.location.href = "show/index2.html";
                                        
                                }

                        }
                </script>
        </div>

<!--
      <div class="row"><h4>Basic Charts</h4></div>
      <hr>
      <a href="vis_tech/pie.php">pie chart</a><br/>
      <a href="vis_tech/donut.php">donut chart</a><br/>
      <a href="vis_tech/bar.php">bar chart</a><br/>
      <a href="vis_tech/line.php">line chart</a><br/>
      <a href="vis_tech/bar_line.php">bar_line chart</a><br/>
      <hr>
      <div class="row"><h4>Interaction & Animation Charts</h4></div>
      <hr>
      <a href="vis_tech/collapsible_tree.php">Collapsible Tree Layout</a><br/>  
     </div>
     </div>--!>
  <script src="javascripts/jquery.js"></script>
  <script src="javascripts/foundation.min.js"></script>
  
  <!-- Initialize JS Plugins -->
  <script src="javascripts/app.js"></script>

  
    <script>
    $(window).load(function(){
      $("#featured").orbit();
    });
    </script> 
  
</body>
</html>
