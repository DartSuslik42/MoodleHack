import {test_title} from "../getTestTitle.js";
import {createLogger} from "./logger.js";
import {hasAnswersLocally} from "../storage_controller.js";

const div = document.querySelector("div.quizattempt form div")
div.style.display = "flex"
div.style.flexDirection = "column"

const logger = createLogger();
div.appendChild(logger)

const start_new_attempt_btn = document.querySelector("div.quizstartbuttondiv input")
start_new_attempt_btn.style.display="none"
start_new_attempt_btn.value = "Пройти тест АВТОМАТИЧЕСКИ"
start_new_attempt_btn.addEventListener("click",()=>{
    chrome.storage.local.set({"started_test_title" : test_title})
})

findAccessToAnswers();

async function findAccessToAnswers() {
    let active_log_stage
    // Поиск в ответов в Локальном Хранилище
    active_log_stage = logger.make_log("Ищу ответы в локальном хранилище")
    if (await hasAnswersLocally(test_title)) {
        active_log_stage.change_log("Нашёл ответы в локальном хранилище")
        start_new_attempt_btn.style.display="block"
        return
    }
    active_log_stage.change_log("Не нашёл ответы в локальном хранилище")

    // Поиск заверщённых попыток с результатом 0 баллов
    active_log_stage = logger.make_log("Ищу заверщённые попытки с результатом в 0 баллов")
    const bad_attempt = findBadAttempt()
    if (bad_attempt) {
        active_log_stage.change_log("Нашёл заверщённую попытку с результатом в 0 баллов")
        const ans = await logger.ask_question_TF("Желаете использовать эту попытоку для получения ответов?")
        if (ans) {
            bad_attempt.open() // Go to another page
            return;
        }
    }else {
        active_log_stage.change_log("Нет доступа к заверщённым попыткам с результатом в 0 баллов")
    }

    // Поиск возможности старта прохождения теста с результатом в 0 баллов
    // Определение типа теста
    active_log_stage = logger.make_log("Определяю тип оценивания теста")
    const test_type = getTestType()
    active_log_stage.change_log(`Тип оценивания теста : ${test_type}`)
    // Проверка соответствия типа теста
    if (isMultiAttempt(test_type)){
        const ans = await logger.ask_question_TF("Пройти тест на 0 баллов для получения ответов?")
        if(ans) {
            makeNewBadAttempt()
            return;
        }
    }
    logger.make_log("Не удалось начать плохую попытку с заведомым результатом в 0 баллов")

    logger.make_log("Возможностей получить ответы нет")
}

function findBadAttempt(){
    return [...document.querySelectorAll("table.quizattemptsummary tbody tr")]
        .map(table_row=>({
            score : Number(table_row.querySelector("td.c2").innerText.replace(",",'.')),
            open : function (){
                table_row.querySelector("td.c4 a").click()
            }
        }))
        .find(attempt=>attempt.score === 0)
}

function getTestType(){
    return document.querySelector("div.quizinfo").innerText.slice("Метод оценивания: ".length)
}
function isMultiAttempt(test_type){
    return test_type === "Высшая оценка"
}
function makeNewBadAttempt(){
    start_new_attempt_btn.click()
}