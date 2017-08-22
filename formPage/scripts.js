$(function(){
	var subBtn = $('.submitBtn');
	var change = $('.change');
	var url = "http://localhost:8080/people";

	$(subBtn).on('click',function(){
		var firstname = $('.firstname').val()
		var lastname = $('.lastname').val()
		
		if(firstname != '' && lastname != ''){
			$.ajax({
				url:url,
				type:"POST",
				dataType: "json",
				data:{firstname,lastname},
				error: function(){ alert('Update failed!'); },
			    success: function(res) {console.log("You, Did it! Whoopa")}
			})
		}
	});

	$("#form, .form-inline").submit(function(e) {
    e.preventDefault();
});	
});