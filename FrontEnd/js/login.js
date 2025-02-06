console.log('login.js')

function Login () {

    document.getElementById('login-form').addEventListener('submit', async (event) => {

        console.log('connexion');
        event.preventDefault();

        const email = document.getElementById('email');
        const password = document.getElementById('password');
        sessionStorage.getItem('userToken');

        try {
            const response = await fetch('http://localhost:5678/api/users/login' ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept:'application/json'
                },
                body: JSON.stringify({ email: email.value , password: password.value })
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
            console.error('Erreur :', error);
            alert('Erreur de connexion');
        }
    });
}

Login();