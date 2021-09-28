import IP_API_KEY from "./apikey.js"
import doGet from "./doget.js"
import getLocationMap from "./leafLeftApi.js"

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
            hiddenLoadPage()

    }).catch(console.error)
}

const hiddenLoadPage = () => {
    const loadClass = document.querySelector(".loader-wrapper")
    loadClass.classList.add('hidden') // Esconde loader container
    window.setTimeout(() => {
        loadClass.remove()
    }, 900)

}

export default renderData