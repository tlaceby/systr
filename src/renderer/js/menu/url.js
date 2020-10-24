let url_field = document.getElementById("url")
ipcRenderer.on("get_url", (event, data) => {
    url_field.innerHTML = data.url;
})