import {setAnswersOnAttemptPage} from "./setAnswersOnAttemptPage"
import {test_title} from "../getTestTitle.js";
import {getAnswersLocally} from "../storage_controller";

const questions = [...document.querySelectorAll(".que")]
const answers = getAnswersLocally(test_title)

const answersInjectedCorrectly = setAnswersOnAttemptPage(questions, answers)
if(answersInjectedCorrectly){
    const nextPage_input = [...document.querySelectorAll("div.submitbtns input")].pop()
    nextPage_input.click() // переход на следующую страницу
}

