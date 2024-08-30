const mysql = require("mysql2");

class Conexao {
  constructor() {
    this.conexao = mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "Senha123",
      database: process.env.DB_NAME || "trabalhomarco",
    });
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
      this.conectar();

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
