const express = require('express')
const app = express()

app.get('/hi', function (req, res) {

  var wardrobe = {'name' : 'wardrobe', 'weather' : 'hot'}
  res.json(wardrobe);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})