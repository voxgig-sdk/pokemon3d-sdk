
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Pokemon3dSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = Pokemon3dSDK.test()
    equal(testsdk instanceof Pokemon3dSDK, true,
      'Pokemon3dSDK.test() must return a client synchronously')
  })

})
