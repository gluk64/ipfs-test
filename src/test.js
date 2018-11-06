'use strict'

const IPFS = require('ipfs')

const ipfs = new IPFS({
//    repo: 'ipfs/pubsub-demo/' + Math.random(),
    config: {
        Addresses: {
            Swarm: [
                '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
            ]
        }
    }
})

ipfs.once(`ready`, async () =>  {

    // add data
    const filesAdded = await ipfs.files.add(Buffer.from('Hello World 101'))
    const hash = filesAdded[0].hash
    console.log('Added file:', hash)

    // get data
    const file = await ipfs.files.cat(hash)
    console.log(file.toString('utf8'))

})
