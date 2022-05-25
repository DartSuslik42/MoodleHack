import {setAnswersOnAttemptPage} from "./setAnswersOnAttemptPage.js"
import {getAnswersLocally} from "../storage_controller.js";

const questions = [...document.querySelectorAll(".que")]
const test_title = await chrome.storage.local.get("started_test_title").then((el)=>el["started_test_title"])
const answers = await getAnswersLocally(test_title)

if(answers){
    const answersInjectedCorrectly = setAnswersOnAttemptPage(questions, answers)
    if(!answersInjectedCorrectly) {
        console.error("Не на все вопросы были даны ответы")
    }
}
const nextPage_input = [...document.querySelectorAll("div.submitbtns input")].pop()
nextPage_input.click() // переход на следующую страницу