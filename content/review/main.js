const mark = document.querySelector("table.quizreviewsummary tbody").lastChild.lastChild.textContent.trim()[0]
if(mark === "0") {

    const getAnswersFromReviewPage = await import("./getAnswersFromReviewPage.js")
    const getTestTitle = await import("../getTestTitle.js")
    const storage_controller = await import("../storage_controller.js")

    const questions = [...document.querySelectorAll(".que")]
    const answers = getAnswersFromReviewPage.getAnswersFromReviewPage(questions)

    questions.forEach((question, idx) => {
        const innerText = document.createTextNode(JSON.stringify(answers[idx].answer))
        question.appendChild(innerText)
    })

    await storage_controller.saveAnswersLocally(getTestTitle.test_title, answers)

    document.querySelector("ul.breadcrumb li.lastli a").click()
}