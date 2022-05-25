import setQAns from "./Map_qClass_to_Func.js";

export function setAnswersOnAttemptPage(questions, answers){
    let noProblem = true
    questions.forEach((question)=>{
        const type = question.classList[1]
        if(setQAns.has(type)){
            const idx = Number(question.id.slice(1)) - 1
            setQAns.get(type)(question, answers[idx].answer)
        }else{
            console.error(`Не найдена функция заполнения формы вопроса типа ${type}`)
            noProblem = false
        }
    })
    return noProblem
}