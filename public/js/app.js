// puts chirps in the DOM
fetch('/chirps')
    .then(res => res.json())
    .then(chirps => {
        chirps.forEach(chirp => {
            $('#chirps').append(`
                <div class="card-body m-2 border shadow bg-light" >
                    <h3 class="card-title">${chirp.name}</h3>
                    <p class="card-text border">${chirp.msg}</p>
                <div>                
            `)
        })
    })