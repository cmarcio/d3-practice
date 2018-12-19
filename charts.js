async function plotCharts() {
    // load data
    const cities = await d3.csv("data/cities.csv");
    const { tweets } = await d3.json("data/tweets.json");
    console.log(cities);
    console.log(tweets);

    populationBarchart("#populationBarchart", cities);
}

function populationBarchart(elem, data) {
    const maxPopulation = d3.max(data, d => parseInt(d.population));
    const yScale = d3.scaleLinear().domain([0, maxPopulation]).range([0, 480])
    d3.select(elem)
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", 50)
      .attr("height", d => yScale(d.population))
      .attr("x", (d, i) => 60 * i + 10)
      .attr("y", d => 500 - yScale(d.population))
      .attr("fill", "#f234d1")
      .attr("stroke", "#222222")
      .attr("stroke-width", "1px");
}

plotCharts();