const margin = {top:70, right:40, bottom:60, left:175}
const width = 660 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const svg = d3.select("#bog-body-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



d3.csv("bog_bodies.csv").then(data =>  {
    data.forEach(d => {
        d.total = +d.total;
    });

    data.sort(function(a,b){
        return d3.ascending(a.total,b.total);
    });

    const x = d3.scaleLinear()
        .range([0,width])
        .domain([0,d3.max(data, function(d){return d.total;})]);

    const y = d3.scaleBand()
        .range([height,0])
        .padding(0.1)
        .domain(data.map(function (d) {return d.bog_body_type;}));

    const xAxis = d3.axisBottom(x)

    const yAxis = d3.axisLeft(y)

    svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class","bar")
    .attr("y", function(d){return y(d.bog_body_type);})
    .attr("height", y.bandwidth())
    .attr("x",0)
    .attr("width", function(d){return x(d.total);})
    .style("fill",'skyblue')

    svg.append("g")
        .attr("class","x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    
    svg.append("g")
        .call(yAxis)


})
