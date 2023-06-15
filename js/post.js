 // Selezioniamo il form e impediamo la sua sottomissione normale
 const form = document.getElementById('post');
 form.addEventListener('submit', (event) => {
     event.preventDefault();
     // Otteniamo i dati dal form
     const formData = new FormData(form);
     
     // Creiamo una richiesta HTTP
     const xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) { 
         if (this.responseText == 1){
             alert("Post non creato correttamente. Riprovare."); 
             window.location = "./post.html"; 
         }else{
             alert("Post creato.");                    
             window.location = "./home.html";
         }
     }
     };

     // Invio i dati del form al file PHP
     xhr.open('POST', form.action, true);
     xhr.send(formData);
    
 });