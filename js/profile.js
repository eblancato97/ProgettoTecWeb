var carouselId = 0; 



//inizializzo le variabili del profilo dell'utente loggato. 


// Avvia la richiesta AJAX al file PHP
var xhr = new XMLHttpRequest();
xhr.open('POST', '../php/profileFiller.php');

xhr.onload = function() {
  if (xhr.status === 200) {
    if(this.responseText!=0){

      var response = JSON.parse(this.responseText);
      // Gestisci la risposta dalla richiesta AJAX  
      
      var postContainer = document.getElementById('post-container')

      console.log(response)
      setProfileInfo(response); 

      response.post.forEach((post, index) => {
        const card = createCard(post);
        postContainer.appendChild(card);
      });
    }else{
      alert('Non sono presenti post.');
    }
  }
};
xhr.send();


//funzione di creazione delle card
function createCard(post) {
  // Card container
  card = document.createElement('div');
  card.classList.add('card');

  //Header
  header = document.createElement('div');
  header.classList.add('post-header');


  // Title
  cardTitle = document.createElement('h3');
  //imgProfilo
  imgProfilo = document.createElement('img');
  imgProfilo.src = "data:image/jpeg;base64,"+post.imgProfilo

 
  titleText = document.createTextNode(post.autore);
  cardTitle.appendChild(titleText);
  

  
  // // header append elements
  header.appendChild(imgProfilo);
  header.appendChild(cardTitle);
  card.appendChild(header);

  // Images
  imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  imageContainer.appendChild(createPostCarousel(post));

 

  card.appendChild(imageContainer);
  const bottom = document.createElement('div')
  bottom.classList.add('bottom-post');

  bottom.appendChild(generateLike(post));
  //creo il bottone e la box dei commenti 
  createCommentButton(post, bottom); 


  
  //creare e appendere la sezione commenti

  card.appendChild(bottom);

  return card
}






// Funzione per la creazione di un carosello per il singolo post
function createPostCarousel(post) {
  // Genera un ID univoco per il carosello

  // Creazione dell'elemento del carosello
  const carouselElement = document.createElement('div');
  carouselElement.id = `carouselContainer${carouselId}`;
  carouselElement.classList.add('carousel', 'slide');

  // Creazione degli indicatori
  const indicatorList = document.createElement('ol');
  indicatorList.classList.add('carousel-indicators');

  // Creazione delle slide
  const slideContainer = document.createElement('div');
  slideContainer.classList.add('carousel-inner');

  // Creazione degli elementi indicatori e slide
  post.immagini.forEach((image, index) => {
    // Creazione dell'elemento indicatore
    const indicatorItem = document.createElement('li');
    indicatorItem.setAttribute('data-target', `#carouselContainer${carouselId}`);
    indicatorItem.setAttribute('data-slide-to', index.toString());

    // Impostazione del primo indicatore come attivo
    if (index === 0) {
      indicatorItem.classList.add('active');
    }

    // Aggiunta dell'elemento indicatore alla lista
    indicatorList.appendChild(indicatorItem);

    // Creazione dell'elemento slide
    const slideItem = document.createElement('div');
    slideItem.classList.add('carousel-item');

    // Impostazione della prima slide come attiva
    if (index === 0) {
      slideItem.classList.add('active');
    }

    // Creazione dell'elemento immagine
    const imageElement = document.createElement('img');
    imageElement.src = "data:image/jpeg;base64," + image;
    imageElement.classList.add('d-block', 'w-100');

    // Aggiunta dell'elemento immagine alla slide
    slideItem.appendChild(imageElement);

    // Aggiunta della slide al contenitore delle slide
    slideContainer.appendChild(slideItem);
  });

  // Aggiunta della lista degli indicatori al carosello
  carouselElement.appendChild(indicatorList);

  // Aggiunta del contenitore delle slide al carosello
  carouselElement.appendChild(slideContainer);

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = `#carouselContainer${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';

  const nextButton = document.createElement('a');
  nextButton.classList.add('carousel-control-next');
  nextButton.href = `#carouselContainer${carouselId}`;
  nextButton.setAttribute('role', 'button');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';

  // Aggiunta delle frecce di navigazione al carosello
  carouselElement.appendChild(prevButton);
  carouselElement.appendChild(nextButton);
  // Inizializzazione del carosello di Bootstrap
  $(`#carouselContainer${carouselId}`).carousel();

  // Aggiungi l'elemento del carosello al post o al contenitore desiderato
  
  carouselId++;

  return carouselElement;
}



//Funzione per il riempimento delle informazioni dell'utente
function setProfileInfo(info){
  const textUser= document.createTextNode(sessionStorage.getItem('username'));
  const user = document.getElementById('username');
  user.appendChild(textUser); 

  const bioUser = document.createTextNode(sessionStorage.getItem('bio'));
  const bio = document.getElementById('bio'); 
  bio.appendChild(bioUser); 

  const nFollower = document.getElementById('n-follower');
  nFollower.appendChild(document.createTextNode(info.follower))
  
  const nFollow = document.getElementById('n-follow');
  nFollow.appendChild(document.createTextNode(info.seguiti));

  const postNumber = document.getElementById('n-post'); 
  postNumber.appendChild(document.createTextNode(info.nPost));

  
}


