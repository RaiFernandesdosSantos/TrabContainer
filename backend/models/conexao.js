const mysql = require("mysql2");

class Conexao {
  constructor() {
    this.conexao = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    this.conectar();
  }

  conectar() {
    this.conexao.connect((err) => {
      if (err) {
        console.error("Erro ao conectar: " + err);
        return;
      }
      console.log("Conectado");
    });
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      this.conexao.query(sql, (err, result) => {
        if (err) {
          console.error("Erro ao executar a query" + err);
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }
}

module.exports = Conexao;
