
$(document).ready(function() {
  if(window.location.href.indexOf("users/") > -1) {
    // Populate the user table on initial page load
    listUsers();

    // Onclick event for add user
    $('#btnAddUser').on('click', addUser);

    // Onclick event for YOU GUESSED IT! delete user
    $('#contactsTable table tbody').on('click', 'td button.deleteUserLink', deleteUser);

  	// Need to use keyup since keypress eats user input :x
  	$('#inputSearch').on('keyup', searchUser);

  	// Onclick event for search button
  	$('#btnSearchUser').on('click', searchUser);
  }
  else {
    $('#btnLoginUser').on('click', loginUser);
  }

});

function loginUser() {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#loginUser input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {
      // If it is, compile all user info into one object
      var logUser = {
        'username': $('#loginUser fieldset input#inputUsername').val().trim(),
        'password': $('#loginUser fieldset input#inputPassword').val()
      }

      // Use AJAX to post the object to our adduser service
      $.ajax({
        type: 'POST',
        data: logUser,
        url: '/users',
        dataType: 'JSON'
      }).done(function(response) {
        // Check for successful (blank) response
        if (response.msg === '') {
            // Successful log
            window.location.href = 'users/contacts';
        }
        else if(response.msg === 'DNE') {
          if($('#loginErrorIncomplete').is(":visible"))
            $('#loginErrorIncomplete').hide();

          $('#loginErrorDNE').show();
        }
      });
  }
  else {
    if($('#loginErrorDNE').is(":visible"))
      $('#loginErrorDNE').hide();

      // If errorCount is more than 0, error out
      $('#loginErrorIncomplete').show();
      return false;
  }
};

function listUsers() {
  // USER LIST FORMAT:
  // firstName, lastName, nickname, address, email, homePhone, cellPhone

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('userlist', function(data) {

      // For each item in the JSON, add a table row and cells to the content string
      $.each(data, function(){
        tableContent += '<tr>';
        tableContent += '<td>' + this.firstName + '</td>';
        tableContent += '<td>' + this.lastName + '</td>';
        tableContent += '<td>' + this.nickname + '</td>';
        tableContent += '<td>' + this.address + '</td>';
        tableContent += '<td>' + this.email + '</td>';
        tableContent += '<td>' + this.homePhone + '</td>';
        tableContent += '<td>' + this.cellPhone + '</td>';
        tableContent += '<td><button href="#" class="deleteUserLink btn btn-danger" rel="' + this._id + '">Delete</button></td>';
        tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#contactsTable table.table tbody').html(tableContent);
  });
};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
          'firstName': $('#addUser fieldset input#inputFirstName').val().trim(),
          'lastName': $('#addUser fieldset input#inputLastName').val().trim(),
          'nickname': $('#addUser fieldset input#inputNickname').val().trim(),
          'address': $('#addUser fieldset input#inputAddress').val().trim(),
          'email': $('#addUser fieldset input#inputEmail').val().trim(),
          'homePhone': $('#addUser fieldset input#inputHomePhone').val().trim(),
          'cellPhone': $('#addUser fieldset input#inputCellPhone').val().trim()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                listUsers();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function deleteUser(event) {

    event.preventDefault();

    $.ajax({
        type: 'DELETE',
        url: '/deleteuser/' + $(this).attr('rel')
    }).done(function( response ) {

        // Check for a successful (blank) response
        if (response.msg === '') {
        }
        else {
            alert('Error: ' + response.msg);
        }

        // Update the table
        listUsers();

    });

};

function searchUser(event) {

  event.preventDefault();

  // USER LIST FORMAT:
  // firstName, lastName, nickname, address, email, homePhone, cellPhone

  var substr = document.getElementById('inputSearch').value;

  // Empty search results to keep search up to date
  var tableContent = '';
  tableContent += '<tr>';
  tableContent += '</tr>';

  // jQuery AJAX call for JSON
  $.getJSON('/userlist', function(data) {

      // For each item in the JSON, only print for desired substrings
      $.each(data, function(){
		  if(this.firstName.concat(" " + this.lastName).toLowerCase().indexOf(substr) != -1)
		  {
			tableContent += '<tr>';
			tableContent += '<td>' + this.firstName + '</td>';
			tableContent += '<td>' + this.lastName + '</td>';
			tableContent += '<td>' + this.nickname + '</td>';
			tableContent += '<td>' + this.address + '</td>';
			tableContent += '<td>' + this.email + '</td>';
			tableContent += '<td>' + this.homePhone + '</td>';
			tableContent += '<td>' + this.cellPhone + '</td>';
			tableContent += '<td><button href="#" class="deleteUserLink btn btn-danger" rel="' + this._id + '">Delete</button></td>';
			tableContent += '</tr>';
		  }
      });

	  // Inject the whole content string into our existing HTML table
      $('#contactsTable table.table tbody').html(tableContent);

    });
};
