const form = document.querySelector(".formcadastro");

const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch("/cadastro/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome.value,
      email: email.value,
      senha: senha.value,
    }),
  }).then(() => {
    window.location.href = "/";
  });
});
