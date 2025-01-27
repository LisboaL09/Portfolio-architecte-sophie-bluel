console.log('login.js')
document.getElementById('connexion').addEventListener('click', async (event) => {

    sessionStorage.getItem('userToken');
    console.log('connexion');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            const userToken = data.token;
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userToken', userToken);
            window.location.replace('/Portfolio-architecte-sophie-bluel/FrontEnd/');
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Erreur de connexion');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur de connexion');
    }
});