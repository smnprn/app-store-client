let responsePar = document.getElementById("http_response_table");
let sendButton = document.getElementById("search_button");
let tableBody = document.getElementById("table_body");

// Filter options
let appNameInput = document.getElementById("search_bar");
let ratingSelect = document.getElementById("rating");
let genreSelect = document.getElementById("genre");
let freeCheckbox = document.getElementById("free");
let paidCheckbox = document.getElementById("paid");

const API_ENDPOINT = "http://localhost:8080/api/v0.1/apps?";
const token = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiZGFyaW9tb2NjaWFAZW1haWwuY29tIiwiZXhwIjoxNzEzOTEyMTM2LCJzY29wZSI6IlVTRVIifQ.QYybs_i-1VCQ9nq6CY-cUFsSgSgGw2I5yi20T6w6Jdlhq9I-F_OGpyAxcsFx9F3owb9_Nu9VPLSx9CCQB4GEvgTqNlV0HHK83YLwACgmr_xf8iwbYxT7c1skYsMNfWuaJuJeDmtOB1Hc_RViJJZ9VZ57TP6mY7dGgummulwDdmb93glb6sIl13igdlmanc8Z42Umho4i6loEW6Hu7WALLd1sMo9cw_gsbgdCX_7m5GAaYPeIm8AGFr3fzhJJ0zgn40F3DdBEhzRNo43n2kEbjiHvPWjwVUMOhbx6wwRLpL18xsfAZYqQSbu1RhUqGov-w1QGKAF51x0wWsOPxYTTQg"

// Set checkbox behavior
freeCheckbox.addEventListener("change", function () {
    if (paidCheckbox.checked) {
        paidCheckbox.checked = false;
    }
})

paidCheckbox.addEventListener("change", function () {
    if (freeCheckbox.checked) {
        freeCheckbox.checked = false;
    }
})

// Handle the API calls
sendButton.addEventListener("click", async function (e) {
    e.preventDefault();
    const url = urlBuilder(API_ENDPOINT);
    const response = await sendHttpRequest(url, "GET", token);

    //setTableData(response)
    createTable(response)
    responsePar.style.display = "block";
})

function urlBuilder(endpoint) {
    const params = new URLSearchParams();

    if (appNameInput.value !== "") {
        params.append("name", appNameInput.value);
    }

    if (ratingSelect.value !== "") {
        params.append("rating", ratingSelect.value);
    }

    if (genreSelect.value !== "") {
        params.append("genre", genreSelect.value);
    }

    if (freeCheckbox.checked) {
        params.append("free", "1");
    } else if (paidCheckbox.checked) {
        params.append("free", "0");
    }

    return endpoint + params.toString();
}

async function sendHttpRequest(url, method, token) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (response.status === 404) {
        return "App not found";
    }

    if (!response.ok) {
        throw new Error(`Error in the server response: ${response.statusText}`);
    }

    return response.json();
}

// Create response data table
function createTable(response) {
    tableBody.innerHTML = "";
    let maxTableRows = response.length > 100 ? 100 : response.length;

    for (let i = 0; i < maxTableRows; i++) {
        let responseAttributes = [
            response[i].app_id,
            response[i].name,
            response[i].url,
            response[i].genre,
            response[i].contentRating,
            response[i].size,
            response[i].ios_version,
            `${response[i].price} ${response[0].currency}`,
            response[i].developer_id,
            response[i].user_rating,
            response[i].reviews
        ]

        let row = document.createElement("tr");

        for (let j = 0; j < responseAttributes.length; j++) {
            let cell = document.createElement("td");
            cell.textContent = responseAttributes[j];
            row.appendChild(cell)
        }

        tableBody.appendChild(row);
    }
}