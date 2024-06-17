// connecting to the server 
const socket = io('http://localhost:3000')


import bins from './bins.json' with {type:"json"}
var mybins = bins.Dimapur.length;
console.log(mybins)
console.log(bins.Dimapur[0][4])

document.addEventListener('DOMContentLoaded', () => {
    console.log(bins)
    const duplicateCards = document.querySelector(".dupCards");
    const originalCard = document.querySelector(".card");
    const originalContainer = document.querySelector('.originalContainer')
    originalCard.style.display = 'none';
    originalContainer.style.display = 'none';
    for (let i = 0; i < mybins; i++){
        var newCard = originalCard.cloneNode(true);
        newCard.style.display = "block";

        // add location names 
        var location = newCard.querySelector('.cardHeader1')
        location.innerHTML = bins.Dimapur[i][1]

        // adding bind Ids 
        var id = newCard.querySelector('.id')
        id.innerHTML = `Bin ID: ${bins.Dimapur[i][2]}`

        // updating progress bars 
        var bars = newCard.querySelector('.progress-bar');
        var percent = newCard.querySelector('.progressNotify');
        bars.setAttribute('aria-valuenow', `${bins.Dimapur[i][5].toString()}`);
        bars.style.width = bins.Dimapur[i][5];
        percent.innerHTML = bins.Dimapur[i][5];
        // for 60%
        if (parseInt(bins.Dimapur[i][5]) < 80 && parseInt(bins.Dimapur[i][5]) > 40) {
            var button = newCard.querySelector('.btn')
            button.disabled = true;
            button.classList.remove('btn-danger');
            button.classList.add('btn-secondary')
            bars.classList.remove('bg-danger', 'bg-warning', 'bg-success');
            bars.classList.add('bg-warning')
        }
        // for 40%
        else if (parseInt(bins.Dimapur[i][5]) < 60 && parseInt(bins.Dimapur[i][5]) > 20) {
            var button = newCard.querySelector('.btn')
            button.disabled = true;
            button.classList.remove('btn-danger');
            button.classList.add('btn-secondary')
            bars.classList.remove('bg-danger', 'bg-warning', 'bg-success');
            bars.classList.add('bg-info')
        }
        // for 20%
        else if (parseInt(bins.Dimapur[i][5]) < 40 && parseInt(bins.Dimapur[i][5]) > 0) {
            var button = newCard.querySelector('.btn')
            button.disabled = true;
            button.classList.remove('btn-danger');
            button.classList.add('btn-secondary')
             bars.classList.remove('bg-danger', 'bg-warning', 'bg-success');
            bars.classList.add('bg-success')
        }

        // updating names and phone numeber
        var name = newCard.querySelector('.name');
        var number = newCard.querySelector('.number');
        name.innerHTML = bins.Dimapur[i][4];
        number.innerHTML = bins.Dimapur[i][3];

        // adding click events to buttons
        var buttons = newCard.querySelector('.btn')
        buttons.onclick = (() => {
            const binID = bins.Dimapur[i][2];
            return () => {
                console.log("A button has been pressed");
                // Emit the event to the server with the binID
                socket.emit('binID', bins.Dimapur[i][2]);
            };
        })(bins.Dimapur[i][2]);
    
         duplicateCards.appendChild(newCard)
       
    }
})

socket.on('connect', () => {
    console.log("Client has connected to the server ")
})