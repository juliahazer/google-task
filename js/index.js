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


/*reusable function that takes an element to either show or hide, and then adds/remove a class to make the button active css*/
function activate(viewElement, show, removeClassElement, addClassElement){
	if(show){
		viewElement.show();
	}
	else {
		viewElement.hide();
	}

	removeClassElement.removeClass('btnActive');
	addClassElement.addClass('btnActive');

}

function showNotes() {
	activate($('.notes'), true, $('#hideNotes'), $('#showNotes'));
}

function hideNotes() {
	activate($('.notes'), false, $('#showNotes'), $('#hideNotes'));
}

function showNoDate() {
	activate($('#0-0-0'), true, $('#hideNoDate'), $('#showNoDate'));
}

function hideNoDate() {
	activate($('#0-0-0'), false, $('#showNoDate'), $('#hideNoDate'));
}


var currentDate = new Date();
/*console.log(currentDate);
currentDate = new Date("2016-12-13");
console.log(currentDate);*/

var currentMonth = currentDate.getMonth() + 1;
var currentDay = currentDate.getDate();
var currentYear = currentDate.getFullYear();
var stringCurrentDate = currentYear + "-" + currentMonth + "-" + currentDay;



function showWeek() {
	showAll();
	hideNoDate();

	//sets a date for 1 week from currentDate (now)
	var dateInOneWeek = new Date();
	dateInOneWeek.setDate(currentDate.getDate() + 6);
	//dateInOneWeek = new Date("2016-12-5");
	//currentDate = new Date("2016-11-29");

	/*loops through each dateContainer item. if its id is not between the current date and the
	date in 1 week, then the element is hidden*/
	$('.dateContainer').each(function(){
		var dateElement = new Date(this.id.split("-"));
		if (dateElement >= dateInOneWeek || dateElement < currentDate) {
			$(this).hide();
		}
	});

	$('#message').html('');
	/*if no tasks for this week, display message*/
	if($('.dateContainer:visible').length == 0) {
		$('#message').html('No tasks due this week.');
	}

	$('.showTasks').removeClass('btnActive');
	$('#showWeek').addClass('btnActive');
}

function showMonth(compareMonth, compareYear) {
	$('.dateContainer').not("[id*='" + compareYear + "-" + compareMonth + "']").hide();
	//$(".dateContainer[id^='" + currentYear + "-" + currentMonth + "']").hide();

	$('#message').html('');
	if($('.dateContainer:visible').length == 0) {
		$('#message').html('No tasks due.');
	}

	$('.showTasks').removeClass('btnActive');

	hideNoDate();
}

function showCurrentMonth() {
	showAll();
	//sets to current month

	var compareMonth = currentDate.getMonth() + 1;
	var compareYear = currentDate.getFullYear();

	showMonth(compareMonth, compareYear);

	$('#showCurrentMonth').addClass('btnActive');
}

function showNextMonth() {
	showAll();
	//sets to next month
	if ((currentDate.getMonth() + 1) == 12){
		var compareYear = currentDate.getFullYear() + 1;
		var compareMonth = "01";
	}
	else {
		var compareYear = currentDate.getFullYear();
		var compareMonth = currentDate.getMonth() + 2;
	}

	showMonth(compareMonth, compareYear);

	$('#showNextMonth').addClass('btnActive');
}


function showAll() {
	$('.dateContainer').show();

	$('#message').html('');

	$('.showTasks').removeClass('btnActive');
	$('#showAll').addClass('btnActive');

	showNoDate();
}








