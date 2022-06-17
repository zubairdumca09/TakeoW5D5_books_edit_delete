function createBookData() {
    let id = isIdAvailable();
    let url = "http://localhost:3000/books";
    let method = 'POST'
    if (id) {
        url = `http://localhost:3000/books/${id}`;
        method = 'PUT'
    }
    let title = document.getElementById('title').value;
    let writer = document.getElementById('writer').value;
    let publisher = document.getElementById('publisher').value;
    let isbn = document.getElementById('isbn').value;
    let subject = document.getElementById('subject').value;
    let numPages = document.getElementById('numPages').value;
    let allAvailabilityValues = document.getElementsByName('availability');
    //in case of checkbox we have to take array
    //let availability = [];
    let availability;
    allAvailabilityValues.forEach((node) => {
        if (node.checked) {
            //in case of checkbox we have to push the value
            //availability.push(node.value)
            availability = node.value;
        }
    })
    let obj = {
        title: title,
        writer: writer,
        publisher: publisher,
        isbn: isbn,
        subject: subject,
        availability: availability,
        numPages: numPages
    }
    fetch(url, {
        method: method,
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if (res.status == 201) {
            alert("Book is saved successfully");
        }
        res.json()
    })
}


function getBooksData() {
    fetch("http://localhost:3000/books")
        .then((res) => res.json())
        .then((data) => {
            let tBody = document.getElementById('tBody')
            let templates = ''
            for (let i = 0; i < data.length; i++) {
                templates = templates + getRowTemplate(data[i])
            }
            tBody.innerHTML = templates;
        })
}

function deleteRow(id) {
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE'
    })
}

function deleteRow(id) {
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE'
    })
}
function editRedirection(id) {
    location.href = `/book.html?id=${id}`
}

function getRowTemplate(obj) {
    let template = `
    <tr>
        <td>${obj.id}</td>
        <td>${obj.title}</td>
        <td>${obj.writer}</td>
        <td>${obj.publisher}</td>
        <td>${obj.isbn}</td>
        <td>${obj.subject}</td>
        <td>${obj.availability}</td>
        <td>${obj.numPages}</td>
        <td><button class="btn btn-secondary" onclick="editRedirection(${obj.id})">Edit</button></td>
        <td><button class="btn btn-secondary" onclick="deleteRow(${obj.id})">Delete</button></td>
    </tr> 
    `
    return template;
}

function goToUrl(relativeUrl) {
    location.href = relativeUrl;
}

function isIdAvailable() {
    let url = location.href;
    let arrUrl = url.split('?');
    if (arrUrl[1]) {
        let id = arrUrl[1].split('=')[1]
        return id;
    }
    return;
}

function populateData() {
    let id = isIdAvailable();
    if (!id) {
        return
    }
    let url = `http://localhost:3000/books/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById('title').value = data.title
            document.getElementById('writer').value = data.writer
            document.getElementById('publisher').value = data.publisher
            document.getElementById('isbn').value = data.isbn
            document.getElementById('subject').value = data.subject
            document.getElementById('numPages').value = data.numPages
            let allAvailabilityValues = document.getElementsByName('availability');
            allAvailabilityValues.forEach((node) => {
                if (data.availability === node.value) {
                    node.checked = true;
                }
            })
        })
}