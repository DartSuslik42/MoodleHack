const setQAns = new Map()
setQAns.set('multichoice', (div, ans)=>{
    const form = div.querySelector('div.answer')
    if(form){
        const variants = [...form.children].map(v=>{
            return {
                select : function (){
                    if(this.isSelected) return
                    this.isSelected = true
                    v.querySelector('input').click()
                },
                isSelected : false,
                innerText : v.innerText,
            }
        })
        ans.forEach(answer=>
            variants.find(variant=>
                variant.innerText.includes(answer)
            ).select()
        )
        return
    }
    console.error(`Непредвиденное поведение: ${div.id},${div.classList[1]}`)
})
setQAns.set('ddwtos', (div, ans)=>{
    try{
        const p = [...div.querySelector('div.drags').children]
        const drags = p.reduce((newArr,el,idx,arr)=>{
            if(idx === arr.findIndex($=>$.innerText === el.innerText)){
                newArr.push(el)
            }
            return newArr
        },[])

        const inputs = [...div.querySelectorAll('input.placeinput')]
        inputs.forEach((i, idx) => i.value = 1 + drags.findIndex(el=>{
            return el.innerText.replace(/\s+/g, '') === ans[idx].replace(/\s+/g, '')
        }))
    }catch (e){
        console.error(e)
    }
})
setQAns.set('ddmatch', (div, ans)=>{
    const qArr = [...div.querySelector(".ablock tbody").children]
    // const qAnsArr = [...div.querySelector(".ablock ul.matchorigin").children]
    qArr.forEach(q=>{
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
        // Нужно вписать слова в пустые поля
        const input = el.querySelector("input.form-control")
        if(input){
            input.value = ansArr[idx]
            return
        }
        // Нужно выбрать 1 вариант из выпадающего меню
        const select = el.querySelector("select")
        if(select) {
            select.value = [...select.children].find(el => el.innerText === ansArr[idx]).value
            return;
        }
        console.error(`Непредвиденное поведение: ${div.id},${div.classList[1]}`)
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
