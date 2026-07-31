
const btnIrLogin = document.getElementById('btnIrLogin');
if (btnIrLogin) {
    btnIrLogin.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

const btnAutenticar = document.getElementById('btnAutenticar');

if (btnAutenticar) {
    btnAutenticar.addEventListener('click', () => {

        alert("Login feito");

        window.location.href = "loja.html";

    });
}
