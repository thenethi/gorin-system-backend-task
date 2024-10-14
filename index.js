const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let highlights = [
  { id: 1, text: "High foot traffic and visibility for retail spaces." },
  {
    id: 2,
    text: "Potential for significant rental income growth due to market demand.",
  },
  { id: 3, text: "Attractive lease terms and incentives for new tenants." },
];

app.get("/api/highlights", (req, res) => {
  res.json(highlights);
});

app.put("/api/highlights", (req, res) => {
  highlights = req.body;
  res.sendStatus(200);
});

app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});
