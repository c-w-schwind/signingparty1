import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

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
        //const votes = ethers.utils.parseUnits("100.0", 18); //???
        const votes = 100;
        await governanceToken.mint(userA.address, votes);
        await governanceToken.mint(userB.address, votes);
        await governanceToken.mint(userC.address, votes);

        // Create new proposal
        const grant = ethers.utils.parseUnits("500.0", 18);
        const newProposal = {
            grantAmount: grant,
            transferCalldata: governanceToken.interface.encodeFunctionData('mint', [owner.address, grant]),
            descriptionHash: ethers.utils.id("Proposal #2: Give owner some tokens")
        };

        const proposeTx = await governor.connect(userA).propose(
            [governanceToken.address],
            [0],
            [newProposal.transferCalldata],
            newProposal.descriptionHash,
        );

        const tx = await proposeTx.wait();
        await hardhat.network.provider.send('evm_mine'); // wait 1 block before opening voting
        const proposalId = tx.events.find((e) => e.event == 'ProposalCreated').args.proposalId;
/*
        // vote
        await governor.connect(userA).castVote(proposalId, VoteType.For);
        await governor.connect(userB).castVote(proposalId, VoteType.For);
        await governor.connect(userC).castVote(proposalId, VoteType.Against);
        await governor.connect(owner).castVote(proposalId, VoteType.Abstain);

        const votes = await governor.proposalVotes(proposalId);
        assert(votes.forVotes.eq(2), "Vote count mismatch"); // < FAILS votes is an array and all its members, "forVotes", "againstVotes", etc are all 0

        // Exec
        await governor.execute(
            [governanceToken.address],
            [0],
            [newProposal.transferCalldata],
            newProposal.descriptionHash,
        );
*/
        return { governor, governanceToken, votes, owner, userA, userB, userC };
    }

    describe("Deployment", function () {
        it("Should set the right votes", async function () {
            const { governanceToken, userA, votes } = await loadFixture(deployBasics);

            expect(await governanceToken.balanceOf(userA.address)).to.equal(100);
        });

        /*it("Should set the right owner", async function () {
            const { lock, owner } = await loadFixture(deployBasics);

            expect(await lock.owner()).to.equal(owner.address);
        });
        */
    });
});
