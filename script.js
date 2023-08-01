const img = document.querySelector('.img');
const btnLike = document.querySelector('#like')
const btnDisLike = document.querySelector('#noLike')
const mainVotee = document.querySelector('#mainVotee')
const mainBreeds = document.querySelector('#mainBreeds')
const votee = document.querySelector('#votee')
const breeds = document.querySelector('#breeds')
const select = document.querySelector('#select')
const carusel = document.querySelector('.carousel-inner')
const myCarousel = document.querySelector('#myCarousel')
const indicator = document.querySelector('#indicator')
const descriptions = document.querySelector('#description')
// const carousel = new bootstrap.Carousel(myCarousel)
const randomCat = async () => {
    await fetch(`https://api.thecatapi.com/v1/images/search`)
            .then(res => res.json())
            .then(data => {
                const {url} = data[0]
                img.innerHTML = `
                <img src="${url}">
                `
            })
}

const handleBreeds = () => {
    fetch('https://api.thecatapi.com/v1/breeds')
        .then(res => res.json())
        .then(data => {
            let secOp = {}
            data.map(el => {
                secOp[el.id] = el.name
                select.innerHTML += `
                    <option value="${el.id}">${el.name}</option>
                `
            })
            select.value = Object.keys(secOp)[0]
            // console.log(Object.keys(secOp)[0])
        })
}
handleBreeds()


const breedsChek = async () => {
    await fetch (`https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=${select.value}`)
        .then(res => res.json())
        .then(data => {
            carusel.innerHTML = ''
            carusel.innerHTML = `
                    <div class="carousel-item active">
                        <img src=${data[0].url} class="d-block w-100" alt="">
                    </div>
            `
            data.map((el, idx) => {
                indicator.innerHTML += `
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${idx+1}" aria-label="Slide ${idx+2}"></button>
                `
            if (idx !== 0){
                carusel.innerHTML += `
                    <div class="carousel-item">
                        <img src=${el.url} class="d-block w-100" alt="">
                    </div>
                `
            }
            })
            // console.log(data)
        })
}

const breedsDescriptions = () => {
    fetch('https://api.thecatapi.com/v1/breeds')
        .then(res => res.json())
        .then(data => {
            data.map(el => {
                if (el.id === select.value){
                    descriptions.innerHTML = `<h3>${el.name}<h3>`
                    descriptions.innerHTML += `<span style="font-weight: bold">id: ${el.id}</span>`
                    descriptions.innerHTML += `<p>${el.description}</p>`
                    descriptions.innerHTML += `<p style="font-weight: bold">${el.temperament}</p>`
                    descriptions.innerHTML += `<p>${el.origin}</p>`
                    descriptions.innerHTML += `<p>${el.weight.imperial} kgs</p>`
                    descriptions.innerHTML += `<p>${el.life_span} average life span</p>`
                }
            })
        })
}

votee.addEventListener('click', () => {
    mainVotee.style.display = 'block'
    mainBreeds.style.display = 'none'
    randomCat()
})
breeds.addEventListener('click', () => {
    mainBreeds.style.display = 'block'
    mainVotee.style.display = 'none'
    breedsChek()
    breedsDescriptions()
})
select.addEventListener('change', () => {
    breedsChek()
    breedsDescriptions()
})

btnLike.addEventListener('click', () => {
    randomCat()
})

btnDisLike.addEventListener('click', () => {
    randomCat()
})