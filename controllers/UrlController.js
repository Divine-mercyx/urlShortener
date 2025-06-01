import Url from "../models/urlModel.js";

export const shortenUrl = async (req, res) => {
    try {
        const { originalUrl, shortUrl, user } = req.body;
        if (originalUrl.slice(0, 7) === "https://") {

            const url = new Url({
                originalUrl,
                shortUrl,
                user
            });

            await url.save();
            return res.status(201).json({originalUrl, shortUrl});
        }
        return res.status(400).send({success: false, message: "URL not found."});
    } catch (err) {
        res.status(400).send({ error: err, success: false });
    }
}

export const visitUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const url = await Url.findOne({ shortUrl: shortUrl })
        if (url) {
            console.log(url.originalUrl);
            return res.redirect(url.originalUrl)
        }
    } catch (err) {
        res.status(400).send({ error: err });
    }
}
