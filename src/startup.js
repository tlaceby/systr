const { ipcMain } = require("electron");

module.exports =  {

    get_initial_url (storage) {
        return new Promise((resolve, reject) => {
            let default_url = "https://google.com/"

            storage.get('home_url', function(error, data) {
                if (error) reject(error);
                if(data.url.length > 0) {
                    resolve(data.url);
                } else {
                    storage.set("home_url", {url: default_url }, function(error) {
                        if (error) reject(error);
                        
                        resolve(default_url)
                      });
                }
              });
        })
       
    }
}
