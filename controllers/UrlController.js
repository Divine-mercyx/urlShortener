import Url from "../models/urlModel.js";

export const shortenUrl = async (req, res) => {
    try {
        const { originalUrl, shortUrl, user } = req.body;
        const existingUrl = await Url.findOne({shortUrl: shortUrl, user: user});
        if (existingUrl) return res.status(400).send({message: "URL already exists"});
        if (originalUrl.startsWith("http://") || originalUrl.startsWith("https://") || originalUrl.startsWith("www.")) {
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
        if (url) return res.redirect(url.originalUrl)
    } catch (err) {
        res.status(400).send({ error: err });
    }
}
