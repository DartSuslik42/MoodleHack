let ans = undefined
export function createLogger(){
    const logger = document.createElement("table")
    logger.id = "MoodleHackLogger"
    logger.display = "flex"
    logger.flexDirection = "column"
    logger.make_log = function (string){
        const new_log = document.createElement("tr")
        new_log.innerText = string
        new_log.change_log = function (string){
            this.innerText = string
        }
        logger.appendChild(new_log)
        return new_log
    }
    logger.ask_question_TF = async function (string){
        const new_log = logger.make_log(string)
        const input = document.createElement("span")

        const input_t = document.createElement("input")
        input_t.type = "button"
        input_t.value = "Да"
        input_t.onclick = ()=>{
            ans = true
        }

        const input_f = document.createElement("input")
        input_f.type = "button"
        input_f.value = "Нет"
        input_f.onclick = ()=>{
            ans = false
        }

        input.append(input_t, input_f)
        new_log.appendChild(input)

        return new Promise((resolve) => {
            input.addEventListener('click',function() {
                if(ans !== undefined){
                    new_log.remove()
                    resolve(ans);
                }
            }, {once: true});
        });
    }
    return logger
}