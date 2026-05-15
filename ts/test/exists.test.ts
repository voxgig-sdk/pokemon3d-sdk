
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Pokemon3dSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await Pokemon3dSDK.test()
    equal(null !== testsdk, true)
  })

})
