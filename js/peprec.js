

function loadModels() {
    var model_names = new Array("Top10", "Top10_in_Cat", "KNN_UB",
                           "KNN_IB","CoClustering","MF"); // Possible Values

   
    var sel = document.getElementById('models') // find the drop down
    for (var i in model_names) { // loop through all elements
        var opt = document.createElement("option"); // Create the new element
        opt.value = model_names[i]; // set the value
        opt.text = model_names[i]; // set the text

        sel.appendChild(opt); // add it to the select
    }
}

function loadRecommendationTable(){ 
    var selected_model_name = document.getElementById("models").value;

}

function readCSVFile(){
    var files = document.querySelector('#file').files;

    if(files.length > 0 ){

         // Selected file
         var file = files[0];

         // FileReader Object
         var reader = new FileReader();

         // Read file as string 
         reader.readAsText(file);

         // Load event
         reader.onload = function(event) {

              // Read file data
              var csvdata = event.target.result;

              // Split by line break to gets rows Array
              var rowData = csvdata.split('\n');

              // <table > <tbody>
              var tbodyEl = document.getElementById('datatablesSimple').getElementsByTagName('tbody')[0];
              tbodyEl.innerHTML = "";

              // Loop on the row Array (change row=0 if you also want to read 1st row)
              for (var row = 1; row < rowData.length; row++) {

                    // Insert a row at the end of table
                    var newRow = tbodyEl.insertRow();

                    // Split by comma (,) to get column Array
                    rowColData = rowData[row].split(';');

                    // Loop on the row column Array
                    for (var col = 0; col < rowColData.length; col++) {

                         // Insert a cell at the end of the row
                         var newCell = newRow.insertCell();
                         value = rowColData[col];
                         if(value.includes("http")) // an image link
                         {
                            value = value.replaceAll('[', '');
                            value = value.replaceAll(']', '');
                            value = value.replaceAll('\'', '');
                            values = value.split(',');
                            value = ""
                            for (let i = 0; i < values.length; i++) {
                                url = values[i]
                                
                                value = value + "<a href=\""+url+"\"><img src=\""+url+"\" width=\"100\" height=\"100\" ></a>"
                            }
                            
                        }
                        newCell.innerHTML = value
                    }

              }
         };

    }else{
         alert("Please select a file.");
    }
}