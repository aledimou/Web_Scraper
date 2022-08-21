const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.goals.gr/coupon/2022-08-20";

axios(url).then((res) => {
  const htmlCode = res.data;

  const $ = cheerio.load(htmlCode);
  const homeTeams = [];
  const awayTeams = [];
  const scores = [];

  const matches = [];

  $(".live-row ").each(function (i, elem) {
    homeTeams[i] = $(this).find($(".live-home")).text();
    awayTeams[i] = $(this).find($(".live-away")).text();
    scores[i] = $(this).find($(".live-score")).text();

    matches.push({
      home: homeTeams[i],
      away: awayTeams[i],
      score: scores[i],
    });
  });

  console.log(matches);
});

app.listen(5000, () => {
  console.log("server running on 5000");
});
