function main() {
    const button = document.getElementById("button");
    button.onclick = () => question();    
    const input = document.getElementById("question");
    input.addEventListener("keyup", (event) => {
        if (event.code === "Enter") {
            event.preventDefault();
            button.click();
        }
    });
}

function question() {
    const input = document.getElementById("question");
    const answer = document.getElementById("answer");
    const question = input.value;
    if (question.length <= 0) {
        answer.innerHTML = "question can`t be empty";
        return;
    }
    answer.innerHTML = "loading";
    fetch("/question", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    })
    .then((response) => response.json())
    .then((data) => {
        answer.innerHTML = `Answer: ${data}`;
    })
    .catch((error) => {
        answer.innerHTML = `error occured: ${error}`;
    });
}

window.onload = main()