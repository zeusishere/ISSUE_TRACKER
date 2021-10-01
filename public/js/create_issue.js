
        let labelBtn = document.querySelector("#label-submit");
        let label = document.querySelector("#label");
        let selectedLabelDiv = document.querySelector("#selected-labels");
        let labelList = document.querySelector("#label-list");
        labelBtn.addEventListener("click", function (event) {
            event.preventDefault();
            console.log(label.value, selectedLabelDiv);
            labelList.value += label.value + " ";
            selectedLabelDiv.innerHTML += `<div class="badge bg-info rounded-pill fs-6 px-2 ms-1 my-1">${label.value} </div>`;
            console.log(labelList.value);
            label.value = "";

        })
        function removeLabel (event)
        {
            console.log(event) ;
        }