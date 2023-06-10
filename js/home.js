var carouselId = 0; 


// Avvia la richiesta AJAX al file PHP
// Esempio di richiesta POST AJAX senza parametri
var xhr = new XMLHttpRequest();
xhr.open('POST', '../php/homeFiller.php');

xhr.onload = function() {
  if (xhr.status === 200) {
    if (this.responseText!=0){
      var response = JSON.parse(this.responseText);
      // Gestisci la risposta dalla richiesta AJAX  
      
      var postContainer = document.getElementById('post-container')

      console.log(response)

      response.forEach((post, index) => {
        const card = createCard(post);
        postContainer.appendChild(card);
      });
   }else{
      alert("al momento non ci sono post da visualizzare.")
   }
  }
};

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

  return card
}


xhr.send();



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


