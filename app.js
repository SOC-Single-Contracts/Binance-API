const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios")
const cors = require("cors");


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/get", async (req, res) => {
    try {
        const { slug } = req.query
        const response = await axios.get("https://www.binance.com/bapi/composite/v1/public/promo/cmc/cryptocurrency/listings/latest?limit=5000&start=1")

        const chains = response?.data?.data?.body?.data
        const chain = chains.filter((val, ind) => {
            if (val?.slug == slug || val?.platform?.slug == slug) {
                return val
            }
        })

        return res.status(200).json({
            code: 200,
            success: true,
            message: "Get Data Successfully",
            data: chain
        })
    } catch (error) {
        return res.status(500).json({
            code: 500,
            success: false,
            message: "Some thing went wrong",
            data: error
        })
    }
})


app.listen(3000, () => {
    console.log("Server is up on port: 3000")
})