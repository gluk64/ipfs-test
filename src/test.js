'use strict'

const IPFS = require('ipfs')
const bs58 = require('bs58')

const ipfs = new IPFS({
//    repo: 'ipfs/pubsub-demo/' + Math.random(),
    config: {
        Addresses: {
            Swarm: [
                //'/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
            ]
        }
    }
})

// API docs: https://github.com/ipfs/interface-ipfs-core#api

ipfs.once(`ready`, async () =>  {

    // generate content
    const content = {text: 'hello'}

    // add to IPFS as file
    const buffer = Buffer.from(JSON.stringify(content))
    const filesAdded = await ipfs.files.add(buffer, {hash: 'sha3-256'})
    const hash = filesAdded[0].hash // base 58
    const hash16 = '0x' + bs58.decode(hash).toString('hex')
    console.log(`Added file: ${hash} (${hash16})`)
    console.log('filesAdded[0]', filesAdded[0])

    // pin file
    await ipfs.pin.add(hash)

    // fetch file by hash
    const file = await ipfs.files.cat(hash)
    console.log('Loaded content:',  file.toString('utf8'))

    // remove pin
    await ipfs.pin.rm(hash)
    console.log(`Pin removed for ${hash}.`)
})
