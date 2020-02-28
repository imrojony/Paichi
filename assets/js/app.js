// login page er jonno




function doLogin(event) {
    event.preventDefault();
    let Username = document.getElementById('Username').value;

    let Password = document.getElementById('Password').value;

    const myPost = {

        Username: Username,
        Password: Password
    }

    fetch('http://192.168.1.103:8080/api/login', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(myPost)

    })
        .then((res) => {
            if (res.ok) {
                return res.json()

            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        })

        .then((data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("expire", data.expire);
            // ; localStorage.getItem("token")
            // localStorage.getItem("expire");
            if (localStorage.getItem("token").length > 100) {
                document.getElementById("loginFailedMsg").innerHTML = "";
                document.getElementById("loginSuccessMsg").innerHTML = "Login Successfull... Redirecting....";
                setTimeout(() => {
                    // redirect after 1 second
                    window.location = "/"
                }, 1000)



            }


        })
        .catch(err => {
            console.log('Error message: ', err.statusTExt);

            document.getElementById("loginFailedMsg").innerHTML = "Login Failed! Please try again with correct username password";
        });

}



function doRegistration(event) {
    event.preventDefault();
    let Username = document.getElementById('Username').value;

    let Password = document.getElementById('Password').value;
    let Email = document.getElementById('Email').value;
    let Phone = document.getElementById('Phone').value;

    const myPost = {

        Username: Username,
        Password: Password,
        Phone: Phone,
        Email: Email
    }

    fetch('http://192.168.1.103:8080/api/register', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(myPost)

    })
        .then((res) => {
            if (res.ok) {
                return res.json()

            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        })

        .then((data) => {


            document.getElementById("registrationSuccessMsg").innerHTML = "Registration Successfull... Please wait redirecting to login page....";
            setTimeout(() => {
                // redirect after 1 second
                window.location = "/login.html"
            }, 3000)

        })

        // .catch(err => console.log('Error message: ', err.statusTExt));
        .catch(err => {
            console.log('Error message: ', err.statusTExt);

            document.getElementById("registrationFailedMsg").innerHTML = "Registration Failed! Please try again with different username and password";
        });
}

function logOutMe() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
    // after remove token reload page
    setTimeout(() => {
        // redirect after 1 second
        location.reload();
    }, 1000)

}


//jquery code

$(document).ready(function () {

    var token = localStorage.getItem('token');
    if (JSON.stringify(token).length > 100) {
        // Logged in code
        $('.afterlogin').css("display", "block");

        // show username in menu
        var decoded = jwt_decode(token);
        var sessionUsername = decoded.id;
        $('.showUsername').html(sessionUsername);


    } else {
        // Logged out code
        $('.beforelogin').css("display", "block");
    }
});
