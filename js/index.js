/*Function for clicking on tasklist name:
	if the status is 0 (which is it by default -- or not displayed)
	then, display the tasklist by calling getTasksByListId function along 
	with the specific id and position attributes of the tasklist selected

	else if the status is 0 (it is currently displayed)
	then hide the tasklist
*/

$(document).on('click', '.taskListTitle', function(){
	if ($(this).attr('status') == 0){
		var position = $(this).attr('position'); 
		getTasksByListId($(this).attr('id'), position);
		
		//sets all other tasklist titles to inactive and sets css styling
		$('.taskListTitle').attr('status', 0);
		$('.taskListTitle').removeClass('listActive');
		$('.taskListTitle').addClass('listInactive');

		//sets this tasklist title to active and sets css styling
		$(this).attr('status', 1);
		$(this).removeClass('listInactive');
		$(this).addClass('listActive');

		$('#taskListTitle').html("Tasklist: " + $(this).html());
	}
	else {
		$('.taskListTitle').attr('status', 0);
		$('#taskListTitle').html('');
		$('#tasks').html('');
		$('#toggleBtns').css('display', 'none');
		$(this).removeClass('listActive');
		$(this).addClass('listInactive');
	}	
});

/*function toggleNotesBtn() {
	if($('#notesBtn').text() == 'Hide'){
		$('.notes').hide();
		$('#notesBtn').text('Show');

	}
	else {
		$('.notes').show();
		$('#notesBtn').text('Hide');
	}
}*/

function showNotes() {
	$('.notes').show();

	$('#hideNotes').removeClass('btnActive');
	$('#showNotes').addClass('btnActive');
}

function hideNotes() {
	$('#showNotes').removeClass('btnActive');
	$('#hideNotes').addClass('btnActive');

	$('.notes').hide();
}

function showNoDate() {
	$('#hideNoDate').removeClass('btnActive');
	$('#showNoDate').addClass('btnActive');

	$('#0-0-0').show();
}

function hideNoDate() {
	$('#showNoDate').removeClass('btnActive');
	$('#hideNoDate').addClass('btnActive');

	$('#0-0-0').hide();
}


var currentDate = new Date();
var currentMonth = currentDate.getMonth() + 1;
var currentDay = currentDate.getDate();
var currentYear = currentDate.getFullYear();
var stringCurrentDate = currentYear + "-" + currentMonth + "-" + currentDay;

function showWeek() {
	$('.dateContainer').not("[id*='" + currentYear + "-" + currentMonth + "']").hide();

	$('#message').html('');
	/*if no tasks for this week, display message*/
	if($('.dateContainer:visible').length == 0) {
		$('#message').html('No tasks due this week.');
	}

	$('.showTasks').removeClass('btnActive');
	$('#showWeek').addClass('btnActive');

	hideNoDate();
}

function showMonth() {
	$('.dateContainer').not("[id*='" + currentYear + "-" + currentMonth + "']").hide();
	//$(".dateContainer[id^='" + currentYear + "-" + currentMonth + "']").hide();

	$('#message').html('');
	if($('.dateContainer:visible').length == 0) {
		$('#message').html('No tasks due this month.');
	}

	$('.showTasks').removeClass('btnActive');
	$('#showMonth').addClass('btnActive');

	hideNoDate();
}

function showAll() {
	$('.dateContainer').show();

	$('#message').html('');

	$('.showTasks').removeClass('btnActive');
	$('#showAll').addClass('btnActive');

	showNoDate();
}








