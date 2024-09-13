const express = require("express");
const cookieParser = require("cookie-parser");
const UsuarioModel = require("./models/usuario");
const path = require("path");

const usuario = new UsuarioModel();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/style", express.static(path.join(__dirname, "public")));
app.use("/controllers", express.static(path.join(__dirname, "controllers")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/views/cadastro.html");
});

app.post("/login", async (req, res) => {
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

app.post("/cadastro/add", async (req, res) => {
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

app.get("/home", async (req, res) => {
  try {
    const result = await usuario.getUserById(req.cookies.id);
    if (result) {
      res.render("home", { user: result[0] });
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
