function getFollow(){
    const follow = document.getElementById('follow-er');
    follow.textContent = 'FOLLOW';
    form = new FormData(); 
    form.append('userFollow', sessionStorage.getItem('userFollow'));
    xhr = new XMLHttpRequest();
    xhr.open('post', '../php/userFollow.php', true);
    xhr.onload = function(){
        if (xhr.status == 200){
            var response =  JSON.parse(this.responseText);
            if (response.follow == 0){
                alert("L'utente non segue nessuno al momento.")
            }else{
                console.log(response.follow)
                populateFollow(response.follow); 
            }
        }
    }
    xhr.send(form);
}

function populateFollow(response){
    const lista = document.getElementById('view-follower');

    response.forEach(element => {
        let elemento = document.createElement('li');
        let img = document.createElement('img');
        img.alt = "immagine profilo di "+element.utenteSeguito;
        img.src = "data:image/jpeg;base64,"+element.imgProfilo;
        let nome = document.createElement('h3');
        nome.appendChild(document.createTextNode(element.utenteSeguito));
        nome.addEventListener('click', function(){
            sessionStorage.setItem('otherUser', element.utenteSeguito);
            sessionStorage.setItem('otherBio', element.bio);
            sessionStorage.setItem('otherImg', element.imgProfilo);
            window.location = "./otherProfile.html";
        })
    
        elemento.appendChild(img);
        elemento.appendChild(nome); 
       
        lista.appendChild(elemento); 
    });


}