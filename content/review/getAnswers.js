import getQAns from "./Map_qClass_to_Func.js";

function getAnswers(questions){
    return questions.map((question, idx)=>{
        const type = question.classList[1]
        const answer = getQAns.has(type) ? getQAns.get(type)(question) : null
        return {
            Qindex : idx,
            Qanswer : answer,
            Qtype : type,
        }
    })
}

export {getAnswers}
