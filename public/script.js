if (
  localStorage.getItem("logado") === "true" &&
  (window.location.pathname.includes("login.html") ||
    window.location.pathname.includes("index.html"))
) {
  window.location.href = "/store";
}
if (
  window.location.pathname.includes("loja.html") &&
  localStorage.getItem("logado") !== "true"
) {
  window.location.href = "/store";
}

const btnIrLogin = document.getElementById("btnIrLogin");

if (btnIrLogin) {
  btnIrLogin.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

const btnAutenticar = document.getElementById("btnAutenticar");

if (btnAutenticar instanceof HTMLButtonElement) {
  const email = document.getElementById("email");
  const senha = document.getElementById("senha");

  btnAutenticar.addEventListener("click", async (event) => {
    event.preventDefault();

    if (
      !(email instanceof HTMLInputElement) ||
      !(senha instanceof HTMLInputElement)
    ) {
      return;
    }

    if (!email.value.trim() || !senha.value.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          senha: senha.value,
        }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem("logado", "true");
        localStorage.setItem("email", email.value);

        window.location.href = "/store";
      } else {
        alert(dados.erro);
      }
    } catch (erro) {
      console.error("Erro no login:", error);

      return res.status(500).json({
        erro: "Erro interno",
        detalhe: String(error),
      });
    }
  });
}

const btnSair = document.getElementById("btnSair");

if (btnSair) {
  btnSair.addEventListener("click", () => {
    localStorage.removeItem("logado");
    localStorage.removeItem("email");
    window.location.href = "index.html";
  });
}

const spanNomeUsuario = document.getElementById("nome-usuario");

if (spanNomeUsuario) {
  const emailSalvo = localStorage.getItem("email");

  if (emailSalvo) {
    const nomeUsuario = emailSalvo.split("@")[0];
    spanNomeUsuario.textContent = "Olá, " + nomeUsuario;

    const btnPerfil = document.getElementById("btnPerfil");
    if (btnPerfil) {
      btnPerfil.title = "Logado como: " + emailSalvo;
    }
  } else {
    spanNomeUsuario.textContent = "Visitante";
  }
}
