import PassportReader from "@gitcoinco/passport-sdk-reader";
import PassportVerifier from "@gitcoinco/passport-sdk-verifier";
import PassportScorer from "@gitcoinco/passport-sdk-scorer"

const reader = new PassportReader("<https://ceramic.passport-iam.gitcoin.co>", "1");
const verifier = new PassportVerifier();

const criteria = [
    {},
    {},
    {}
];
const scorer = new PassportScorer(criteria);


const express = require('express');
const app = express();
const port = 3000;

app.get('/:address', async (req, res) => {
    const address = req.params.address;

    const passport = await reader.getPassport(address);
    const verifiedPassport = await verifier.verifyPassport(address, passport);
    const score = await scorer.getScore(verifiedPassport);

    if(score > 50) {
        res.send(true);
    } else {
        res.send(false);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});






