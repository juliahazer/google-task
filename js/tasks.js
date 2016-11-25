//taskList.id 's 
//MTYxMjQ4MzEwMzA0OTIwNzY1Nzk6MTow -- J&P
//MTYxMjQ4MzEwMzA0OTIwNzY1Nzk6MDow -- Julia's
//MTYxMjQ4MzEwMzA0OTIwNzY1Nzk6MjQ0MTczNDE5OjA -- My Tasks

//global variable to hold the tasklists
var taskLists = {};
//html holder for tasklists
var htmlTasklists = "";

//global variable to hold the tasks w/in the currently selected tasklist
var tasks = {};
//an individual task object
var task;
//date for tasks
var date;
//html holder for task info
var htmlTask ="";

/**
 * Print task lists.
 */
function listTaskLists() {
  //will hold logout message
  var logoutDiv = document.getElementById('logout');
  //will hold select tasklist message
  var selectDiv = document.getElementById('selectTasklist');
  //will hold tasklists (html)
  var taskListsDiv = document.getElementById('taskListsId');

  //call to Google API for tasklist data
  var request = gapi.client.tasks.tasklists.list({
    'maxResults': 10
  });

  /*display logout and select messages*/
  logoutDiv.innerHTML = '<a href="https://accounts.google.com/logout" target="_blank">Logout?</a> (<i>Clicking will log you out of your Google account/s.</i>)';
  selectDiv.innerHTML = 'Select which Google tasklist to display:';

  /*request.execute start...*/
  request.execute(function(resp) {
    taskLists = resp.items;
      
    /*if the user has tasklists, create .taskListTitle divs for each taskList (w/ id=tasklist id and data-sc=index #)*/
    if (taskLists && taskLists.length > 0) {
      for (var i = 0; i < taskLists.length; i++) {
        taskList = taskLists[i];
        htmlTasklists += "<div class='taskListTitle listInactive' status='0' position='" + i + "' id='" + taskList.id + "'>" + taskList.title + "</div>";

      }
    /*else, display message for no tasklist...*/
    } else {
        htmlTasklists += "<div class='taskListTitle listInactive'>No task lists found</div>";
    };

    /*display tasklist html w/in taskListsId div*/
    taskListsDiv.innerHTML = htmlTasklists;    
  });//end request.execute
}

/*function to return day of the week name based on a date (year, month, day) provided*/
function getDayName(dateId) {
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var date = new Date(dateId);
  var dayName = days[date.getDay()];
  return dayName;
}

/**
 * Print tasks w/in selected list. Called on click (see index.js)
  NOTE: added the id and position as parameters
 */
