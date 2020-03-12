const express = require('express');
const db = require('./data/db.js');

const server = express(); 

server.listen(4000, () => {
  console.log('listening on port 4000 ...');
});

server.use(express.json());

server.get('/', (req, res) => {
  res.send('hello world!');
});

// R - Read (CRUD)
server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json({ success: false, err }); 
    })
}); 

server.get('/api/users/:id', (req, res) => {
  const {id} = req.params; 

  db.find(id)
    .then(userId => {
      res.status(200).json({ userId }); 
    })
    .catch(err => {
      res.status(500).json({ success: false, err }); 
    })
})

// C - Create (CRUD)
server.post('/api/users', (req,res) => {
  const hubInfo = req.body;
  console.log(hubInfo); 

  db.add()
    .then(hub => {
      req.status(201).json({ success: true, hub });
    })
    .catch(err => {
      res.status(500).json({success: false, err }); 
    })
}); 

// U - Update (CRUD)
server.put('/api/user/:id', (req, res) => {
  const {id} = req.params;
  const chnages = req.body;

  db.update(id, chnages)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, update }); 
      } else {
        res.status(404).json( {success: false, message: "id not found "}); 
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err }); 
    })
})

// D - Delete (CRUD)
server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end(); 
      } else {
        res.status(404).json({success: false, err }); 
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err }); 
    })
});  