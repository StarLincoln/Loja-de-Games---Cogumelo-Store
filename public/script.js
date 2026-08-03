if (
    localStorage.getItem("logado") === "true" &&
    (window.location.pathname.includes("login.html") ||
     window.location.pathname.includes("index.html"))
) {
    window.location.href = "loja.html";
}
if (
    window.location.pathname.includes("loja.html") &&
    localStorage.getItem("logado") !== "true"
) {
    window.location.href = "login.html";
}

const btnIrLogin = document.getElementById("btnIrLogin");

if (btnIrLogin) {
    btnIrLogin.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}

const btnAutenticar = document.getElementById("btnAutenticar");

if (btnAutenticar) {

    const email = document.querySelector('input[type="email"]');
    const senha = document.querySelector('input[type="password"]');

    btnAutenticar.addEventListener("click", () => {

        if (email.value.trim() === "" || senha.value.trim() === "") {
            alert("Preencha o e-mail e a senha.");
            return;
        }

        localStorage.setItem("logado", "true");
        localStorage.setItem("email", email.value);

        alert("Login feito com sucesso!");

        window.location.href = "loja.html";
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