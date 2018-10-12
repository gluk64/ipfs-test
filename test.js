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



}))
