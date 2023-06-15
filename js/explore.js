var data; 
const form = document.getElementById('explore');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Otteniamo i dati dal form
    const formData = new FormData(form);
    
    // Creiamo una richiesta HTTP
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { 
            if(this.responseText != 0){
                var data = JSON.parse(this.responseText);
                console.log(data); 
                var container = document.getElementById('users-container');
                while (container.hasChildNodes()){
                    container.firstChild.remove(); 
                }
                data.forEach(element => {
                   
                    container.appendChild(createUserElement(element)); 
                });
            }else{
                alert("Nessun utente trovato.")
            }
        }
    };

    // Invio i dati del form al file PHP
    xhr.open('POST', form.action, true);
    xhr.send(formData);
   
});



function createUserElement(data){
    element = document.createElement('div'); 
    element.classList.add('user-element');

    imgElement = document.createElement('img'); 
    imgElement.classList.add('img-element');
    imgElement.src = 'data:image/jpeg;base64,' + data.imgProfilo;




    textElement = document.createElement('h5');
    textElement.classList.add('text-element');
    text = document.createTextNode(data.username);
    //trovare come passare il parametro
    textElement.addEventListener('click', (event)=>{
        goToProfile(data); 
    });

    textElement.appendChild(text); 
    element.appendChild(imgElement); 
    element.appendChild(textElement);
    
    return element; 
}

function goToProfile(data){ 
    sessionStorage.setItem('otherUser', data.username); 
    sessionStorage.setItem('otherImg', data.imgProfilo); 
    sessionStorage.setItem('otherBio', data.bio); 
    // var param = encodeURIComponent(user);
    // var newLocation = "./otherProfile.html?parameter="+param;
    window.location = "./otherProfile.html";
}