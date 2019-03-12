$(function() {
  
  //Function to generate chart from JSON object
  function chartReport(report1){
    var labels = report1.data.map(function(e) {
      return e.category;
   });
   var data = report1.data.map(function(e) {
      return e.sumAmount;
   });;
   
   var ctx = canvas.getContext('2d');
   var config = {
      type: 'bar',
      data: {
         labels: labels,
         datasets: [{
            label: 'Graph Line',
            data: data,
            backgroundColor: ['rgba(0, 250, 0, 0.3)','rgba(250, 0, 0, 0.3)'],
            //fillColor             : "rgba(230,18,20,0.2)",
            //strokeColor           : "rgba(151,187,205,1)",
            borderColor            : "rgba(255,0,0,1)",
            //pointStrokeColor      : "#fff",
            //pointHighlightFill    : "#fff",
            //pointHighlightStroke  : "rgba(151,187,205,1)",
         }]
      }
   };
   
   var chart = new Chart(ctx, config);
  }

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
          var report = {
            firstDate: moment($("#firstDate").val().trim()).format('YYYY-MM-DD'),
            secondDate: moment($("#secondDate").val().trim()).format('YYYY-MM-DD'),
        };
        
        // Send the POST request.
        $.ajax("/reports", {
          type: "POST",
          
          data: report
        }).then(
          function(report) {
          console.log("created new Expense");
                    
          $("#userReport").empty();
          $(".head").append("<tr> <th>#</th> <th>Category</th><th>Amount</th> </tr>");
          for(var i=0;i<report.data.length;i++)
          {
            var index=i;
            var newRow = $("<tr>").append(
              $("<td>").text(++index),
              $("<td>").text(report.data[i].category),
              $("<td>").text(report.data[i].sumAmount),
            );
            $("#userReport").append(newRow);
          }
          
          chartReport(report);
                         
         /* $.ajax("/reports/user", {
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

      $(document).on("click","dashboard",function(event) {
        // Make sure to preventDefault on a submit event.
        
        // Send the POST request.
          $.ajax("/userDashboard", {
          type: "GET",
        }).then(
          function(report) {
            console.log("Dashboard");
            var report1={
              hbdashboard:true,
              report:report
            };
            chartReport(report1);
            // Reload the page to get the updated list
            //location.reload();
          }
        );
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
            
          }
        );
      });
      
      });
