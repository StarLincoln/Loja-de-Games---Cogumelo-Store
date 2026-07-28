
const btnIrLogin = document.getElementById('btnIrLogin');
if (btnIrLogin) {
    btnIrLogin.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

const btnAutenticar = document.getElementById('btnAutenticar');
if (btnAutenticar) {
    btnAutenticar.addEventListener('click', () => {
        alert('Entrando Entrando na loja');
        window.location.href = 'https://google.com'; 
    });
}
