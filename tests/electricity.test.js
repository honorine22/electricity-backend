//During the test the env variable is set to test
let mongoose = require("mongoose");
let Electricity = require('../models/electricity.model');
//Require the dev-dependencies
let chaiHttp = require('chai-http');
let server = require('../server');
// let should = chai.should();
const chai = require('chai')
const expect = chai.expect



chai.use(chaiHttp);
//Our parent block
describe('electricity bill', () => {
    /*
      * Test the /GET route
      */
    describe('/GET electricity bill', () => {
        it('it should GET all the electricity bill', (done) => {
            chai.request(server)
                .get('/electricity')
                .end((err, res) => {
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('message').to.deep.equal('electricity bills retrieved successfully!')
                    // expect(res.body).to.have.property('data').to.be.a('array');
                    expect(res).to.have.status(200)
                    // expect(res.body.data[0].amount).to.eql('')
                    // expect(res.body).length.to.be.equal(0)
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST electricity bill', () => {
        it('it should not POST electricity bill without pages field', (done) => {
            let newBill = {
                meter: "Learn and present Nodejs Testing",
                token: false
            }
            chai.request(server)
                .post('/electricity')
                .send(newBill)
                .end((err, res) => {
                    expect(res.status).to.equal(500);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it('it should POST electricity bill ', (done) => {
            let newBill = {
                amount: "Club Meeting",
                meter: "Attending peace Club",
                token: true
            }
            chai.request(server)
                .post('/electricity')
                .send(newBill)
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('message').to.deep.equal('bill successfully added!');
                    expect(res.body.newBill).to.have.property('amount')
                    expect(res.body.newBill).to.have.property('meter')
                    expect(res.body.newBill).to.have.property('token')
                    done();
                });
        });
    });

    // Get, update, and delete by id
    describe('/electricity/:billId', () => {
        it('it should GET electricity bill by the given id', (done) => {
            let bill = new Bill({ amount: 'Club Meeting', meter: 'Attending peace Club', token: true })
            bill.save((err, bill) => {
                chai.request(server).get('/electricity/', + bill.id).send(bill)
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.have.property('message').to.deep.equal('electricity bills retrieved successfully!')
                        done();
                    })
            })
        })
    })

    describe('/PUT/:id electricity bill', () => {
        it('it should UPDATE a bill given the id', (done) => {
            let bill = new Bill({ amount: "Learning", meter: "Never stop learning!", token: false })
            bill.save((err, bill) => {
                chai.request(server)
                    .put('/electricity/' + bill.id)
                    .send({ amount: "Learning", meter: "Never stop learning!", token: false })
                    .end((err, res) => {
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.have.property('message').to.deep.equal('bill updated!');
                        expect(res.body.updatedbill).to.have.property('amount').to.deep.equal('Learning')
                        expect(res.body.updatedbill).to.have.property('meter').to.deep.equal('Never stop learning!')
                        expect(res.body.updatedbill).to.have.property('token').to.deep.equal(false)
                        done();
                    });
            });
        });
    });

    /*
 * Test the /DELETE/:id route
 */
    describe('/DELETE/:id electricity bill', () => {
        it('it should DELETE electricity bill given the id', (done) => {
            let bill = new Bill({ amount: "Learning", meter: "Never stop learning!", token: false })
            bill.save((err, bill) => {
                chai.request(server)
                    .delete('/electricity/' + bill.id)
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.have.property('message').to.deep.equal('bill successfully deleted!');
                        done();
                    });
            });
        });
    });
});

