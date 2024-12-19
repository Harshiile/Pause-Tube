// Inserting Script into newly created tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.includes('https://www.youtube.com/watch?')) {
        if (changeInfo.status == "complete") {
            chrome.scripting.executeScript({
                target: { tabId },
                files: ["scripts/content.js"]
            });
        }
    }
});

chrome.tabs.onActivated.addListener((info) => {
    let allTabs = [], closeTabs = []
    // Collecting all tabs
    chrome.tabs.query({}, tabs => {
        for (const tab of tabs) {
            if (tab.url.includes('https://www.youtube.com/watch?')) {
                allTabs.push(tab.id)
            }
        }
    })
    // Filtering tabs
    chrome.tabs.query({ active: true }, tabs => {
        // Resume active tab video
        chrome.tabs.sendMessage(tabs[0].id, { tabId: tabs[0].id, type: 'RESUME' }, (res) => {
        })

        closeTabs = allTabs.filter((tab) => tab != tabs[0].id)
        for (const tab of closeTabs) {
            // Loop for pause other tab videos
            chrome.tabs.sendMessage(tab, { tabId: tab, type: 'PAUSE' }, (res) => {
            })
        }
    })
})

