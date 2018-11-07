'use strict'

const crypto = require('crypto')
const algorithm = 'aes-256-gcm'

var password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY'

function encrypt(text) {
	// generate a new IV for each encryption
	const iv = crypto.randomBytes(16).toString('hex')

	// encrypt
	var cipher = crypto.createCipheriv(algorithm, password, iv)
	var encrypted = cipher.update(text, 'utf8', 'hex')
	encrypted += cipher.final('hex')

	// generate MAC
	var tag = cipher.getAuthTag().toString('hex')

	// return result
	return {
		content: encrypted,
		tag,
		iv
	}
}

function decrypt(encrypted) {
	// verify MAC and decrypt
	var decipher = crypto.createDecipheriv(algorithm, password, encrypted.iv)
	decipher.setAuthTag(new Buffer(encrypted.tag, 'hex'))
	var dec = decipher.update(encrypted.content, 'hex', 'utf8')
	dec += decipher.final('utf8') // this will throw an exception if MAC verification failed
	return dec
}

var encrypted = encrypt("hello world")
console.log('encrypted: ', encrypted)

var decrypted = decrypt(encrypted)
console.log('decrypted: ', decrypted)
