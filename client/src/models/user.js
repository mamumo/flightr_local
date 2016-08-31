var Form = function() {
}

Form.prototype = {


  submit: function(e){
    console.log( "HIYA" )
    

   var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
   var fname = document.form.Name.value
    lname = document.form.LastName.value
    femail = document.form.Email.value
    freemail = document.form.enterEmail.value
    fpassword = document.form.Password.value
    freepassword = document.form.enterPassword.value
     
   if( fname === "" )
     {
       document.form.Name.focus() ;
    document.getElementById("errorBox").innerHTML = "enter the first name";
       return false;
     }
   if( lname === "" )
     {
       document.form.LastName.focus() ;
     document.getElementById("errorBox").innerHTML = "enter the last name";
       return false;
     }
      
     if (femail === "" )
   {
    document.form.Email.focus();
    document.getElementById("errorBox").innerHTML = "enter the email";
    return false;
    }else if(!emailRegex.test(femail)){
    document.form.Email.focus();
    document.getElementById("errorBox").innerHTML = "enter the valid email";
    return false;
    }
     
     if (freemail === "" )
   {
    document.form.enterEmail.focus();
    document.getElementById("errorBox").innerHTML = "Re-enter the email";
    return false;
    }else if(!emailRegex.test(freemail)){
    document.form.enterEmail.focus();
    document.getElementById("errorBox").innerHTML = "Re-enter the valid email";
    return false;
    }
     
    if(freemail !=  femail){
     document.form.enterEmail.focus();
     document.getElementById("errorBox").innerHTML = "emails are not matching, re-enter again";
     return false;
     }
     
     
   if(fpassword === "")
    {
     document.form.Password.focus();
     document.getElementById("errorBox").innerHTML = "enter the password";
     return false;
    }

    if(freepassword === "")
     {
      document.form.Password.focus();
      document.getElementById("errorBox").innerHTML = "enter the password";
      return false;
     }
     
    if(freepassword !=  fepassword){
     document.form.enterEmail.focus();
     document.getElementById("errorBox").innerHTML = "passwords are not matching, re-enter again";
     return false;
     } 

    if(fname != '' && lname != '' && femail != '' && freemail != '' && fpassword != '' && fmonth != '' && fday != '' && fyear != ''){
     document.getElementById("errorBox").innerHTML = "form submitted successfully";
     }

     var input = document.getElementsByName( 'name' )
     var name = input.value
     console.log( "I Am Posting")

     var request = XMLHttpRequest();
     request.open( 'POST', '/users' );
     request.setRequestHeader("Content-Type", "application/json")
        request.onload = function() {
          if( request.status === 200 ) {
          }
  }
  request.send( JSON.stringify( { name: name } ) )
} 
}
module.exports = Form;
