document
  .querySelector(".formcadastro")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = "./index.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Tente novamente mais tarde.");
    }
  });
