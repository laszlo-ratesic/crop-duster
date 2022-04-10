
//saves general settings
document.getElementById("save1").addEventListener("click", function(){
    //first name
    var firstName= document.getElementById("fullName").value;
    localStorage.setItem('firstName', firstName);
    //last name
    var lastName= document.getElementById("lastName").value;
    localStorage.setItem('lastName', lastName);
    //email
    var email= document.getElementById("email").value;
    localStorage.setItem('email', email);
    //phone
    var phone= document.getElementById("phone").value;
    localStorage.setItem('phone', phone);
    //location
    var zipcode= document.getElementById("zipcode").value;
    localStorage.setItem('zipcode', zipcode);

    var location= document.getElementById("location").value;
    localStorage.setItem('location', location);
    //zipcode
    
})
document.getElementById("fullName").value = localStorage.getItem('firstName');
document.getElementById("lastName").value = localStorage.getItem('lastName');
document.getElementById("email").value = localStorage.getItem('email');
document.getElementById("phone").value = localStorage.getItem('phone');
document.getElementById("zipcode").value = localStorage.getItem('zipcode');
document.getElementById("location").value = localStorage.getItem('location');


//saves preferences settings



