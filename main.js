const { app, BrowserWindow } = require("electron");
let mainWindow
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true,
        fullscreenable: false,
        resizable: false
    });
    mainWindow.loadFile("index.html");
    
    mainWindow.on("closed", function () {
        console.log("user closed the window.");
        mainWindow = null;
        app.quit();
    });

}
app.whenReady().then(createWindow);

app.on("window-all-closed", function () {
    if(process.platform != "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if(mainWindow === null) {
        createWindow();
    }
});
