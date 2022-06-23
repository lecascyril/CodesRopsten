const Spa = artifacts.require("./Spa.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract('Spa', accounts => {
    const owner = accounts[0];
    const second = accounts[1];
    const third = accounts[2];

    let SpaInstance;

    describe.skip("test setter/getter", function () {

        beforeEach(async function () {
            SpaInstance = await Spa.new({from:owner});
        });

        it("should store animal in array, get race", async () => {
            await SpaInstance.Add("chien",100, 3, { from: owner });
            const storedData = await SpaInstance.Get(0);
            expect(storedData.race).to.equal("chien");
        });

        it("should store animal in array, get height", async () => {
            await SpaInstance.Add("chien",100, 3, { from: owner });
            const storedData = await SpaInstance.Get(0);
            expect(new BN(storedData.taille)).to.be.bignumber.equal(new BN(100));
        });
        it("should store animal in array, get age", async () => {
            await SpaInstance.Add("chien",100, 3, { from: owner });
            const storedData = await SpaInstance.Get(0);
            expect(new BN(storedData.age)).to.be.bignumber.equal(new BN(3));
        });
        it("should store animal in array, get status", async () => {
            await SpaInstance.Add("chien",100, 3, { from: owner });
            const storedData = await SpaInstance.Get(0);
            expect(storedData.isAdopted).to.be.false;
        });
        it("should store 10 animals in array, get 1 height", async () => {
            await SpaInstance.Add("chien",100, 3, { from: owner });            
            await SpaInstance.Add("chien",100, 3, { from: owner });
            await SpaInstance.Add("chien",100, 3, { from: owner });
            await SpaInstance.Add("chien",100, 3, { from: owner });
            await SpaInstance.Add("chien",150, 4, { from: owner });
            await SpaInstance.Add("chien",100, 3, { from: owner });
            await SpaInstance.Add("chien",100, 3, { from: owner });
            await SpaInstance.Add("chien",100, 3, { from: owner });
            await SpaInstance.Add("chien",100, 3, { from: owner });
            await SpaInstance.Add("chien",100, 3, { from: owner });
            const storedData = await SpaInstance.Get(4);
            expect(new BN(storedData.taille)).to.be.bignumber.equal(new BN(150));
        });
    });

    describe.skip("test du set et delete", function () {

        before(async function () {
            SpaInstance = await Spa.new({from:owner});
            await SpaInstance.Add("chien",100, 3, { from: owner });
            await SpaInstance.Add("chat",50, 7, { from: owner });
            await SpaInstance.Add("taupe",12, 1, { from: owner });
        });
        
        it("should set a new age for doggo", async () => {
            let storedData = await SpaInstance.Get(0);
            expect(new BN(storedData.age)).to.be.bignumber.equal(new BN(3));
            await SpaInstance.Set(0, "chien",100, 4, {from:owner});
            storedData = await SpaInstance.Get(0);
            expect(new BN(storedData.age)).to.be.bignumber.equal(new BN(4));
        });

        it("should delete le chat (on n'aime pas les chats)", async () => {
            let storedData = await SpaInstance.Get(1);
            expect(storedData.race).to.equal("chat");
            await SpaInstance.Delete(1, {from:owner});
            storedData = await SpaInstance.Get(1);
            expect(storedData.race).to.equal("");
        });
    });

    describe.skip("test du adopt", function () {

        before(async function () {
            SpaInstance = await Spa.new({from:owner});
            await SpaInstance.Add("chien",100, 3, { from: owner });
            await SpaInstance.Add("chat",60, 4, { from: owner });
            await SpaInstance.Add("taupe",12, 1, { from: owner });
            await SpaInstance.Add("chat",50, 12, { from: owner });
            await SpaInstance.Add("chien",50, 7, { from: owner });
            await SpaInstance.Add("chat",30, 5, { from: owner });
        });

        it("should adopt normaly, POV DOG", async () => {
            await SpaInstance.AdoptOne(4, {from:owner});
            storedData = await SpaInstance.GetAdoption(owner);
            expect(storedData.race).to.equal("chien");
            expect(storedData.isAdopted).to.be.true;
        });

        it("should adopt normaly, POV OWNER", async () => {
            await SpaInstance.AdoptOne(2, {from:owner});
            storedData = await SpaInstance.Adoption(owner);
            expect(new BN(storedData)).to.be.bignumber.equal(new BN(2));
        });

        it("should adopt if un petit chat jeune", async () => {
            await SpaInstance.AdoptIfMax("chat",50,6, {from:owner});
            storedData = await SpaInstance.Get(5);
            expect(storedData.isAdopted).to.be.true;
        });
    });

    describe("tests des event, du require, de revert", function () {

        before(async function () {
            SpaInstance = await Spa.deployed();
        });

        it("should add animal, get event animal Added", async () => {
            const findEvent = await SpaInstance.Add("chien",100, 3, { from: owner });
            await SpaInstance.Add("chat",100, 3, { from: owner });
            expectEvent(findEvent,"animalAdded" ,{id: new BN(0)});
        });

        it("should adopt one, get event animal adopted", async () => {
            const findEvent = await SpaInstance.AdoptOne(0, { from: owner });
            expectEvent(findEvent,"animalAdopted" ,{_id: new BN(0), _addr: owner});
        });

        it("should adopt max, get event animal adopted", async () => {
            const findEvent =await SpaInstance.AdoptIfMax("chat",150,10, {from:owner});
            expectEvent(findEvent,"animalAdopted" ,{_id: new BN(1), _addr: owner});
        });

        it("should not adopt an already adopted animal, revert", async () => {
            await expectRevert(SpaInstance.AdoptOne(0, { from: second }), 'cet animal est deja adopte');
        });

        it("should not adopt a non existing adopted animal, revert", async () => {
            await expectRevert.unspecified(SpaInstance.AdoptOne(5, { from: second }));
        });

        it("should not adopt max, too high criteria", async () => {
            const findReturn = await SpaInstance.AdoptIfMax.call("chat",10,1, {from:owner});
            console.log(findReturn);
            expect(findReturn).to.be.false;
        });

    });

});
