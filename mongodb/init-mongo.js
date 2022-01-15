const db = connect("mongodb://admin:test@localhost:27017/admin");

db.createUser(
  {
    user: 'admin',
    pwd: 'test',
    roles: [
      {
        role: 'readWrite',
        db: 'test'
      }
    ]
  }
)
