const Conexao = require("./conexao");

class UsuarioModel {
  db = new Conexao();
  tabela = "usuario";

  constructor() {
    this.db.conectar();
  }

  async add(nome, email, senha) {
    try {
      await this.db.query(
        `INSERT INTO ${this.tabela} (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`
      );
    } catch (err) {
      throw err;
    }
  }

  async getUserById(id) {
    try {
      const result = await this.db.query(
        `SELECT * FROM ${this.tabela} WHERE id = ${id}`
      );
      return result;
    } catch (err) {
      throw err;
    }
  }

  async login(nome, senha) {
    try {
      const result = await this.db.query(
        `SELECT * FROM ${this.tabela} WHERE nome = '${nome}' AND senha = '${senha}'`
      );

      if (result.length > 0) return result;
      else return false;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UsuarioModel;
