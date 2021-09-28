import doGet from './Scripts/doget.js'
import renderData from './Scripts/renderData.js';

window.onsubmit = (event) => {
    event.preventDefault()
    const inputValue = document.querySelector("#myInput").value
    
    const urlNoHttp = inputValue.replace(/(^\w+:|^)\/\//, '');

    renderData(urlNoHttp)
}

window.addEventListener('DOMContentLoaded', () => {
    doGet(`https://api.ipify.org/?format=json`)
        .then(data => {
            renderData(data.ip)  
        })
})


    
