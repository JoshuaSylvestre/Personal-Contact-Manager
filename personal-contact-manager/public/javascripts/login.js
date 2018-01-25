function doLogin() {
  var user = {};
  user.username = document.getElementById('username').value;
  user.password = document.getElementById('password').value;

  $.ajax({
    type:'POST',
    url: '/login',
    data: user, // maybe use it?
    dataType: 'json',
    error: displayErrorMsg
    // success: function(result) {
    //   console.log("Successfully logged user in!");
    //   // check json error field
    // },
    // error: function(type, exception){
    //   console.log("Cannot log user in.");
    //   document.getElementById('success').style.display = "block";
    // }
  });

  function displayErrorMsg(data) {
    var jsonObject = JSON.parse(data);
    document.getElementById('success').style.display = "block";
  }

}
