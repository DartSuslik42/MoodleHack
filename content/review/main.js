import {getAnswersFromReviewPage} from "./getAnswersFromReviewPage.js";
import {test_title} from "../getTestTitle.js";
import {saveAnswersLocally} from "../storage_controller.js";

const questions = [...document.querySelectorAll(".que")]
const answers = getAnswersFromReviewPage(questions)

questions.forEach((question, idx)=>{
    const innerText = document.createTextNode(JSON.stringify(answers[idx].answer))
    question.appendChild(innerText)
})

saveAnswersLocally(test_title, answers)
document.querySelector("ul.breadcrumb li.lastli a").click()