let appNameInput = document.getElementById("search_bar");
let responsePar = document.getElementById("http_response");
let sendButton = document.getElementById("search_button");

const token = "";

sendButton.addEventListener("click", async function (e) {
    e.preventDefault();
    const url = `http://localhost:8080/api/v0.1/apps?name=${appNameInput.value}`;
    const response = await sendHttpRequest(url, "GET", token);

    responsePar.innerText = JSON.stringify(response, null, "\t");
    responsePar.style.display = "block";
})

async function sendHttpRequest(url, method, token) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}
