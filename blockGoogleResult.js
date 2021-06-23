const result = document.getElementsByClassName('g');

const blockResult = async (result, blockList) => {
  if (result.classList.length > 1) {
    return '';
  }

  let mainDivPosition = 0;
  if (result.children[0].localName === 'h2') {
    mainDivPosition = 1;
  }

  let urlDom =
    result.children[mainDivPosition].children[0].children[0].children[1]
      .children[0].children[0];

  if (urlDom.children.length === 2) {
    urlDom = urlDom.children[0].children[2].children[0];
  }

  const url = new URL('https://' + urlDom.childNodes[0].nodeValue);

  if (blockList.includes(url.hostname)) {
    result.style.display = 'none';
  }
};

chrome.storage.sync.get('google', (googleBlocks) => {
  const numberResult = result.length;
  const blockResults = [];
  const blockList = Object.values(googleBlocks['google']);

  for (let i = 0; i < numberResult; i++) {
    blockResults.push(blockResult(result[i], blockList));
  }

  Promise.all(blockResults).then(() => {});
});
