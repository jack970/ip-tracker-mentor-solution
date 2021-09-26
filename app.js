import IP_API_KEY from './Scripts/apikey.js';
import doGet from './Scripts/doget.js'

const map = L.map('mapid', {
    'center': [0, 0],
    'zoom': 0,
    'layers': [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
    ]
})

const getLocationMap = (lat, long) => {
    map.setView([lat,long], 13)
    var iconMarker = L.icon({
        iconUrl: "images/icon-location.svg",

        iconSize:     [30, 40],
        iconAnchor:   [10, 40], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    })
    L.marker([lat, long], {icon: iconMarker}).addTo(map);
}

const renderData = (urlNoHttp) => {
    doGet(`https://geo.ipify.org/api/v1?apiKey=${IP_API_KEY}&domain=${urlNoHttp}`)
        .then(data => {
            const html = `
                <div class="container-info">
                    <p class="title-info">IP Address</p>
                    <h1 class="title info">${data.ip}</h1>
                </div>
                <hr>
                <div class="container-info">
                    <p class="title-info">Location</p>
                    <h1 class="title info">${data.location.city}, ${data.location.region} ${data.location.postalCode}</h1>
                </div>
                <hr>
                <div class="container-info">
                    <p class="title-info">Timezone</p>
                    <h1 class="title info">UTC${data.location.timezone}</h1>
                </div>
                <hr>
                <div class="container-info">
                    <p class="title-info">ISP</p>
                    <h1 class="title info">${data.isp}</h1>
                </div>`
            
            document.querySelector(".painel").innerHTML = html

            getLocationMap(data.location.lat, data.location.lng)

    }).catch(console.error)
}

window.onsubmit = (event) => {
    event.preventDefault()
    const inputValue = document.querySelector("#myInput").value
    
    const urlNoHttp = inputValue.replace(/(^\w+:|^)\/\//, '');

    renderData(urlNoHttp)
}

window.addEventListener('DOMContentLoaded', () => {
    doGet("https://api.ipify.org/?format=json")
        .then(data => {
            doGet(`https://geo.ipify.org/api/v1?apiKey=${IP_API_KEY}&domain=${data.ip}`)
            .then(infoIP => {
                renderData(infoIP.ip)
            })  
        })
})
    
