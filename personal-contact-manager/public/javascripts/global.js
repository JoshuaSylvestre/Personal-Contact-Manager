
$(document).ready(function() {

    // Populate the user table on initial page load
    listUsers();
    // Onclick event for add user
    $('#btnAddUser').on('click', addUser);
    // Onclick event for YOU GUESSED IT! delete user
    $('#contactsTable table tbody').on('click', 'td button.deleteUserLink', deleteUser);
});

function listUsers() {
  // USER LIST FORMAT:
  // firstName, lastName, nickname, address, email, homePhone, cellPhone

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('/users/userlist', function(data) {

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
            url: '/users/adduser',
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
        url: '/users/deleteuser/' + $(this).attr('rel')
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
