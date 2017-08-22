(function(){
	var kill = $('.deleteBtn');
	$('kill').on('click', function(){
		if(confirm("Are you sure you want to delete?") == true){
			alert("Kill Confirmed!!");
		}else{
			alert("Kill Denied!!");
		}
	});
});