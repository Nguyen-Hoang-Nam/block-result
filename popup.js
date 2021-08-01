const listBox = document.getElementById("list");

const checkEmptyObject = (obj) => {
    for (let _key in obj) {
        return false;
    }

    return true;
};

let id = 0;
chrome.storage.sync.get("google", (items) => {
    for (const key in items["google"]) {
        id = key;

        const item = document.createElement("div");
        item.setAttribute("class", "item");
        item.setAttribute("data-id", id);

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("data-id", id);
        input.setAttribute("class", "inputBox");
        input.value = items["google"][id];
        input.style.display = "none";

        input.addEventListener("blur", function () {
            const itemId = this.getAttribute("data-id");
            const displayBox = document.querySelector(
                `.displayBox[data-id='${itemId}']`
            );

            displayBox.innerHTML = this.value;
            if (displayBox.style.display == "none") {
                this.style.display = "none";
                displayBox.style.display = "flex";
            }

            chrome.storage.sync.get("google", (google) => {
                if (!checkEmptyObject(google)) {
                    google = google["google"];
                }
                google[itemId] = this.value;
                chrome.storage.sync.set({ google });
            });
        });

        const display = document.createElement("div");
        display.setAttribute("data-id", id);
        display.setAttribute("class", "displayBox");
        display.style.display = "flex";
        display.innerHTML = items["google"][key];

        display.addEventListener("click", function () {
            const itemId = this.getAttribute("data-id");
            const inputBox = document.querySelector(
                `input[data-id='${itemId}']`
            );

            this.style.display = "none";
            inputBox.style.display = "block";
            inputBox.focus();
        });

        const trash = document.createElement("img");
        trash.setAttribute("data-id", id);
        trash.setAttribute("src", "bin.svg");
        trash.setAttribute("class", "trash");

        trash.addEventListener("click", function () {
            const itemId = this.getAttribute("data-id");

            chrome.storage.sync.get("google", (google) => {
                google = google["google"];
                delete google[itemId];
                chrome.storage.sync.set({ google });
            });
            const itemBox = document.querySelector(
                `.item[data-id='${itemId}']`
            );
            itemBox.style.display = "none";
        });

        item.appendChild(input);
        item.appendChild(display);
        item.appendChild(trash);

        list.appendChild(item);
    }
});

const addButton = document.getElementById("add");
addButton.addEventListener("click", () => {
    id++;
    const item = document.createElement("div");
    item.setAttribute("class", "item");
    item.setAttribute("data-id", id);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("data-id", id);
    input.setAttribute("class", "inputBox");

    input.addEventListener("blur", function () {
        const itemId = this.getAttribute("data-id");
        const displayBox = document.querySelector(
            `.displayBox[data-id='${itemId}']`
        );

        displayBox.innerHTML = this.value;
        if (displayBox.style.display == "none") {
            this.style.display = "none";
            displayBox.style.display = "flex";
        }

        chrome.storage.sync.get("google", (google) => {
            if (!checkEmptyObject(google)) {
                google = google["google"];
            }

            google[itemId] = this.value;
            chrome.storage.sync.set({ google });
        });
    });

    const display = document.createElement("div");
    display.setAttribute("data-id", id);
    display.setAttribute("class", "displayBox");
    display.style.display = "none";

    display.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id");
        const inputBox = document.querySelector(`input[data-id='${itemId}']`);

        this.style.display = "none";
        inputBox.style.display = "block";
        inputBox.focus();
    });

    const trash = document.createElement("img");
    trash.setAttribute("data-id", id);
    trash.setAttribute("src", "bin.svg");
    trash.setAttribute("class", "trash");

    trash.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id");

        chrome.storage.sync.get("google", (google) => {
            google = google["google"];
            delete google[itemId];
            chrome.storage.sync.set({ google });
        });
        const itemBox = document.querySelector(`.item[data-id='${itemId}']`);
        itemBox.style.display = "none";
    });

    item.appendChild(input);
    item.appendChild(display);
    item.appendChild(trash);

    list.appendChild(item);

    const inputBox = document.querySelector(`input[data-id='${id}']`);
    inputBox.focus();
});
