// a lot of this functions could be generic, but as the purpose of this is to practice, repetition is a friend
async function plotCharts() {
    // load data
    const cities = await d3.csv("data/cities.csv");
    const { tweets } = await d3.json("data/tweets.json");

    populationBarchart("#populationBarchart", cities);
    tweetsBarChart("#tweetsBarChart", tweets);
}

function populationBarchart(elem, cities) {
    const maxPopulation = d3.max(cities, d => parseInt(d.population));
    const yScale = d3.scaleLinear().domain([0, maxPopulation]).range([0, 480])
    d3.select(elem)
      .selectAll("rect")
      .data(cities)
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

function tweetsBarChart(elem, tweets) {
    const nestedTweets = d3.nest()
        .key(d => d.user)
        .entries(tweets);
    nestedTweets.forEach(d => { d.nTweets = d.values.length });
    const maxTweets = d3.max(nestedTweets, d => d.nTweets);
    const yScale = d3.scaleLinear().domain([0, maxTweets]).range([0, 480]);
    d3.select(elem)
      .selectAll("rect")
      .data(nestedTweets)
      .enter()
      .append("rect")
      .attr("width", 60)
      .attr("height", d => yScale(d.nTweets))
      .attr("x", (d, i) => i * 100 + 10)
      .attr("y", d => 500 - yScale(d.nTweets))
      .attr("fill", "#1112f1")
      .attr("stroke", "#000")
      .attr("stroke-width", "1px");
}

plotCharts();