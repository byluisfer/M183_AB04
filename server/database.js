import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("my.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Error to conect to DB:", err);
  } else {
    console.log("Contection to DB correctly");
  }
});

export default db;