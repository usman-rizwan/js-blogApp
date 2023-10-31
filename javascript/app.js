let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});
// var images = document.getElementById("userImage")
// console.log(images.files[0]);

// Signup
var loggedInUser;
function signUp() {
    event.preventDefault();
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passFormat = /^[A-Za-z]\w{7,14}$/;
    var sInput = document.getElementById("sinput");
    var email = document.getElementById("email");
    var pass = document.getElementById("pass");
    var userData = localStorage.getItem("users");
    var imageInput = document.getElementById("image");
    // var images = document.getElementById("userImage")
    // console.log(images.files[0]);
    // var reader =  new FileReader();
    // reader.readAsDataURL(images.files[0])
    // reader.onload = ()=>{
    //     console.log(reader.result);
    // }
    // console.log(userData);
    userData = JSON.parse(userData);
    console.log(userData);
    if (!userData) {
        userData = [];
    }
    var userExist = false;
    for (var i = 0; i < userData.length; i++) {
       if (userData[i].email == email.value) {
        userExist = true;
        break;
       } 
    }
    if (userExist) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User already exist with this email.",
        });
        email.style.border = "2px solid red" 
    } 
    else if (!sInput.value.trim()) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your name is not valid.",
        });
        sInput.style.border = "2px solid red"
        email.style.border = "0px "
        pass.style.border = "0px "
    }
    else if (!email.value.match(mailFormat)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You have entered an invalid email address!",
        });
        sInput.style.border = "0px "
        email.style.border = "2px solid red"
        pass.style.border = "0px "
    }
    else if (!pass.value.match(passFormat)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter valid Password [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter]",
        });
        sInput.style.border = "0px solid"
        email.style.border = "0px solid"
        pass.style.border = "2px solid red"
    }
    else {
        var user = {
            name: sInput.value,
            email: email.value,
            password: pass.value,
            
        };
        userData.push(user);
        localStorage.setItem("users", JSON.stringify(userData));

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Added Successfully",
            showConfirmButton: false,
            timer: 1100,
        });
        setTimeout(function () {
            location.href = "blog.html";
        }, 1300);
        sInput.style.border = "0px "
        email.style.border = "0px "
        pass.style.border = "0px "
        sInput.value = "";
        email.value = "";
        pass.value = "";
    }
}
function logIn() {
    event.preventDefault();
    var userEmail = document.getElementById("loginEmail");
    var userPassword = document.getElementById("loginPassword");
    var check = localStorage.getItem("users");
    check = JSON.parse(check);
    if (!check) {
        check = [];
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: "error",
            title: "User Not Found!!",
        });
    }
    // console.log(check);
    if (userEmail.value.trim() && userPassword.value.trim()) {
        for (let i = 0; i < check.length; i++) {
            console.log(check[i].email, check[i].password);

            if (
                userEmail.value.trim() == check[i].email &&
                userPassword.value.trim() == check[i].password
            ) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2300,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully",
                });
                userEmail.value = "";
                userPassword.value = "";
                    setTimeout(function () {
                        location.href = "blog.html";
                    }, 2500);
                return;
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                Toast.fire({
                    icon: "error",
                    title: "User Not Found!!",
                });
            }
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Add valid input!",
        });
    }

    userEmail.value = "";
    userPassword.value = "";
}
