async function fetchUserData() {
  try {
    const response = await fetch("/api/user", {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById("nome").textContent = result.data.nome;
      document.getElementById("name").textContent = result.data.nome;
      document.getElementById("email").textContent = result.data.email;
      document.getElementById("senha").textContent = result.data.senha;
    } else {
      alert(result.message);
      window.location.href = "/login.html";
    }
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    alert("Erro ao obter dados do usuário. Tente novamente mais tarde.");
  }
}

document.addEventListener("DOMContentLoaded", fetchUserData);
