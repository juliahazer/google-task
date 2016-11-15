$(document).on('click', '.taskListTitle', function(){
	if ($(this).attr('status') == 0){
		var position = $(this).attr('position'); 
		getTasksByListId($(this).attr('id'), position);
		$(this).attr('status', 1);
	}
	else {
		$(this).attr('status', 0);
		$('#tasks').html('');
	}	
});