//funzione per il pulsante like
function generateLike(post){

  //chiamo il file php per verificare se ci sono like nel post
  const likeButton = document.createElement('input');
  likeButton.alt = 'like button';
  likeButton.type = 'image';

  //scorro la lista di like per vedere se l'utente loggato lo ha messo 
  //in modo da avere il cuore pieno o vuoto
  if (post.like !=null){
    post.like.forEach(like =>{
      if (like.username == sessionStorage.getItem('username')){
        likeButton.src = "../resources/cuoreAttivo.png"; 
        likeButton.value = "on"; 
      }
    });
  }else{
    likeButton.src = "../resources/cuoreVuoto.png";
    likeButton.value = 'off';
  }

  likeButton.addEventListener('click', function(){
    var operation;
    if (likeButton.value == 'off'){
      operation = 'add';
    }else{
      operation = 'remove';
    }
    let formData = new FormData();
    formData.append('operation', operation);
    formData.append('idPost', post.idPost);
    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', '../php/like.php');
    xhr2.onload = function(){
      if (xhr2.status == 200){
        if (this.responseText==0){
          likeButton.value = 'on'; 
          likeButton.src = "../resources/cuoreAttivo.png";
        }else{
          likeButton.value = 'off'; 
          likeButton.src = "../resources/cuoreVuoto.png";
        }
      }
    };
    xhr2.send(formData);
  });

  return likeButton;
}

function createCommentButton(post, bottom){
  //creo il bottone dei commenti 
  const commentButton = document.createElement('input');
  commentButton.alt = 'comment button';
  commentButton.type = 'image';
  commentButton.src = '../resources/comment.png';

  //aggiungo il bottone alla sezione sotto il post
  bottom.appendChild(commentButton); 

  //alla pressione 
  
  //creo la sezione comment box per contenere il nuovo commento e la lista dei commenti 
  const commentBox = document.createElement('div');
  commentBox.classList.add('insertComment-box');
  commentBox.style.display = 'none';
  
  var addCommentBox = document.createElement('div');
  addCommentBox.classList.add('addComment-box');
  
  var commentText = document.createElement('input');
  commentText.type= 'text';
  commentText.alt = 'inserisci commento'
  commentText.classList.add('insertText');
  
  var commentSubmit = document.createElement('input');
  commentSubmit.alt = 'invia commento';
  commentSubmit.type = 'image';
  commentSubmit.src = '../resources/add.png';
  commentSubmit.classList.add('submitComment');
  
  //aggiungo la struttura alla box nuovo commento 
  addCommentBox.appendChild(commentText); 
  addCommentBox.appendChild(commentSubmit); 
  
  //attacco la box nuovo commento a quella principale dei commenti 
  commentBox.appendChild(addCommentBox); 
  
  //aggancio un listener all'azione dell'inserimento di un nuovo commento 
  //perciò vado a chiamare il file php che si occupa dell'inserimento del nuovo commento 
  commentSubmit.addEventListener('click', function(){
    let formData = new FormData(); 
    formData.append('idPost', post.idPost); 
    formData.append('commento', commentText.value);

    
    
    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', '../php/comment.php');
    xhr.onload = function(){
      if(xhr.status == 200){
        //inserire controllo inserimento commento
        if (this.responseText == 0){

        }
      }
    };
    xhr.send(formData); 
  });
  
  commentBox.appendChild(generateCommentList(post)); 
  bottom.appendChild(commentBox); 
  
  commentButton.addEventListener('click', function(){
    var stile = getComputedStyle(commentBox); 
    if (stile.display === 'block'){
      commentBox.style.display = 'none';
    }else{
      commentBox.style.display = 'block'; 
    }
  });
}


//chiamo la funzione per generare la lista dei commenti già esistenti che mi restituirà una lista
function generateCommentList(post){
  //caricamento per tutti i post di tutti i commenti all'inizio nascosti 
  //ma alla pressione del bottone verranno visualizzati

  const CommentListBox = document.createElement('div');
  CommentListBox.classList.add('commentList-container');

  let formData2 = new FormData(); 
  formData2.append("idPost", post.idPost); 
  console.log(post.idPost);

  var xhr3 = new XMLHttpRequest(); 
  xhr3.open('post', '../php/getComment.php');
  xhr3.onload = function(){
    if(xhr3.status == 200){
      var response = JSON.parse(this.responseText);
      if (response.commentCount>0){
        const listaCommenti = document.createElement('ul');
        listaCommenti.classList.add('lista-commenti');
        response.comment.forEach(element =>{
          //per ogni elemento creo una riga commento 
          const commentRow = document.createElement('li');
          commentRow.classList.add('commentRow');

          const imgCommento = document.createElement('img');
          imgCommento.classList.add('imgCommento');
          imgCommento.src = "data:image/jpeg;base64," + element.imgProfilo;

          const userCommento = document.createElement('h6');
          userCommento.classList.add('user-commento');
          userCommento.appendChild(document.createTextNode(element.username));

          const testoCommento = document.createElement('p');
          testoCommento.classList.add('testo-commento');
          const comment = document.createTextNode(element.commento); 
          testoCommento.appendChild(comment); 

          commentRow.appendChild(imgCommento); 
          commentRow.appendChild(userCommento);
          commentRow.appendChild(testoCommento); 

          listaCommenti.appendChild(commentRow); 

          
        });
        CommentListBox.appendChild(listaCommenti); 
      }
    }
  };
  xhr3.send(formData2); 



  return CommentListBox;


}




