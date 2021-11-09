'use strict';
const supertest = require('supertest')
const {app} = require('../src/server');
const base64= require('base-64')
const request = supertest(app);
const {db}=require('../src/auth/models/index')



describe('Testing basic-auth',()=>{
    beforeAll(async () => {
        await db.sync()
    });
    
    afterAll(async () => {
        await db.drop()
    });

    it('signup to create a new user',async()=>{
        let response = await request.post('/signup').send({username: 'khalid',password:'husain'})
        expect(response.status).toBe(201)
        expect(response.body.username).toEqual("khalid")
    })
    it('signin to login as a user (use basic auth)',async()=>{
        // let data={username:'khalid',password:'husain'}
        let response = await request.post('/signin').auth('khalid','husain')
        expect(response.status).toEqual(201);
        // expect(response.body.username).toEqual('khalid');
    })

})

    
describe('test middleware', () => {
    beforeAll(async () => {
        await db.sync()
    });
    
    afterAll(async () => {
        await db.drop()
    });
    it('POST to /signup to create a new user', async () => {
        const data = { username: 'khalid', password: 'husian' };
        const response = await request.post('/signup').send(data);
        expect(response.status).toEqual(201);
        expect(response.body.username).toEqual(data.username);
      });
    it('routes assert the requirements (signup/signin)', async () => {
        const response = await request.post('/');
        expect(response.status).toBe(404);
    });


it('should throw 403 on POST to /signin with bad info (uncorrect data)', async () => {

const response = await request.post('/signin').auth('test7', 'false');;
expect(response.status).toBe(403);
expect(response.body.username).toBe(undefined);
});


});