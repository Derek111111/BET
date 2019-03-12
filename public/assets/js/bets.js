$(function() {
  
  //Function to generate chart from JSON object
  function chartReport(report1){
    var labels = report1.data.map(function(e) {
      return e.category;
   });
   var data = report1.data.map(function(e) {
      return e.sumAmount;
   });;
   
   //var ctx = canvas.getContext('2d');
   /*var config = {
      type: 'bar',
      
      data: {
         labels: labels,
         datasets: [{
            label: 'Graph Line',
            data: data,
            backgroundColor: ['rgba(0, 250, 0, 0.3)','rgba(250, 0, 0, 0.3)'],
            borderColor            : "rgba(255,0,0,1)",
            
         }]
      }
   };*/
   
   var data = {
    labels: labels,
    datasets: [{
      label: 'Graph Line',
      backgroundColor: ['rgba(0, 255, 0, 0.3)','rgba(255, 0, 0, 0.3)','rgba(120, 60, 0, 0.3)','rgba(80, 40, 90, 0.3)','rgba(0, 51, 102, 0.3)','rgba(153, 76, 0, 0.3)','rgba(255, 255, 204, 0.3)','rgba(0, 0, 255, 0.3)'],
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: data,
    }]
  };
   var options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        stacked: true,
        gridLines: {
          display: true,
          color: "rgba(255,99,132,0.2)"
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  };
  
  Chart.Bar('chart', {
    options: options,
    data: data
  });
  
   //var chart = new Chart(ctx, config);
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
            firstDate: moment($("#firstDate").val().trim()).format('MM/DD/YYYY'),
            secondDate: moment($("#secondDate").val().trim()).format('MM/DD/YYYY'),
        };
        
        // Send the POST request.
        $.ajax("/reports", {
          type: "POST",
          
          data: report
        }).then(
          function(report) {
          console.log("Report:  " + report.data);
          if(report.data===undefined || report.data===null || report.data.length < 1)   
          {
            $(".NoRecord").empty();
            $(".NoRecord").html("<h5>No Records found</h5>");
          }     
          else{
              $("#userReport").empty();
              $(".NoRecord").empty();
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
              /*google.charts.load('current', {'packages':['table']});
              google.charts.setOnLoadCallback(drawTable);

              function drawTable() {
              var data = new google.visualization.DataTable();
              data.addColumn('string', 'Category');
              data.addColumn('number', 'Amount');
              data.addColumn('boolean', 'Full Time Employee');
              for(var i=0;i<report.data.length;i++)
              {
              data.addRows([
                [report.data[i].category,  report.data[i].sumAmount, true],
                
              ]);
            }
              var table = new google.visualization.Table(document.getElementById('table_div'));

              table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
              }*/
              
              chartReport(report);
            }             
        });
      });

      $(document).on("click","dashboard",function(event) {
        
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
           
          }
        );
      });

      $(document).on("click","expense",function(event) {
        
        
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
