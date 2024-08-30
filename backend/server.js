const express = require("express");
const cookieParser = require("cookie-parser");
const UsuarioModel = require("./models/usuario");

const usuario = new UsuarioModel();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/api/login", async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const result = await usuario.login(nome, senha);
    if (result) {
      res.cookie("id", result[0].id);
      return res
        .status(200)
        .json({ success: true, message: "Login bem-sucedido" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Credenciais inválidas" });
    }
  } catch (err) {
    throw err;
  }
});

app.post("/api/add", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    await usuario.add(nome, email, senha);
    return res
      .status(200)
      .json({ success: true, message: "Usuário criado com sucesso!" });
  } catch (err) {
    throw err;
  }
});

app.get("/api/user", async (req, res) => {
  try {
    const result = await usuario.getUserById(req.cookies.id);
    if (result) {
      return res.status(200).json({ success: true, data: result });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Usuario nao Encontrado" });
    }
  } catch (err) {
    throw err;
  }
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000!");
});
