import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hardhat, { ethers } from "hardhat";

describe("SigningParty", function () {
    const hardhat = require("hardhat")

    // define a fixture to reuse the same setup in every test.
    // use loadFixture() to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployBasics() {
        // get some accounts. contracts are deployed using the first account by default
        const [owner, userA, userB, userC] = await ethers.getSigners();

        const GovernanceToken = await ethers.getContractFactory("SigningPartyToken");
        const governanceToken = await GovernanceToken.deploy();
        const Governor = await ethers.getContractFactory("SigningPartyGovernor");
        const governor = await Governor.deploy(governanceToken.address);

        // Distribute governance tokens, 100 each user
        //const amountOfVotes = ethers.utils.parseUnits("100.0", 18); //???
        const amountOfVotes = 100;
        await governanceToken.mint(userA.address, amountOfVotes);
        await governanceToken.mint(userB.address, amountOfVotes);
        await governanceToken.mint(userC.address, amountOfVotes);

        // Create new proposal
        const grant = ethers.utils.parseUnits("500.0", 18);
        const newProposal = {
            grantAmount: grant,
            transferCalldata: governanceToken.interface.encodeFunctionData('mint', [owner.address, grant]),
            descriptionHash: ethers.utils.id("Proposal #2: Give owner some tokens")
        };

        const proposeTx = await governor.propose(
            [governanceToken.address],
            [0],
            [newProposal.transferCalldata],
            newProposal.descriptionHash,
        );

        const tx = await proposeTx.wait();
        // @ts-ignore
        const proposalId = tx.events.find((e) => e.event == 'ProposalCreated').args.proposalId;

        // need to wait for one block before voting has opened
        await hardhat.network.provider.send('evm_mine');

        await governanceToken.connect(userA).delegate(userA.address);
        await governanceToken.connect(userB).delegate(userB.address);
        await governanceToken.connect(userC).delegate(userC.address);
        await governanceToken.delegate(owner.address);

        console.log(await governanceToken.getVotes(userA.address));
        console.log(await governanceToken.getVotes(userB.address));
        console.log(await governanceToken.getVotes(userC.address));

        // vote
        await governor.connect(userA).castVote(proposalId, 0);
        await governor.connect(userB).castVote(proposalId, 1);
        await governor.connect(userC).castVote(proposalId, 2);
        await governor.connect(owner).castVote(proposalId, 2);

        const votingResults = await governor.proposalVotes(proposalId);

/*
        // Exec
        await governor.execute(
            [governanceToken.address],
            [0],
            [newProposal.transferCalldata],
            newProposal.descriptionHash,
        );
*/
        return { governor, governanceToken, amountOfVotes, votingResults, owner, userA, userB, userC , proposalId};
    }

    describe("Minting", function () {
        it("Should set the right amount of votes", async function () {
            const { governanceToken, userA, amountOfVotes } = await loadFixture(deployBasics);
            expect(await governanceToken.balanceOf(userA.address)).to.equal(100);
        });
    });
    describe("Voting", function () {
        it("Should return voting results correctly", async function () {
            const { governor, proposalId, votingResults } = await loadFixture(deployBasics);
            expect(votingResults.forVotes).to.equal(2);
        });
    });
});
