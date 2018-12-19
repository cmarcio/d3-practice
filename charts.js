async function plotCharts() {
    // load data
    const citeis = await d3.csv("data/cities.csv");
    const { tweets } = await d3.json("data/tweets.json");
    console.log(citeis);
    console.log(tweets);

    // barchart("#barchart");
}

function barchart(elem) {
}

plotCharts();