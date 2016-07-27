var chai        = require('chai'),
    request     = require('superagent'),
    config      = require('../config'),
    expect      = chai.expect;

describe('/auth', function () {
    describe('/register', function () {
        it('success', function(done) {
            request.post(config.apiUrl() + '/auth/register')
                .send({ email: 'test@domain.com', password: '123' })
                .end(function(err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.email).to.equal('test@domain.com');
                    done();

                });
        });
        
        it('error 400 user already exists', function (done) {
            request.post(config.apiUrl() + '/auth/register')
                .send({ email: 'test@domain.com', password: '123' })
                .end(function(err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.equal('User already exists.');
                    done();

                });
        });
    });
});