import PassportReader from "@gitcoinco/passport-sdk-reader";
import PassportVerifier from "@gitcoinco/passport-sdk-verifier";
import PassportScorer from "@gitcoinco/passport-sdk-scorer"

const reader = new PassportReader("<https://ceramic.passport-iam.gitcoin.co>", "1");
const verifier = new PassportVerifier();


//TODO: fill stamps & their respective scores
const criteria = [
    { //Example Stamp
        provider: "BrightID",
        issuer: "did:key:z6MkghvGHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC",
        score: 0.5
    },
    {},
    {}
];


const scorer = new PassportScorer(criteria);


//TODO: fill the passport address (msg.sender)
const address = "0x1234...";

const passport = await reader.getPassport(address);
const verifiedPassport = await verifier.verifyPassport(address, passport);
const score = await scorer.getScore(verifiedPassport);

const verified = checkScore(score, 5);


//TODO: Specify the threshold a user has to reach to be considered a verified user
function checkScore(score, threshold) {
    return score > threshold;
}