const form = document.querySelector(".formlogin");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.querySelector("#nome");
  const password = document.querySelector("#senha");

  await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome.value,
      senha: password.value,
    }),
  }).then(() => {
    window.location.href = "/home";
  });
});
