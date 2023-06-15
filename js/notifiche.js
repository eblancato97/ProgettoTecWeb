
const notificationContainer = document.getElementById('notification-container');

xhr = new XMLHttpRequest(); 
xhr.open('POST', '../php/notifiche.php');
xhr.onload = function(){
    if(xhr.status == 200){
        var response = JSON.parse(this.responseText); 
        if (response.notifiche!=null){
            notificationContainer.appendChild(populate(response.notifiche));
        }
    }
}
xhr.send(); 


function populate(notifiche){
    
    const listaNotifiche = document.createElement('ul');
    listaNotifiche.classList.add('lista');

    notifiche.forEach(element => {
        
        
        const notificationElement = document.createElement('li'); 
        notificationElement.classList.add('notification-element'); 
        
        const imgNotifica = document.createElement('img');
        imgNotifica.classList.add('imgNotifica');
        imgNotifica.src = "data:image/jpeg;base64,"+element.imgProfilo; 
        
        const notifica = document.createElement('span');
        notifica.classList.add('notifica');
        var breakNotifica =  element.notifica.replace(/(\S{20})(?!\s)/g, '$1 ');
        notifica.appendChild(document.createTextNode(breakNotifica)); 

        notificationElement.appendChild(imgNotifica);
        notificationElement.appendChild(notifica); 

        listaNotifiche.appendChild(notificationElement);      
    });

    return listaNotifiche; 


    
}