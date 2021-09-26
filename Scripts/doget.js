const doGet = (url) => {
    const promiseCallback = (resolve, reject) => {
        fetch(url)
            .then((response) =>  {
                if (!response.ok) throw new Error("Error ao executar requisição, status ") + response.status;
                return response.json();
            })
            .then(resolve)
            .catch(reject)
    }
    return new Promise(promiseCallback)
}

export default doGet