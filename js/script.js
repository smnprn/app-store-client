let responsePar = document.getElementById("http_response_table");
let sendButton = document.getElementById("search_button");

// Filter options
let appNameInput = document.getElementById("search_bar");
let ratingSelect = document.getElementById("rating");
let genreSelect = document.getElementById("genre");
let freeCheckbox = document.getElementById("free");
let paidCheckbox = document.getElementById("paid");

const token = ""

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
    const url = urlBuilder(`http://localhost:8080/api/v0.1/apps?name=${appNameInput.value}`);
    const response = await sendHttpRequest(url, "GET", token);

    setTableData(response)
    responsePar.style.display = "block";
})

function urlBuilder(endpoint) {
    if (ratingSelect.value !== "") {
        endpoint += "&rating=" + ratingSelect.value;
    }

    if (genreSelect.value !== "") {
        endpoint += "&genre" + genreSelect.value;
    }

    if (freeCheckbox.checked) {
        endpoint += "&free=1";
    } else if (paidCheckbox.checked) {
        endpoint += "&free=0";
    }

    return endpoint;
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

// Set response table data
function setTableData(response) {
    document.getElementById("id_d").innerHTML = response[0].app_id;
    document.getElementById("name_d").innerText = response[0].name
    document.getElementById("url_d").innerText = response[0].url;
    document.getElementById("genre_d").innerText = response[0].genre;
    document.getElementById("contrating_d").innerText = response[0].contentRating;
    document.getElementById("size_d").innerText = response[0].size;
    document.getElementById("ios_d").innerText = response[0].ios_version;
    document.getElementById("price_d").innerText = `${response[0].price} ${response[0].currency}`;
    document.getElementById("dev_d").innerText = response[0].developer_id;
    document.getElementById("usrrat_d").innerText = response[0].user_rating;
    document.getElementById("revw_d").innerText = response[0].reviews;
}