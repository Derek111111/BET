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
        $.ajax("/api/expense", {
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
    
    });
    