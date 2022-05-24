const RANS = "правильный ответ: "
const REGEX_WORD = "[A-Za-z0-9А-Яа-я/\\-\\(\\)'’; .\u00A0]+"

const getQAns = new Map()
getQAns.set('gapfill', (div)=>{
    return [...div.querySelectorAll('div.qtext ol li span.aftergapfeedback')]
        .map(el=>el.innerText.slice(1, el.innerText.length-1).trim())
})
getQAns.set('oumultiresponse', (div)=>{
    return [...div.querySelector(".rightanswer").innerText.slice(RANS.length).matchAll(REGEX_WORD)]
        .map(el=>el[0].trim())
})
getQAns.set('multichoice', getQAns.get('oumultiresponse'))
getQAns.set('ddwtos', (div)=>{
    // Возвращает массив строк, находящихся между [...]
    return [...div.querySelector('.rightanswer').innerText.matchAll(/\[([\s\S]+?)]/g)]
        .map(el=>el[1].trim())
})
getQAns.set('gapselect', getQAns.get('ddwtos'))
getQAns.set('ddmatch', (div)=>{
    return [...div.querySelector(".rightanswer tbody").children].map(el=>{
        const arr = [...el.children]
        return {
            question : arr[0].innerText.trim(),
            answer : arr[1].innerText.trim(),
        }
    })
})
getQAns.set('truefalse', (div)=>{
    return div.querySelector(".rightanswer").innerText.slice(RANS.length).trim() === "Верно"
})
getQAns.set('multianswer', (div)=>{
    return [...div.querySelectorAll(".feedbackspan")].map(el=>el.childNodes[2].textContent.slice(RANS.length).trim())
})
getQAns.set('match', (div)=>{
    return [...div.querySelector(".rightanswer").innerText.matchAll(REGEX_WORD + "→" + REGEX_WORD)]
        .map(el=>{
            const [question, answer] = el[0].split("→").map(el=>el.trim())
            return {
                question,
                answer,
            }
        })
})

export default getQAns
