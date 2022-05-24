
const setQAns = new Map()
setQAns.set('ddwtos', (div, ans)=>{
    const drags = [...div.querySelector('div.drags').children]
    const inputs = [...div.querySelectorAll('input.placeinput')]
    inputs.forEach((i, idx) => i.value = 1 + drags.findIndex(el=>{
        return el.innerText.replace(/\s+/g, '').includes(ans[idx].replace(/\s+/g, ''))
    }))
})
setQAns.set('ddmatch', (div, ans)=>{
    const qArr = [...div.querySelector(".ablock tbody").children]
    const qAnsArr = [...div.querySelector(".ablock ul.matchorigin").children]
    console.log([qArr, qAnsArr])
    qArr.forEach((q, idx)=>{
        const userAnswer = ans.find(el=>q.querySelector(".text").innerText.includes(el.question))
        // const pageAnswer = qAnsArr.find(el=>el.innerText.includes(userAnswer.answer))
        const selectValue = [...q.querySelector("select").children].find(el=>el.innerText.includes(userAnswer.answer))
        q.querySelector("select").value = selectValue.value
    })

})
setQAns.set('truefalse',  (div, ans)=>{
    const input = [...div.querySelectorAll(".answer input")].find(el=>el.id.includes(String(ans)))
    input.checked = true
})
setQAns.set('multianswer', (div, ansArr)=>{
    const a = [...div.querySelectorAll(".subquestion")]
    a.forEach((el, idx)=>{
        el.lastChild.value = ansArr[idx]
    })
})
setQAns.set('match', (div, ansArr)=>{
    div.querySelector("tbody").childNodes.forEach(q=>{
        const qAns = ansArr.find((el)=>{
            return q.childNodes[0].innerText.includes(el["question"])
        })

        q.childNodes[1].childNodes[1].value = [...q.childNodes[1].childNodes[1].childNodes].findIndex((el)=>{
            return el.label.includes(qAns["answer"])
        })
    })
})
setQAns.set('description', ()=>{})

export default setQAns
