$(function() {
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
          function() {
            console.log("created new Expense");
            // Reload the page to get the updated list
            location.reload();
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
        // Make sure to preventDefault on a submit event.
        
        // Send the POST request.
          $.ajax("/reports", {
          type: "GET",
        }).then(
          function() {
            console.log("created new Report");
            // Reload the page to get the updated list
            location.reload();
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
    