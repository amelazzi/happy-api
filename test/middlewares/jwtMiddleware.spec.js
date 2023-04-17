import { expect } from 'chai'
import sinon from 'sinon'
import { extractJwt } from '../../src/middlewares/jwtMiddleware'

describe('extractJwt', () => {
  let req
  let res
  let nextSpy

  beforeEach(() => {
    req = {
      headers: {},
      jwt: 'test-jwt'
    }
    res = {}
    nextSpy = sinon.spy()
  })

  it('should delete jwt from request object if it exists', async () => {
    await extractJwt(req, res, nextSpy)

    expect(req.jwt).to.be.undefined
  })

  it('should not set jwt in request object if it does not exist in headers', async () => {
    await extractJwt(req, res, nextSpy)

    expect(nextSpy.calledOnce).to.be.true
    expect(req.jwt).to.be.undefined
  })

  it('should set jwt in request object if it exists in headers', async () => {
    const token = 'test-token'
    req.headers.authorization = `Bearer ${token}`

    await extractJwt(req, res, nextSpy)

    expect(nextSpy.calledOnce).to.be.true
    expect(req.jwt).to.equal(token)
  })

  it('should call next function after processing the request', async () => {
    await extractJwt(req, res, nextSpy)

    expect(nextSpy.calledOnce).to.be.true
  })
})
