var carouselId = 0;


var valoreParametro = sessionStorage.getItem('otherUser');
// Creazione di un oggetto FormData per inviare il parametro
var formData = new FormData();
formData.append('parametro', valoreParametro);

// Creazione dell'oggetto XMLHttpRequest
var xhr = new XMLHttpRequest();

// Configurazione della richiesta
xhr.open('POST', '../php/otherProfile.php', true);

// Gestione della risposta
xhr.onload = function () {
  if (xhr.status === 200) {
    if (this.responseText != 0) {
      // quì ottengo tutte le informazioni del profilo ricercato
      var response = JSON.parse(this.responseText);
      console.log(response.seguito);
      var postContainer = document.getElementById('post-container');
      setProfileInfo(response);
      if (response.nPost > 0) {
        response.post.forEach((post, index) => {
          const card = createCard(post);
          postContainer.appendChild(card);
        });
      }

      console.log(xhr.responseText);

    } else {
      //non caricare la pagina e tornare indietro.
      alert('Non è stato possibile caricare correttamente il profilo.')
    }
  }
};

// Invio della richiesta
xhr.send(formData);




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
  imgProfilo.src = "data:image/jpeg;base64," + post.imgProfilo


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

  // post.immagini.forEach(image => {

  //   const img = document.createElement('img');
  //   img.src = "data:image/jpeg;base64," + image;
  //   img.alt = 'Image';  
  // });


  // Ottenere il riferimento all'elemento del carosello


  card.appendChild(imageContainer);

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

function setProfileInfo(info) {
  console.log("Set profile")
  const img = document.getElementById('img');
  img.src = "data:image/jpeg;base64," + sessionStorage.getItem('otherImg');

  const textUser = document.createTextNode(sessionStorage.getItem('otherUser'));
  const user = document.getElementById('username');
  user.appendChild(textUser);

  const bioUser = document.createTextNode(sessionStorage.getItem('otherBio'));
  const bio = document.getElementById('bio');
  bio.appendChild(bioUser);

  const nFollower = document.getElementById('n-follower');
  nFollower.appendChild(document.createTextNode(info.follower))

  const nFollow = document.getElementById('n-follow');
  nFollow.appendChild(document.createTextNode(info.seguiti));

  const postNumber = document.getElementById('n-post');
  postNumber.appendChild(document.createTextNode(info.nPost));

  const buttonSegui = document.getElementsByClassName('segui');
  Array.from(buttonSegui).forEach(button => { 
    if (info.seguito == true) {
      button.value = 'Segui già';
      button.textContent = 'Segui già';
    } else {
      button.value = 'Segui';
      button.textContent = 'Segui';
    }  
  });
  

  Array.from(buttonSegui).forEach(button => {
    button.addEventListener('click', function () {
      var ok;

      console.log("CCPCC")

      if (button.value == 'Segui') {
        ok = follow(sessionStorage.getItem('username'), sessionStorage.getItem('otherUser'), 'add');
        if (ok == 0) {
          button.value = 'Segui già';
        }
      } else {
        ok = follow(sessionStorage.getItem('username'), sessionStorage.getItem('otherUser'), 'remove');
        if (ok == 0) {
          button.value = 'Segui';
        }
      }
      //forzo il ricaricamento della pagina per aggiornare il valore del bottone e il contatore dei segui
      location.reload();


    });
  })
}





function follow(loggato, otherUser, operation) {
  var valoreParametro = sessionStorage.getItem('otherUser');
  // Creazione di un oggetto FormData per inviare il parametro
  var formData = new FormData();
  formData.append('seguente', loggato);
  formData.append('seguito', otherUser);
  formData.append('operation', operation);

  // Creazione dell'oggetto XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Configurazione della richiesta
  xhr.open('POST', '../php/follow.php', true);

  // Gestione della risposta
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(this.responseText);
      if (this.responseText == 0) {
        return 0;
      } else {
        return 1;
      }
    }
  };

  // Invio della richiesta
  xhr.send(formData);

}


