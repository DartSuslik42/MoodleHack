import getQAns from "./Map_qClass_to_Func.js";

export function getAnswersFromReviewPage(questions){
    return questions.map((question, idx)=>{
        const type = question.classList[1]
        const answer = getQAns.has(type) ? getQAns.get(type)(question) : null
        return {
            index : idx,
            answer : answer,
            type : type,
        }
    })
}
