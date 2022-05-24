import {mapName} from "./map_name.js";

const map_promise = chrome.storage.local.get(mapName).then(result=>{
    const $ = new Map(result[mapName])
    console.log($)
    return $
})

export async function getAnswersLocally(test_title){
    return await map_promise.then((map)=>{
        return map.has(test_title) ? map.get(test_title) : null
    })
}

export async function saveAnswersLocally(test_title, answers){
    await map_promise.then(async (map)=>{
        map.set(test_title, answers)
        await chrome.storage.local.set({[mapName]: [...map]})
    })
}

export async function hasAnswersLocally(test_title){
    return await map_promise.then((map)=>{
        return map.has(test_title)
    })
}