document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

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
            window.location.replace('/');
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Erreur de connexion');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur de connexion');
    }
});