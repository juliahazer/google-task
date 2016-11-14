$(document).on('click', '.taskListTitle', function(){
	var position = $(this).data('sc');
	getTasksByListId(this.id, position);
});

