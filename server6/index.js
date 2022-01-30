// Import packages.
const express = require('express')
const rpc = require('./rpc');

// Create and configure a webserver.
const app = express()
app.use(express.json())


// Create a test endpoint
app.get('/', async (req, res) => {
  res.status(200).send('SERVER 6');
})

// Start the webserver.
app.listen(3000, () => {
    console.log('Server is up on port 3000')
    rpc.main();
})
