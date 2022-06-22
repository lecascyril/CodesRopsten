const Students = artifacts.require("./Students.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract('Etudiants', accounts => {
    const owner = accounts[0];
    const second = accounts[1];
    const third = accounts[2];

    let StudentsInstance;

    describe("test setter", function () {

        beforeEach(async function () {
            StudentsInstance = await Students.new({from:owner});
        });

        it("should store name student in mapping", async () => {
            await StudentsInstance.set(owner,"cyril", 12, { from: owner });
            const storedData = await StudentsInstance.EtudiantsMap(owner);
            expect(storedData.name).to.equal("cyril");
        });

        it("should store note student in mapping", async () => {
            await StudentsInstance.set(owner,"cyril", 12, { from: owner });
            const storedData = await StudentsInstance.EtudiantsMap(owner);
            expect(new BN(storedData.note)).to.be.bignumber.equal(new BN(12));
        });

        it("should store name student in array", async () => {
            await StudentsInstance.set(owner,"cyril", 12, { from: owner });
            const storedData = await StudentsInstance.EtudiantsArray(0);
            expect(storedData.name).to.equal("cyril");
        });

        it("should store note student in array", async () => {
            await StudentsInstance.set(owner,"cyril", 12, { from: owner });
            const storedData = await StudentsInstance.EtudiantsArray(0);
            expect(new BN(storedData.note)).to.be.bignumber.equal(new BN(12));
        });
    });

    describe.only("test des getters", function () {

        beforeEach(async function () {
            StudentsInstance = await Students.new({from:owner});
        });

        it("should show name student in mapping", async () => {
            await StudentsInstance.set(owner,"cyril", 12, { from: owner });
            const storedData = await StudentsInstance.getMap(owner);
            expect(storedData.name).to.equal("cyril");
        });

        it("should show note student in mapping", async () => {
            await StudentsInstance.set(owner,"cyril", 12, { from: owner });
            const storedData = await StudentsInstance.getMap(owner);
            expect(new BN(storedData.note)).to.be.bignumber.equal(new BN(12));
        });

        it("should show name student in array", async () => {
            await StudentsInstance.set(owner,"cyril", 12, { from: owner });
            const storedData = await StudentsInstance.getArray("cyril");
            expect(storedData.name).to.equal("cyril");
        });

        it("should show note student in array", async () => {
            await StudentsInstance.set(owner,"cyril", 12, { from: owner });
            const storedData = await StudentsInstance.getArray("cyril");
            expect(new BN(storedData.note)).to.be.bignumber.equal(new BN(12));
        });
    });

    describe("test du deleter", function () {

        before(async function () {
            StudentsInstance = await Students.new({from:owner});
            await StudentsInstance.set(owner,"cyril", 12, { from: owner });
            await StudentsInstance.set(second,"alice", 12, { from: second });
            await StudentsInstance.set(third,"bob", 12, { from: third });
            await StudentsInstance.deleter(owner, { from: owner });
        });
        
        it("should delete name in mapping", async () => {
            const storedData = await StudentsInstance.getMap(owner);
            expect(storedData.name).to.equal("");
        });

        it("should delete note in mapping", async () => {
            const storedData = await StudentsInstance.getMap(owner);
            expect(new BN(storedData.note)).to.be.bignumber.equal(new BN(0));
        });

        it("should delete name in array", async () => {
            const storedData = await StudentsInstance.getArray("cyril");
            expect(storedData.name).to.equal("");
        });

        it("should delete note in array", async () => {
            const storedData = await StudentsInstance.getArray("cyril");
            expect(new BN(storedData.note)).to.be.bignumber.equal(new BN(0));
        });
    });

    describe("test du setter classe", function () {

        before(async function () {
            StudentsInstance = await Students.new({from:owner});
        });

        it("should pass class", async () => {
            await StudentsInstance.setClasse(2, {from: owner})
            expect(await StudentsInstance.classe.call()).to.be.bignumber.equal(new BN(2));
        });
    });
});
