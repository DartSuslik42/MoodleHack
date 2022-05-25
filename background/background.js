import {script_builder} from "../content/dynamic_injection.js";
import {mapName} from "../content/map_name.js";

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.local.set({
        [mapName] : [...(new Map)],
        started_test_title : "",
    })
    console.log("background.js script installed")
})

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
        }, ()=>{
            console.log(`${tabName_to_src.get(URL_LastRoot)} injected in ${tab.url}`)
        })
    }
}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const isPageLoaded = changeInfo?.status === 'loading'//'complete'
    if(isPageLoaded){
        if(!isMoodleQuizURL(tab.url)) return

        scriptInjection(tab)
    }
})