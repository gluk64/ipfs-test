'use strict'

const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')

const ipfs = new IPFS({
    repo: 'ipfs/pubsub-demo/' + Math.random(),
    EXPERIMENTAL: {
        pubsub: true
    }
})

ipfs.once(`ready`, () => ipfs.id((err, peerInfo) => {
    if (err) { throw err }
    console.log(`IPFS node started and has ID ` + peerInfo.id)

    const room = Room(ipfs, 'ipfs-pubsub-xp3rta')
    room.on('peer joined', (peer) => console.log('peer ' + peer + ' joined'))
    room.on('peer left', (peer) => console.log('peer ' + peer + ' left'))

    room.on('message', (message) => console.log('message from ' + message.from + ': ' + message.data.toString()))

    // now started to listen to room
    room.on('subscribed', () => {
      console.log('Now connected!')
    })

    setInterval(() => room.broadcast('hey everyone!'), 2000)
}))
