$(function() {
  var report1;
    $(".dataForm").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var date1=$('#date').val();
        var newExpense = {
          amount: $("#amount").val().trim(),
          category: $("#category").val().trim(),
          spentAt: $("#spentAt").val().trim(),
          remarks: $("#remarks").val().trim(),
          date1: date1,
          paymentMode:$("#paymentMode").val().trim(),

        };
        
        alert(date1);
    
        // Send the POST request.
        $.ajax("/expense", {
          type: "POST",
          data: newExpense
        }).then(
          function(data) {
            console.log("created new Expense");
            console.log("******"+data);
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });

      $(".reportBtn").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        //console.log("reports");
        var report = {
          firstDate: $("#firstDate").val().trim(),
          secondDate: $("#secondDate").val().trim(),
          id:1
        };
        //request.responseType= "text/html";
        // Send the POST request.
        $.ajax("/reports", {
          type: "POST",
          
          data: report
        }).then(
          function(report) {
          console.log("created new Expense");
          report1=report;
          
          var ctx = document.getElementById("myChart").getContext("2d");
          var chartObject = new Chart(ctx);
          var barChart = chartObject.Bar(report1); 
          //displaying Chart logic pass Report to Chart.js
          
          /*$.ajax("/reports/user", {
            type: "GET",
            data: report
          }).then(
            function() {
            // Reload the page to get the updated list
            //location.reload();
            console.log("created report");
          }
        );*/
        });
      });

      $(document).on("click","expense",function(event) {
        // Make sure to preventDefault on a submit event.
        
        // Send the POST request.
          $.ajax("/expense", {
          type: "GET",
        }).then(
          function() {
            console.log("created new Expense");
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });

      $(document).on("click","reports",function(event) {
                
        // Send the POST request.
          $.ajax("/reports", {
          data: newData,
          type: "GET",
        }).then(
          function(data) {
            console.log("created new Report");
            // Reload the page to get the updated list
            location.reload();
            //res.redi
          }
        );
      });
      
      $(document).on("click","income",function(event) {
        // Make sure to preventDefault on a submit event.
        
        // Send the POST request.
          $.ajax("/income", {
          type: "GET",
        }).then(
          function() {
            console.log("created new Income Entry");
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });
    });
function objecttoarray() {
  
        const toNumericPairs = input => {
        const entries = Object.entries(report1);
        entries.forEach(entry => entry[0] = +entry[0]);
        return entries;
}
}