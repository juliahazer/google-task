
// Client ID from project in the Google Developer Console, https://console.developers.google.com
var CLIENT_ID = '829306275243-ob3hu49o4cm1cig7cob65t7sdtgkcedc.apps.googleusercontent.com';
//WAVES: '877956163530-r6ga90q6n67i0omc3m8om8gm5h368ffo.apps.googleusercontent.com';
//LOCAL: '829306275243-ob3hu49o4cm1cig7cob65t7sdtgkcedc.apps.googleusercontent.com';

//CHANGE FOR READ/WRITE ACCESS
var SCOPES = ['https://www.googleapis.com/auth/tasks.readonly'];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      //'response_type': 'token',
      'client_id': CLIENT_ID,
      //'redirect_uri': 'http://www.wavesdesignstudio.com',
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadTasksApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Load Google Tasks API client library.
 */
function loadTasksApi() {
  gapi.client.load('tasks', 'v1', listTaskLists);
}
