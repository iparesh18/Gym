document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const closeBtn = document.getElementById("close-btn");

    // Toggle Menu when clicking the hamburger button
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close Menu when clicking the close button
    closeBtn.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove("active");
        }
    });
});

// Mobile Navbar Toggle
document.getElementById("hamburger").addEventListener("click", function () {
    document.getElementById("nav-menu").classList.add("open");
});

// const API_URL = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/";
// const API_OPTIONS = {
//     method: "GET",
//     headers: {
// 'x-rapidapi-key': 'b64322045bmsh960f7dae730d422p1293ecjsn2780f5ed3bb7',
// 		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
//     }
// };

// async function fetchExercises() {
//     const muscle = document.getElementById("muscleSelect").value;
//     const exerciseList = document.getElementById("exerciseList");

//     if (!muscle) {
//         alert("Please select a muscle group!");
//         return;
//     }

//     exerciseList.innerHTML = "<p>Loading...</p>";

//     try {
//         const response = await fetch(`${API_URL}${muscle}`, API_OPTIONS);
//         if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

//         const exercises = await response.json();

//         exerciseList.innerHTML = ""; // Clear previous results

//         exercises.forEach(exercise => {
//             const card = document.createElement("div");
//             card.className = "exercise-card";
//             card.innerHTML = `
//                 <h3>${exercise.name}</h3>
//                 <img src="${exercise.gifUrl}" alt="${exercise.name}">
//                 <p><strong>Target:</strong> ${exercise.target}</p>
//             `;
//             exerciseList.appendChild(card);
//         });

//     } catch (error) {
//         exerciseList.innerHTML = "<p>Error loading exercises. Try again later.</p>";
//         console.error("Fetch error:", error);
//     }
// }
const API_URL = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/";
const API_OPTIONS = {
    method: "GET",
    headers: {
'x-rapidapi-key': 'b64322045bmsh960f7dae730d422p1293ecjsn2780f5ed3bb7',
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
};

// Fetch exercises from API
async function fetchExercises() {
    const muscle = document.getElementById("muscleSelect").value;
    const exerciseList = document.getElementById("exerciseList");

    if (!muscle) {
        alert("Please select a muscle group!");
        return;
    }

    exerciseList.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`${API_URL}${encodeURIComponent(muscle)}`, API_OPTIONS);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const exercises = await response.json();

        if (exercises.length === 0) {
            exerciseList.innerHTML = "<p>No exercises found.</p>";
            return;
        }

        exerciseList.innerHTML = ""; // Clear previous results

        exercises.forEach(exercise => {
            const card = document.createElement("div");
            card.className = "exercise-card";
            card.innerHTML = `
                <h3>${exercise.name}</h3>
                <img src="${exercise.gifUrl}" alt="${exercise.name}" loading="lazy">
                <p><strong>Target:</strong> ${exercise.target}</p>
                <p><strong>Equipment:</strong> ${exercise.equipment}</p>
                <button class="like-btn" onclick="saveToFavorites('${exercise.name}', '${exercise.gifUrl}', '${exercise.target}', '${exercise.equipment}')">❤️ Like</button>
            `;
            exerciseList.appendChild(card);
        });

    } catch (error) {
        exerciseList.innerHTML = "<p>Error loading exercises. Try again later.</p>";
        console.error("Fetch error:", error);
    }
}

// Save liked exercise to localStorage
function saveToFavorites(name, gifUrl, target, equipment) {
    let likedExercises = JSON.parse(localStorage.getItem("likedExercises")) || [];
    
    // Prevent duplicates
    if (!likedExercises.some(exercise => exercise.name === name)) {
        likedExercises.push({ name, gifUrl, target, equipment });
        localStorage.setItem("likedExercises", JSON.stringify(likedExercises));
        alert(`${name} added to favorites!`);
    } else {
        alert(`${name} is already in favorites.`);
    }
}
