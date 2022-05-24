import setQAns from "./Map_qClass_to_Func";

export function setAnswersOnAttemptPage(questions, answers){
    let noProblem = true

    questions.forEach((question, idx)=>{
        const type = question.classList[1]
        if(setQAns.has(type)){
            setQAns.get(type)(question, answers[idx].answer)
        }else{
            console.warn(`Не найдена функция заполнения формы вопроса типа ${type}`)
            noProblem = false
        }
    })

    return noProblem
}