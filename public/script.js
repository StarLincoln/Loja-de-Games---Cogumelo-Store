
const btnIrLogin = document.getElementById('btnIrLogin');
if (btnIrLogin) {
    btnIrLogin.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

const btnAutenticar = document.getElementById('btnAutenticar');
if (btnAutenticar) {
    btnAutenticar.addEventListener('click', () => {
        alert('Login feito com sucesso! Entrando na loja...');
        window.location.href = 'https://google.com'; 
    });
}
