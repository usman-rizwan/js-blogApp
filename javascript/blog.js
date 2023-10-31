var quill = new Quill("#editor", {
    theme: "snow",

});

function logOut() {
    var userData = localStorage.getItem("users");
    //    console.log(userPosts);
    userData = JSON.parse(userData);
    console.log(userData);
    if (!userData) {
        let timerInterval;
        Swal.fire({
            icon: "error",
            title: "Something went wrong",
            html: "Please Signup again ",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector("b");
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft();
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
        setTimeout(() => {
            location.href = "index.html ";
        }, 1500);
    } else {
        for (var i = 0; i < userData.length; i++) {
            // userData[i].name
            Swal.fire({
                icon: "warning",
                html: `<h2> <span class="text-capitalize"> ${userData[i].name} </span>, are you sure? </h2>
                <small>Your posts will be deleted permenantly</small>`,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Logout",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "success",
                        title: "Logged Out Successfully",
                    });
                    setTimeout(() => {
                        location.href = "index.html";
                    }, 1500);
                }
            });
        }
        localStorage.removeItem("posts");


    }
}


// Checking Local Storage 
var userName = [];
var names = localStorage.getItem("users");
//    console.log(userPosts);
userName = JSON.parse(names);
console.log(userName);
if (!names) {
    names = [];
}


/// Render Posts
var myBtn = document.getElementById("my-btn");
var editor = document.getElementById("editor");
var container = document.getElementById("container2");
var title = document.getElementById("title");
function renderPosts() {
    var userPosts = localStorage.getItem("posts");
    userPosts = JSON.parse(userPosts);
    // console.log(userPosts);
    container.innerHTML = "";
    if (userPosts && userPosts.length > 0) {
        for (var i = 0; i < userPosts.length; i++) {
            // console.log(userPosts[i].postTitle);
            var myPost = userPosts[i];
            var postTemplate = `
            <div class="container g-4">
            <div class="col">
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="card-title text-capitalize ">Post Title: ${myPost.postTitle}</h5>
                  
                  <p class="card-text">
                  
                  ${myPost.postContent}
                  </p>
                </div>
              </div>
            </div>;
            </div>`;
            container.innerHTML += postTemplate;

        }
    }
}
window.onload = renderPosts;


// Adding Post
function myPost() {
    var editorContent = quill.root.innerHTML;
    // console.log(editorContent);

    if (title.value.trim() && editorContent.trim()) {
        var userPosts = localStorage.getItem("posts");
        //    console.log(userPosts);
        userPosts = JSON.parse(userPosts);
        console.log(userPosts);
        if (!userPosts) {
            userPosts = [];
        }

        var post = {
            postTitle: title.value,
            postContent: editorContent,
        };
        userPosts.push(post);
        // console.log(arr);
        localStorage.setItem("posts", JSON.stringify(userPosts));
        quill.root.innerHTML = "";
        title.value = "";
        // console.log(userPosts);
        renderPosts();
        Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: 'Post Added Successfully',
            showConfirmButton: false,
            timer: 1000
        })
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Both title and content are required to add a post.!",
        });
    }
}

// User Profile
function showProfile() {
    var userData = localStorage.getItem("users");
    //    console.log(userPosts);
    userData = JSON.parse(userData);
    console.log(userData);
    if (!userData) {
        userData = [];
    }
    if (userData.length > 0) {
        for (let i = 0; i < userData.length; i++) {
            console.log(userData[i].name);
            Swal.fire({
                title: `${userData[i].name}'s Profile`,
                html: `<span><h5 class="text-capitalize"> Name: ${userData[i].name}</h5><h5>Email: ${userData[i].email}</h5> </span>`,
                imageUrl: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
            });
        }
    } else {
        let timerInterval;
        Swal.fire({
            icon: "error",
            title: "Something went wrong",
            html: "Please Signup again ",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector("b");
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft();
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
        setTimeout(() => {
            location.href = "index.html ";
        }, 1500);
    }
}
