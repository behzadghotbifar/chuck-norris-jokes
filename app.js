// Add Event Listener for Random joke
document.getElementById('randomjoke').addEventListener('click', loadRandomJoke);

// Add Event Listener for listing Categories
document.getElementById('categoryjoke').addEventListener('click', loadCategoryList);

// Add Event Listener for load joke from category
document.getElementById('categorylist').addEventListener('click', loadCategoryJoke);

function loadRandomJoke() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.chucknorris.io/jokes/random', true);

    xhr.onload = function() {
        if(this.status === 200) {
            const joke = JSON.parse(this.responseText);
            const jokeContent = joke.value;

            document.getElementById('jokecontent').innerHTML = jokeContent;
        }
    }

    xhr.send();
}

function loadCategoryList() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.chucknorris.io/jokes/categories', true);

    xhr.onload = function() {
        if(this.status === 200) {
            const categories = JSON.parse(this.responseText);
            
            // Show categories for user
            let output = '';
            categories.forEach(function(category){
                output += `
                    <li class="jokecategory">${category}</li>
                `
            });
            document.getElementById('categorylist').innerHTML = output;
        }
    }

    xhr.send();
}

function loadCategoryJoke(e) {
    if(e.target.classList.contains('jokecategory')) {
        const jokeCategory = e.target.textContent;
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `https://api.chucknorris.io/jokes/random?category=${jokeCategory}`, true);

        xhr.onload = function() {
            if(this.status === 200) {
                const joke = JSON.parse(this.responseText);
                const jokeContent = joke.value;
    
                document.getElementById('jokecontent').innerHTML = jokeContent;
            }
        }

        xhr.send();
    }
}
