import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange/";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "tickers/BTC-USD");

    res.render("index.ejs", { content: result.data });
    console.log(result.data);
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response) });
  }
});

app.post("/get-ticker", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "tickers/" + req.body.ticker);
    const form = req.body.ticker;
    res.render("index.ejs", { content: result.data });
    console.log(form);
    console.log(result.data);
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
