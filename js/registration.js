var datar;
const formr = document.getElementById('register');
formr.addEventListener('submit', (event) => {
    event.preventDefault();

    //Levo gli spazi bianchi nell'username
    const inputVal = document.getElementById("usernamer").value;
    const strNoSpace = inputVal.replace(/\s+/g, '');
    document.getElementById("usernamer").value = strNoSpace;
    alert(strNoSpace);
    const formDatar = new FormData(formr);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            datar = this.responseText;
            if (datar == 1) {
                alert("Username già utilizzato, riprovare con un username diverso.");
            } else {
                if (datar == 0) {
                    alert("Username inserito correttamente, procedere con il login.");
                }
            }
            window.location = "../index.html";

        }
    };

    // Invio i dati del form al file PHP
    xhr.open('POST', formr.action, true);
    xhr.send(formDatar);
});