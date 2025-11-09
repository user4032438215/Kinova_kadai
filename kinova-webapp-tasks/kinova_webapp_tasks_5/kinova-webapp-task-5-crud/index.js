const express = require("express");
const { Pool } = require("pg"); // PostgreSQL用ライブラリを読み込む

const pool = new Pool({
  user: "postgres",       
  host: "localhost",      
  database: "kinova_sample",   // ※データベース講座で作成した DB 名
  password: "19990120", 
  port: 5432              
});

const app = express();
const PORT = 3000;

app.use(express.json());