import {employeesDataApi} from '../services/employeesServices'
const  assert = require('chai').assert
const chai = require('chai');
chai.use(require('chai-http'));

var expect = chai.expect;
describe('/GET employees', () => {
    it('it should GET employees with default props and return right format of data', (done) => {
        chai.request("http:"+employeesDataApi.url)
            .get('/')
            .query(employeesDataApi.defaultProps)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('Employees').that.is.a('array');
                expect(res.body).to.have.property('TotalCount').that.is.a('number');

                
                done();
            })
    })
    it('it should GET employees with pageSize prop and return right count of rows according to pageSize', (done) => {
        chai.request("http:"+employeesDataApi.url)
            .get('/')
            .query({...employeesDataApi.defaultProps, pageSize: 2})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                console.log("page length, total count of employees", res.body.Employees.length, res.body.TotalCount)
                expect(res.body.Employees.length).to.satisfy(function (length) {
                    return (length <= res.body.TotalCount && length == 2)
                });
                done();
            })
    })
})

