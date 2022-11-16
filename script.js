const margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = 750 - margin.left - margin.right,
  height = 675 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3.select("#my_dataviz1")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        `translate(${margin.left}, ${margin.top})`);
        
var tableBody = d3.select("#tableBody");
d3.json("./data.json").then( function( data) {

  // Initialize the links
  const link = svg
    .selectAll("line")
    .data(data.links)
    .join("line")
      .style("stroke", "#aaa")

  // Initialize the nodes
  const node = svg
    .selectAll("circle")
    .data(data.nodes)
    .join("circle")
      .attr("r", 20)
      .style("fill", function(d) {
        if (d.affiliation == "Austria Hungarian Royalty") {
          return "#0f73cb";
        } else if (d.affiliation == "Young Bosnia") {
            return "#910b0b"
        } else if (d.affiliation == "Secret Society of Freedom") {
            return "#ba0043"
        } else if (d.affiliation == "Bolshevicks") {
          return "#9b40a0";
        } else if (d.affiliation == "Black Hand") {
          return "#462588";
        } else if (d.affiliation == "Narodana Odbrana") {
          return "#6d5ebe";
        }
      })
    

  // Let's list the force we wanna apply on the network
  const simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
      .force("link", d3.forceLink()                               // This force provides links between nodes
            .id(function(d) { return d.id })                  // This provide  the id of a node
            .links(data.links)                                    // and this the list of links
      )
      .force("charge", d3.forceManyBody().strength(-450))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
      .on("end", ticked);

      let label = svg.append("g").attr("class", "labels").selectAll("g")
            .data(data.nodes)
            .enter().append("g")
  

  // This function is run at each iteration of the force algorithm, updating the nodes position.
  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
         .attr("cx", function (d) { return d.x+6; })
         .attr("cy", function(d) { return d.y-6; });
    label
        .append("text")
        .attr("x", "4em")
        .attr("y", ".31em")
        .style("font-family", "sans-serif")
        .style("font-size", "0.8em")
        .style("fill", "#dad6d6")
        .text(function(d) {
            return d.id;
        })
        .attr("x", function(d) {
            return d.x;
        })
        .attr("y", function(d) {
            return d.y;
        });
        svg.append("circle")
            .attr("cx",50)
            .attr("cy",70)
            .attr("r", 6)
            .style("fill", "#910b0b")
        svg.append("circle")
            .attr("cx",50)
            .attr("cy",100)
            .attr("r", 6)
            .style("fill", "#ba0043")
        svg.append("circle")
            .attr("cx",50)
            .attr("cy",130)
            .attr("r", 6)
            .style("fill", "#462588")
        svg.append("circle")
            .attr("cx",50)
            .attr("cy",160)
            .attr("r", 6)
            .style("fill", "#9b40a0")
        svg.append("circle")
            .attr("cx",50)
            .attr("cy",190)
            .attr("r", 6)
            .style("fill", "#6d5ebe")
        svg.append("circle")
            .attr("cx",50)
            .attr("cy",220)
            .attr("r", 6)
            .style("fill", "#0f73cb")

        svg.append("text")
            .attr("x", 70)
            .attr("y", 70)
            .text("Young Bosnia")
            .style("font-size", "15px")
            .style("fill", "#dad6d6")
            .attr("alignment-baseline","middle")
        svg.append("text")
            .attr("x", 70)
            .attr("y", 100)
            .text("Secret Society of Freedom")
            .style("font-size", "15px")
            .style("fill", "#dad6d6")
            .attr("alignment-baseline","middle")
        svg.append("text")
            .attr("x", 70)
            .attr("y", 130)
            .text("Black Hand")
            .style("font-size", "15px")
            .style("fill", "#dad6d6")
            .attr("alignment-baseline","middle")
        svg.append("text")
            .attr("x", 70)
            .attr("y", 160)
            .text("Bolshevicks")
            .style("font-size", "15px")
            .style("fill", "#dad6d6")
            .attr("alignment-baseline","middle")
        svg.append("text")
            .attr("x", 70)
            .attr("y", 190)
            .text("Narodana Odbrana")
            .style("font-size", "15px")
            .style("fill", "#dad6d6")
            .attr("alignment-baseline","middle")
        svg.append("text")
            .attr("x", 70)
            .attr("y", 220)
            .text("Austria Hungarian Royalty")
            .style("font-size", "15px")
            .style("fill", "#dad6d6")
            .attr("alignment-baseline","middle")
  }
  



  

    

    var cells = tableBody.selectAll("td").data(data.count);
    cells.exit().remove();
    cells.enter().append("td")
      .text(function(d) {
        return d.num;
      })
      .style("border", "1px solid black")
      .style("padding-left", "0.5rem")
      .style("color", "#dad6d6")
      .style("background-color", function(d) {
        if (d.num == "1") {
          return "#ba0043";
        } else if (d.num == 3) {
            return "#910b0b"
        } else if (d.num == 4) {
          return "#9b40a0";
        }
        // else if (d.num == 6) {
        //   return "#462588";
        // } 
        else if (d.monarch == 1) {
          return "#0f73cb";
        };
      })
      .style("background-image", function(d) {
        if (d.num == 6) {
          return "linear-gradient(to right, #462588 , #6d5ebe)"
        }
      });

  
    

});
