var chai        = require('chai'),
    request     = require('superagent'),
    config      = require('../config'),
    expect      = chai.expect,
    token       = "";

describe('/auth', function () {
    
    describe('/register', function () {
        
        it('success', function (done) {
            request.post(config.apiUrl() + '/auth/register')
                .send({ email: 'test@domain.com', password: '123' })
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.email).to.equal('test@domain.com');
                    done();

                });
        });
        
        it('fails user already exists', function (done) {
            request.post(config.apiUrl() + '/auth/register')
                .send({ email: 'test@domain.com', password: '123' })
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.equal('User already exists.');
                    done();

                });
        });
        
    });
    
    describe('/login', function () {
        
        it('fails email or password invalid.', function (done) {
            request.post(config.apiUrl() + '/auth/login')
                .send({ email: 'test@domain.com', password: '12' })
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.equal('Email or password invalid.');
                    done();

                });
        });
        
        it('success', function (done) {
            request.post(config.apiUrl() + '/auth/login')
                .send({ email: 'test@domain.com', password: '123' })
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.exist;
                    
                    token = res.body;
                    
                    done();
                    
                });
        });
        
    });
    
    describe('/verify', function () {
        
        it('fails without token', function (done) {
            request.get(config.apiUrl() + '/auth/verify')
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(401);
                    done();
                    
                });
        });
        
        it('fails with invalid token', function (done) {
            request.get(config.apiUrl() + '/auth/verify')
                .set('Authorization', 'bearer 123')
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(401);
                    done();
                    
                });
        });
        
        it('success', function (done) {
            request.get(config.apiUrl() + '/auth/verify')
                .set('Authorization', 'bearer ' + token)
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.valid).to.equal(true);
                    done();
                    
                });
        });
        
    });
    
    describe('/me', function () {
        
        it('fails without token', function (done) {
            request.get(config.apiUrl() + '/auth/me')
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(401);
                    done();
                    
                });
        });
        
        it('fails with invalid token', function (done) {
            request.get(config.apiUrl() + '/auth/me')
                .set('Authorization', 'bearer 123')
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(401);
                    done();
                    
                });
        });
        
        it('success', function (done) {
            request.get(config.apiUrl() + '/auth/me')
                .set('Authorization', 'bearer ' + token)
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.email).to.equal('test@domain.com');
                    done();
                    
                });
        });
        
    });
    
    describe('/delete', function () {
        
        it('fails without token', function (done) {
            request.post(config.apiUrl() + '/auth/delete')
                .send({ email: 'test@domain.com' })
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(401);
                    done();
                    
                });
        });
        
        it('success', function (done) {
            request.post(config.apiUrl() + '/auth/delete')
                .set('Authorization', 'bearer ' + token)
                .send({ email: 'test@domain.com' })
                .end(function (err, res) {
                    
                    expect(res).to.exist;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.equal('User deleted');
                    done();
                    
                });
        });
        
    });
});