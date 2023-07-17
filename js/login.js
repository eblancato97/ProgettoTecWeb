var data; 
const form = document.getElementById('login');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { 
            if (this.responseText == 1){
                alert("Utente o password errate. Riprovare l'accesso. "); 
                window.location = "./index.html"; 
            }else{

                alert("Utente trovato.");                    
                let data = JSON.parse(this.responseText);
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('bio', data.bio); 
                sessionStorage.setItem('logged', data.logged); 
                sessionStorage.setItem('image', data.urlImage); 

         
                window.location = "./pages/home.html";
            }
        }
    };

    // Invio i dati del form al file PHP
    xhr.open('POST', form.action, true);
    xhr.send(formData);
   
});

function goToRegistration() {
    window.location = "./pages/registration.html"
}