function getTasksByListId(id, position) {

  //will hold tasks html
  var tasksDiv = document.getElementById('tasks');
  tasksDiv.innerHTML = "";

  //will hold the div with the buttons (show notes, how tasks, etc)
  var toggleBtnsDiv = document.getElementById('toggleBtns');
  //as default, sets the div with the buttons (show notes, show tasks, etc) to display none
  toggleBtnsDiv.style.display = 'none';

  //call to Google API for task data
  var request = gapi.client.tasks.tasks.list({
      'tasklist': id
  })

  /*clears all values*/
  var notes = '';
  var dateHTML = '';
  htmlTask ="";

  /*request.execute start...*/
  request.execute(function(resp){
    tasks = resp.items;

    /*if no tasks exist in the list (task length is 1 and the task's title is empty), display message for "no tasks exist..."*/
    if ((tasks.length == 1) && (tasks[0].title == "")){
      $('#message').html('There are no tasks in this list.');
    }
    /*else...*/
    else {

      /*resets in case have clicked on other tasklists, to hide notes and no date toggle buttons*/
      $('#toggleNotes').hide();
      $('#toggleNoDate').hide();

      /*cycle through tasks, and assign all tasks with no due date (undefined) a .due = "0" value*/
      for (var i = 0; i < tasks.length; i++){
        if (typeof tasks[i].due == "undefined"){
          tasks[i].due = "0";
        }
      }//end for loop

      /*sorts/re-orders array of tasks from lowest to highest date (so upcoming tasks appear first following by future tasks*/
      tasks.sort(function(a, b) {
        if (a.due > b.due) {
          return 1;
        }
        if (a.due < b.due){
          return -1;
        }
        return 0;
      });//end .sort


      //initialize previousDate to ''
      var previousDate = "";

      /*cycle through tasks...*/
      for (var i = 0; i < tasks.length; i++) {
        
        //sets task to current task
        task = tasks[i];

        //resets notes var to empty
        notes = '';
        //resets dateHTML to empty
        dateHTML = '';


// Usage: Get the day name of a date
//var whichDay = getDayName("2013-07-31");
//console.log(whichDay);


        /*for those tasks with a due date, reformats the due date (mm/dd/year)*/
        if (task.due != "0") {
          var year = task.due.substring(0,4);
          var month = task.due.substring(5,7);
          var day = task.due.substring(8,10);
          date = month + "/" + day + "/" + year;
        }
        /*else, for those w/o a due date, sets date to "no date given" message */
        else {
          year = 0;
          month = 0;
          day = 0;
          date = "No Date Given";

          //if there are notes, then display the button that allows users to show/hide notes
          $('#toggleNoDate').css('display', 'block');
          
          showNoDate();
        }

        /*for each new date, begin wrapping the content that follows (sub-tasks/notes) in a .dateContainer div*/
        if (previousDate != date) {
          //the first item does not need a closing </div> at the beginning
          /*if (i == 0) {
            dateHTML = "<div class='dateContainer'><div class='date'><b>" + date + "</b></div>";
          }*/

          if (i > 0){
            dateHTML += "</div>";
          }


          //all items after the 1st, need to close the previous dateContainer div first
   
          //var dayName = getDayName(year, month, day);
          
          var dateId = year + "-" + month + "-" + day;
          var dayName = "";
          if (date != "No Date Given"){
             dayName = ", " + getDayName(dateId);
          }
          dateHTML += "<div class='dateContainer' id='" + dateId + "'><div class='date'><b>" + date + dayName + "</b></div>";
        }

        /*if the task has notes, add a .notes div containing those notes*/
        if (typeof task.notes !== "undefined") {
          notes = "<div class='notes'>NOTES: " + task.notes + "</div>";
          
          //if there are notes, then display the button that allows users to show/hide notes
          $('#toggleNotes').css('display', 'block');
          
          showNotes();
          /*since default is to display notes, then set text of button option to 'hide notes'
          $('#notesBtn').text('Hide');*/
        }

        /*add onto htmlTask, everything that will be displayed for this task (if no date or notes, these are '')*/
        htmlTask += dateHTML + "<div class='task'><div class='taskTitle'>" + task.title + "</div>" + notes + /*<button onclick='markTaskComplete(task)'>Completed?</button>*/"</div>";

        /*in order to compare dates for the next task in the array (to see if the date is different & need to print a new due date)
        set the previousDate to date*/
        previousDate = date;

      }//end for loop

      //display the div with the buttons (show notes, show tasks, etc)
      toggleBtnsDiv.style.display = 'block';

      
      showAll();

      /*sets default Show Tasks option to "All"
      $('.showTasks').removeClass('btnActive');
      $('#showAll').addClass('btnActive');*/

      //display everything w/in the tasks id div (+ the final/closing date container div)
      tasksDiv.innerHTML += htmlTask + "</div>"; //end dateContainer (final date)

    }//end else
  });//end request.execute
}



/*function markTaskComplete(task) {
    gapi.client.request({
        path: 'https://www.googleapis.com/tasks/v1/lists/' + tasklistId + '/tasks/' + task.id,
        method: 'PUT',
        body: Object.assign(
            {},
            task.originalTask,
            {
                completed: new Date().toISOString(),
                status: 'completed'
            }
        )
    }).execute();
}*/
