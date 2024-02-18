const wrapper = document.querySelector(".wrapper"),
    signupHeader = document.querySelector(".signup header"),
    loginHeader = document.querySelector(".login header");

if (loginHeader) {
    loginHeader.addEventListener("click", () => {
        wrapper.classList.add("active");
    });
}

if (signupHeader) {
    signupHeader.addEventListener("click", () => {
        wrapper.classList.remove("active");
    });
}

// Function to handle sign-up
function signup() {
    var username = document.getElementById("signupUsername").value;
    var password = document.getElementById("signupPassword").value;
    // Check if the user already exists
    if (localStorage.getItem(username) !== null) {
        alert("User already exists. Please choose a different username.");
        return;
    }

    // Store user data in local storage
    localStorage.setItem(username, JSON.stringify({
        username: username,
        password: password
    }));
    alert("Sign up successful. You can now log in.");
}

// Function to handle log-in
function login(e) {
    e.preventDefault();
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    try {
        var storedUserData = localStorage.getItem(username);

        if (storedUserData !== null) {
            var userData = JSON.parse(storedUserData);
            console.log(userData);
            if (userData.password === password) {

                alert("Log in successful. Welcome, " + username + "!");
                window.location.href = "home.html";

            } else {
                alert("Incorrect password. Please try again.");
            }
        } else {
            alert("User not found. Please sign up.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
}



const myForm = document.querySelector('#myForm');
let wap = document.querySelector('.movi_wrapper');
let addToList = document.getElementsByTagName('button');
// if (addToList) {
//     addToList.addEventListener('click', () => {
//         imagesOFfirst;
//     });
// }
myForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('myForm')
    let value = document.querySelector('input').value
    let firstMovie
    await axios(` https://api.tvmaze.com/search/shows?q=${value}`).then((x) => {
        wap.innerHTML = ''
        firstMovie = x.data
    })
    console.log(firstMovie)
    let filterOfMovies = firstMovie.filter((x) => {
        return x.show.image
    })
    console.log(filterOfMovies)
    filterOfMovies.forEach((element) => {
        let moviesBox = document.createElement('div');
        moviesBox.classList.add('movi_box')

        let contantBox = document.createElement('div');
        contantBox.classList.add('contant_box');

        let imagesOFfirst = document.createElement('img');
        imagesOFfirst.classList.add('movi_img')

        let name = document.createElement('p');
        name.textContent = element.show.name

        let listBtn = document.createElement('button');
        listBtn.textContent = "Add to watchlist"
        listBtn.setAttribute('onclick', `addList(event, '${value}')`);
        listBtn.classList.add('youtube');

        imagesOFfirst.src = element.show.image.original;
        moviesBox.append(imagesOFfirst);
        contantBox.append(name);
        contantBox.append(listBtn);

        lazyload();
        console.log(imagesOFfirst.src);
        wap.append(moviesBox);
        moviesBox.appendChild(contantBox);
    });
});
function addList(event, abc) {
    let a = event.target.closest('.movi_box').innerHTML;
    console.log(abc);

    let moviesBox = document.createElement('div');
    moviesBox.classList.add('movi_box');
    moviesBox.innerHTML = a;
    document.querySelector('.watch_listing').appendChild(moviesBox);

    document.querySelector('.watch_listing').querySelectorAll('.youtube').forEach((x) => {
        x.removeAttribute('onclick')
        x.innerHTML = `<a href="https://www.youtube.com/results?search_query=${abc}" target="_blank">Search ${abc} on youtube</a>`

    });
    // let addListShow = document.querySelector('.watch_listing');
    // addListShow.style.display === 'flex';

    // let imagesOFfirst = document.createElement('img');
    // imagesOFfirst.classList.add('movi_img')

    // let watchListUrl = document.createElement('a');
    // watchListUrl.href = "https://www.youtube.com/watch?v=eHx9GkcTYWE";
    // imagesOFfirst.appendChild(watchListUrl);
}