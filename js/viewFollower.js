function getFollower(){
    const follow = document.getElementById('follow-er');
    follow.textContent = 'FOLLOWER';
    form = new FormData(); 
    form.append('userFollower', sessionStorage.getItem('userFollower'));
    xhr = new XMLHttpRequest();
    xhr.open('post', '../php/userFollower.php', true);
    xhr.onload = function(){
        if (xhr.status == 200){
            var response =  JSON.parse(this.responseText);
            if (response.follower == 0){
                alert("L'utente non ha follower al momento.")
            }else{
                populateFollower(response.follower); 
                console.log(response.follower)
            }
        }
}
xhr.send(form);
}

function populateFollower(response){
    const lista = document.getElementById('view-follower');

    response.forEach(element => {
        let elemento = document.createElement('li');
        elemento.classList.add('elemento-lista')
        let img = document.createElement('img');
        img.alt = "immagine profilo di "+element.utenteSeguente;
        img.src = "data:image/jpeg;base64,"+element.imgProfilo;
        console.log(element.utenteSeguente);

        let nome = document.createElement('h3');
        nome.appendChild(document.createTextNode(element.utenteSeguente));
        if (sessionStorage.getItem('username')!= element.utenteSeguente){
            nome.addEventListener('click', function(){
                sessionStorage.setItem('otherUser', element.utenteSeguente);
                sessionStorage.setItem('otherBio', element.bio);
                sessionStorage.setItem('otherImg', element.imgProfilo);
                window.location = "./otherProfile.html";
            })
        }
        
        elemento.appendChild(img);
        elemento.appendChild(nome); 
        lista.appendChild(elemento); 
    });


}