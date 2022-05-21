import {getAnswers} from "./getAnswers.js";

const questions = [...document.querySelectorAll(".que")]
const answers = getAnswers(questions)

questions.forEach((question, idx)=>{
    const innerText = document.createTextNode(JSON.stringify(answers[idx].Qanswer))
    question.appendChild(innerText)
})

//TODO : отправка на background.js
console.log(answers)

