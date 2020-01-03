const userList = document.getElementById('gallery');
const searchBar = document.querySelector('.search-container');
const bodyElement = document.querySelector('body');


// Create a search bar and append it to the Dom dynamically
const search = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`

    searchBar.innerHTML = search;

// Grab search bar input
const searchInput = document.getElementById('search-input');
searchInput.addEventListener("keyup", filterUsers);

function filterUsers() {
    // Grabs a list of all the users on the page
    let cardItems = document.querySelectorAll('.card');

    // used the spread operator in order to ????? grab the array of user card elements, and place them into an array defined as names. 
    let names = [...cardItems]
    
    // map through the list of names and grabs the inner HTML of each card item. 
    names.map(user => {
        
        if(user.innerHTML.indexOf(searchInput.value) > -1) {
            user.style.display = "";
        } else {
            user.style.display = "none";
        }
    })
    
}


// Grabs the 12 users data 
function fetchData(url){
    return fetch(url)
    .then(resp => resp.json())
}
fetchData('https://randomuser.me/api/?results=12&inc=picture,name,email,location,dob,phone')
    .then(data => generateCardHTML(data.results))



// Create a function that will generate the 12 users, append them to the gallery div into cards dynamically. 
function generateCardHTML(data) {
    const html = data.map(user => 
        `<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${user.picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
    </div>
    </div>
`).join(''); 
    
userList.innerHTML = html;

    let cardItems = document.querySelectorAll('.card');
    let items = [...cardItems]
    console.log(items);
    items.map(item => {
            // Create event listener onto each card, so that a modal will popuplate. 
                item.addEventListener('click', (e) => {
                    data.map(user => {
                        console.log(user)
                        if(e.target.innerHTML.indexOf(user.name.first) > -1) {
                             let modalDisplay = `
                                    <div class="modal-container">
                                    <div class="modal">
                                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                        <div class="modal-info-container">
                                            <img class="modal-img" src="${user.picture.large} " alt="profile picture">
                                            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                                            <p class="modal-text">${user.email}</p>
                                            <p class="modal-text cap">${user.location.city}</p>
                                            <hr>
                                            <p class="modal-text">${user.phone}</p>
                                            <p class="modal-text">${user.location.street.number}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                                            <p class="modal-text">Birthday: ${user.dob.date}</p>
                                        </div>
                                    </div>
                                    `;
                                    bodyElement.innerHTML += modalDisplay;

                                const modal = document.querySelector('.modal-container');
                                
                                const closeModal = document.getElementById('modal-close-btn');
                                closeModal.addEventListener('click', () => {
                                    console.log("this was clicked")
                                    modal.style.display = "none";
                                    
                                    
                                });
                        }
                    })
                })
            });
        }




