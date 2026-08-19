const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClearItems = document.getElementById("btnClearItems");
const btnClear = document.getElementById("btnClear");
const btnSave = document.getElementById("btnSave");

const tblRecords = document.getElementById("tblRecords");

const sortField = document.getElementById("sortField");
const sortOrder = document.getElementById("sortOrder");

const tblTHsLabels = [
    "First Name",
    "Middle Name",
    "Last Name",
    "Age",
    "Action"
];


// =====================================================
// LOAD SAVED RECORDS
// =====================================================

let arrRecords = JSON.parse(localStorage.getItem("records")) || [];


// =====================================================
// DISPLAY RECORDS ON START
// =====================================================

iterateRecords();


// =====================================================
// INSERT / UPDATE
// =====================================================

btnInsertUpdate.addEventListener("click", function () {

    const inputTxt = document.getElementsByTagName("input");


    // Check inputs
    for (const txt of inputTxt) {

        if (txt.value.trim() === "") {

            alert("Please complete all the text inputs!");
            return;

        }

    }


    // =================================================
    // INSERT
    // =================================================

    if (btnInsertUpdate.value === "insert") {

        const newRecord = {

            fname: inputTxt[0].value,
            mname: inputTxt[1].value,
            lname: inputTxt[2].value,
            age: parseInt(inputTxt[3].value)

        };

        arrRecords.push(newRecord);

    }


    // =================================================
    // UPDATE
    // =================================================

    else {

        const index = parseInt(btnInsertUpdate.value);

        arrRecords[index] = {

            fname: inputTxt[0].value,
            mname: inputTxt[1].value,
            lname: inputTxt[2].value,
            age: parseInt(inputTxt[3].value)

        };

    }


    // Clear inputs
    for (const txt of inputTxt) {
        txt.value = "";
    }


    // Reset button
    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";


    // Display
    iterateRecords();

});


// =====================================================
// CLEAR INPUT
// =====================================================

btnClear.addEventListener("click", function () {

    const inputTxt = document.getElementsByTagName("input");

    for (const txt of inputTxt) {
        txt.value = "";
    }

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";

});


// =====================================================
// DELETE ALL RECORDS
// =====================================================

btnClearItems.addEventListener("click", function () {

    /*
        DO NOT SAVE HERE.

        This means the clearing is temporary.

        Example:

        Saved:
        John
        Mark
        Peter

        Click Clear Records.

        Screen:
        No Records...

        Refresh:

        John
        Mark
        Peter
    */

    arrRecords = [];

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";

    iterateRecords();

});


// =====================================================
// DELETE ONE RECORD
// =====================================================

function deleteData(index) {

    /*
        DO NOT save to Local Storage here.

        This makes deleting temporary.

        Example:

        Saved:
        John
        Mark
        Peter

        Delete Mark:

        Screen:
        John
        Peter

        Refresh:

        John
        Mark
        Peter
    */

    arrRecords.splice(index, 1);

    iterateRecords();

}


// =====================================================
// UPDATE
// =====================================================

function updateData(index) {

    const inputTxt = document.getElementsByTagName("input");

    inputTxt[0].value = arrRecords[index].fname;
    inputTxt[1].value = arrRecords[index].mname;
    inputTxt[2].value = arrRecords[index].lname;
    inputTxt[3].value = arrRecords[index].age;

    btnInsertUpdate.innerHTML = "Update";
    btnInsertUpdate.value = index;

}


// =====================================================
// SAVE TO LOCAL STORAGE
// =====================================================

btnSave.addEventListener("click", function () {

    /*
        THIS IS THE ONLY TIME DATA
        IS PERMANENTLY SAVED.
    */

    localStorage.setItem(
        "records",
        JSON.stringify(arrRecords)
    );

    alert("Records successfully saved!");

});


// =====================================================
// SORT
// =====================================================

sortField.addEventListener("change", sortRecords);
sortOrder.addEventListener("change", sortRecords);


function sortRecords() {

    const field = sortField.value;
    const order = sortOrder.value;


    if (field === "" || order === "") {
        return;
    }


    arrRecords.sort(function (a, b) {

        let valueA = a[field];
        let valueB = b[field];


        // AGE
        if (field === "age") {

            valueA = Number(valueA);
            valueB = Number(valueB);

        }

        // NAME
        else {

            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();

        }


        if (valueA < valueB) {

            return order === "asc" ? -1 : 1;

        }


        if (valueA > valueB) {

            return order === "asc" ? 1 : -1;

        }


        return 0;

    });


    iterateRecords();

}


// =====================================================
// DISPLAY TABLE
// =====================================================

function iterateRecords() {

    while (tblRecords.hasChildNodes()) {

        tblRecords.removeChild(tblRecords.firstChild);

    }


    const status = document.getElementById("status");


    // NO RECORDS
    if (arrRecords.length === 0) {

        status.style.display = "inline";
        status.innerHTML = "No Records...";

        return;

    }


    status.style.display = "none";


    // =================================================
    // HEADER
    // =================================================

    const tblHeader = document.createElement("thead");
    const tblHeaderRow = document.createElement("tr");

    tblHeaderRow.style.borderTop = "1px solid black";
    tblHeaderRow.style.borderBottom = "1px solid black";


    for (let i = 0; i < 5; i++) {

        const th = document.createElement("th");

        th.innerHTML = tblTHsLabels[i];

        th.style.padding = "5px";

        if (i !== 4) {

            th.style.borderRight = "1px solid black";

        }

        tblHeaderRow.appendChild(th);

    }


    tblHeader.appendChild(tblHeaderRow);

    tblRecords.appendChild(tblHeader);


    // =================================================
    // BODY
    // =================================================

    const tblBody = document.createElement("tbody");


    arrRecords.forEach(function (rec, i) {

        const row = document.createElement("tr");

        row.style.borderBottom = "1px solid black";


        // First Name
        const fname = document.createElement("td");

        fname.innerHTML = rec.fname;
        fname.style.padding = "10px";
        fname.style.borderRight = "1px solid black";


        // Middle Name
        const mname = document.createElement("td");

        mname.innerHTML = rec.mname;
        mname.style.padding = "10px";
        mname.style.borderRight = "1px solid black";


        // Last Name
        const lname = document.createElement("td");

        lname.innerHTML = rec.lname;
        lname.style.padding = "10px";
        lname.style.borderRight = "1px solid black";


        // Age
        const age = document.createElement("td");

        age.innerHTML = rec.age;
        age.style.padding = "10px";
        age.style.borderRight = "1px solid black";


        // Actions
        const action = document.createElement("td");

        action.style.padding = "10px";


        // DELETE
        const deleteButton = document.createElement("button");

        deleteButton.innerHTML = "Delete";

        deleteButton.style.marginRight = "5px";

        deleteButton.onclick = function () {

            deleteData(i);

        };


        // EDIT
        const editButton = document.createElement("button");

        editButton.innerHTML = "Edit";

        editButton.style.marginRight = "5px";

        editButton.onclick = function () {

            updateData(i);

        };


        action.appendChild(deleteButton);
        action.appendChild(editButton);


        row.appendChild(fname);
        row.appendChild(mname);
        row.appendChild(lname);
        row.appendChild(age);
        row.appendChild(action);


        tblBody.appendChild(row);

    });


    tblRecords.appendChild(tblBody);

}