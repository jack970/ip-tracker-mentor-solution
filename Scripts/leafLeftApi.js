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

export default getLocationMap