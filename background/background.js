import {script_builder} from "../content/dynamic_injection.js";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({"TestAnswersMap" : new Map()})
});


const tabName_to_src = new Map()
tabName_to_src.set("summary", "content/summary/main.js")
tabName_to_src.set("review", "content/review/main.js")
tabName_to_src.set("view", "content/view/main.js")
tabName_to_src.set("attempt", "content/attempt/main.js")

function isMoodleQuizURL(url){
    return /^https:\/\/moodle\.phystech\.edu\/mod\/quiz\//.test(url)
}

function scriptInjection(tab){
    const URL_LastRoot = tab.url.match("[^/]+(?=\.php)")[0]

    if(tabName_to_src.has(URL_LastRoot)){
        chrome.scripting.executeScript({
            func : script_builder,
            args : [tabName_to_src.get(URL_LastRoot)],
            target: {allFrames: false, tabId: tab.id}
        })
    }
}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const isPageLoaded = changeInfo?.status === 'complete'
    if(isPageLoaded){
        if(!isMoodleQuizURL(tab.url)) return

        scriptInjection(tab)
    }
})