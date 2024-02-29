export default function initHeader(config) {
    let header = document.getElementById("header");
    if (config !== undefined && config.header === false) {
        header.style.display = "none";
    }
    else {
        let headerTitle = '<div id="headerTitle"><b>Lite</b> Design Editor</div>';
        let headerMenu = '<div id="close-btn" class="headerMenuItem"><span title="Close and return Json and Image">Close</span></div>'
            + '<div id="export-btn" class="headerMenuItem"><span title="Export Json">Export</span></div>'
            + '<div id="import-btn" class="headerMenuItem"><input type="file" id="jsonInput" accept=".json,.tpl"><label for="jsonInput"><span style="cursor:pointer;" title="Import Json">Import</span></label></div>'
            + '<div class="headerMenuItem"><span id="download-btn" title="Download Image">Download</span></div>';
        header.innerHTML = headerTitle + headerMenu;

        if (config !== undefined) {
            if (config.headerTitle !== undefined) {
                document.getElementById("headerTitle").innerHTML = config.headerTitle;
            }
            if (config.headerMenuItems !== undefined) {
                if (config.headerMenuItems.import !== undefined && config.headerMenuItems.import === false) {
                    document.getElementById('import-btn').style.display = "none";
                }
                if (config.headerMenuItems.export !== undefined && config.headerMenuItems.export === false) {
                    document.getElementById('export-btn').style.display = "none";
                }
                if (config.headerMenuItems.close !== undefined && config.headerMenuItems.close === false) {
                    document.getElementById('close-btn').style.display = "none";
                }
            }
        }
    }
}