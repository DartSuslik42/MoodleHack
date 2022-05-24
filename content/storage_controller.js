const map = new Map

export function getAnswersLocally(test_title){
    return map.has(test_title) ? map.get(test_title) : null
}

export function saveAnswersLocally(test_title, answers){
    map.set(test_title, answers)
}

export function hasAnswersLocally(test_title){
    return map.has(test_title)
}