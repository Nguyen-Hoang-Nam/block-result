const results = document.getElementsByClassName("g");
const latests = document.querySelectorAll(`[role=listitem]`);

const blockResult = async (result, blockList) => {
    if (result.classList.length > 1) {
        return "";
    }

    const topDiv = ["h2", "link"];
    let mainDivPosition = 0;
    if (topDiv.includes(result.children[0].localName)) {
        mainDivPosition = 1;
    }

    let urlDom =
        result.children[mainDivPosition].children[0].children[0].children[1]
            .children[0].children[0];

    if (urlDom.children.length === 2) {
        urlDom = urlDom.children[0].children[2].children[0];
    }

    const url = new URL(urlDom.childNodes[0].nodeValue);

    if (blockList.includes(url.hostname)) {
        result.style.display = "none";
    }
};

const blockLatest = async (latest, blockList) => {
    let firstChild = latest.children[0];
    if (firstChild.localName !== "g-inner-card") {
        firstChild = firstChild.children[0];
    }

    const urlDom =
        firstChild.children[0].children[0].children[0].children[1].children[0]
            .children[1].childNodes[0].nodeValue;

    const fullUrlDom =
        "https://" + urlDom.charAt(0).toLowerCase() + urlDom.slice(1);
    const url = new URL(fullUrlDom);

    if (blockList.includes(url.hostname)) {
        latest.style.display = "none";
    }
};

chrome.storage.sync.get("google", (googleBlocks) => {
    const numberResult = results.length;
    const numberLatest = latests.length;
    const blockResults = [];
    const blockList = Object.values(googleBlocks["google"]);

    for (let i = 0; i < numberResult; i++) {
        blockResults.push(blockResult(results[i], blockList));
    }

    if (numberLatest > 0) {
        for (let i = 0; i < numberLatest; i++) {
            blockResults.push(blockLatest(latests[i], blockList));
        }
    }

    Promise.all(blockResults).then(() => {});
});
