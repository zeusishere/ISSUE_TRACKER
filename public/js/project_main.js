
    let labelSelectedList = [], authorSelectedList = [];

    // get all the accordions and add a click event listern to it
    const labelAccordion = document.querySelector("#label-list-accordion");
    const authorAccordion = document.querySelector("#author-list-accordion");
    const filter = document.querySelector("#filter-btn");
    labelAccordion.addEventListener("click", labelFilterListHandler);
    authorAccordion.addEventListener("click", authorFilterListHandler);
    filter.addEventListener("click", filterClickAction)
    function labelFilterListHandler(event) {
        // to prevent the  below code running twice when clicked on label of radio
        if (event.target.className != "form-check-label") {
            labelSelectedList = document.querySelectorAll("#collapse-label-list input[type=checkbox]:checked");
            const arr = Array.from(labelSelectedList);
            console.log("label accordion clicked", labelSelectedList);
        }
    }
    function authorFilterListHandler(event) {
        // to prevent the  below code running twice when clicked on label of radio
        if (event.target.className != "form-check-label") {
            authorSelectedList = document.querySelectorAll("#collapse-author-list input[type=checkbox]:checked");
            console.log("author accordion clicked ", authorSelectedList);
        }
    }
    function filterClickAction(event) {
        event.preventDefault();
        console.log("filter btn clicked")
        const authorObjects = [];
        const labelObjects = [];
        // if(authorSelectedList.length >0)
        for (let item of authorSelectedList) {
            authorObjects.push(item.value);
        }
        for (let item of labelSelectedList) {
            labelObjects.push(item.value);
        }
        console.log("filter btn clicked !!! ", authorObjects, "\n", labelObjects);
        let xhrReq = new XMLHttpRequest();
        xhrReq.open("POST", "/projects/filter-issues");
        // json data does not work without content type header
        xhrReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhrReq.send(JSON.stringify({
            labels: labelObjects,
            authors: authorObjects
        }));
        xhrReq.onload = function () {
            console.log(xhrReq.response)
            updateIssueList(xhrReq.response)
        }
    }

    // search functionality below
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", getSearchResults);
    function getSearchResults(event) {
        // preventDefault also prevents validation check of form fields
        event.preventDefault();
        const form = document.querySelector("#search-form");
        form.reportValidity();

        if (searchInput.value != "") {

            let xhrReq = new XMLHttpRequest();

            xhrReq.open("POST", "/projects/search-query");
            xhrReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhrReq.send(JSON.stringify({ searchKey: searchInput.value }));
            xhrReq.onload = function () {

                updateIssueList(xhrReq.response);

            }

        }

    }
    // updates issue list based on filter/search query
    function updateIssueList(Stringdata) {
        let issueContainer = document.getElementById("issueContainer");
        let data = JSON.parse(Stringdata);
        console.log("issues ",  (data));
        let generatedIssueList = [];
        if (data.length == 0) {
            issueContainer.innerHTML = `<div class="display-5 bg-light my-3">There were no results matching your query</div>`;
            return;
        }
        for (item of data) {
            let generatedLabelList = [];
            for (entry of item.label) {
                let tempLabel = `<div class="badge bg-info rounded-pill fs-6 px-2 ms-1">
                                     ${entry}
                                </div>` ;
                generatedLabelList.push(tempLabel);

            }

            let tempIssue = `<div class="col-12 bg-light my-3 py-3 rounded-3 shadow">
                        <h5>
                             ${item.issueName} 
                        </h5>
                        <p class="lead ps-2">Author :  ${item.issueAuthor} 
                        </p>
                        <div class="issue-description ps-2">

                            <div class="accordion" id="accordion-${item._id}">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapse-${item._id}"
                                            aria-expanded="false" aria-controls="collapseTwo">
                                            <strong>Description:</strong>
                                        </button>
                                    </h2>
                                    <div id="collapse-${item._id}" class="accordion-collapse collapse"
                                        aria-labelledby="headingTwo" data-bs-parent="#accordion-${item._id}">
                                        <div class="accordion-body">
                                             ${item.issueDescription}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="issue-labels mt-2 ps-2">
                            <div class="badge bg-primary rounded-pill fs-6 px-2">
                                Tags :
                            </div>
                            ${generatedLabelList.join(" ")}
                        </div>
                        </div>` ;
            generatedIssueList.push(tempIssue);
        }
        issueContainer.innerHTML = generatedIssueList.join(" ");

    }
