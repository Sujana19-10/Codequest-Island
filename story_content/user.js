window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  const player = GetPlayer();

// Ensure you are accessing the updated variable values
const Username = player.GetVar("Username");  // TextEntry corresponds to the value entered by the user
const Useryear = player.GetVar("Useryear");  // TextEntry1 corresponds to the value entered by the user
const Userhallticketno = player.GetVar("Userhallticketno"); // TextEntry2 corresponds to the value entered by the user

// Log the captured values to ensure they are correct
console.log('Username:', Username);
console.log('Useryear:', Useryear);
console.log('Userhallticketno:', Userhallticketno);

// Send data to the backend (make sure the URL and keys match)
fetch('http://localhost:3000/api/users', {  // Correct endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        Username: Username,       // Use updated variable names (match the backend)
        Useryear: Useryear,
        Userhallticketno: Userhallticketno
    }),
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    console.log('User data saved successfully.');

    // Proceed to the next slide after the user data is saved
    player.SetVar("GoToNextSlide", true);  // Set the flag to go to the next slide
})
.catch(error => {
    console.error('Error:', error);
    // Handle error scenario (optional)
});

// Make sure to check that this line is being reached and triggered
console.log('Submitting data to backend...');
}

window.Script2 = function()
{
  // Access the Storyline Player
var player = GetPlayer();

// Retrieve the 'userCode' variable from Storyline
var userCode = player.GetVar("userCode");

// Send 'userCode' to the backend for validation
fetch("http://localhost:5000/verify", { // Updated URL to match the Flask backend on port 5000
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ code: userCode }) // Send user code in JSON format
})
    .then((response) => response.json())
    .then((data) => {
        if (data.correct) { // Assuming the backend sends 'correct' instead of 'success'
            // If code is correct, set a Storyline variable 'IsCorrect' to true
            player.SetVar("IsCorrect", true);

            // Optionally, display a success message
            alert("Correct output! Proceeding to the next slide.");
        } else {
            // If code is incorrect, set 'ErrorMessage' with the returned error
            player.SetVar("ErrorMessage", data.error);

            // Optionally, display the error message to the user
            alert("Error: " + data.error);
        }
    })
    .catch((error) => {
        console.error("Error validating code:", error);

        // Set an error message in Storyline
        player.SetVar("ErrorMessage", "An error occurred while validating your code. Please try again.");

        // Optionally, display an error message to the user
        alert("An error occurred while validating your code. Please try again.");
    });

}

window.Script3 = function()
{
  const player = GetPlayer();

// Get user details from Storyline variables
const Username = player.GetVar("Username");
const Useryear = player.GetVar("Useryear");
const Userhallticketno = player.GetVar("Userhallticketno");

console.log("Storyline Variables:");
console.log("Username:", Username);
console.log("Useryear:", Useryear);
console.log("Userhallticketno:", Userhallticketno);

// Send data to the backend to update the level
fetch('http://localhost:3000/api/users/level', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        Username: Username,
        Useryear: Useryear,
        Userhallticketno: Userhallticketno,
        level: 1
    }),
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('Response from server:', data);
    // Set a Storyline variable to true after the fetch completes
    player.SetVar("GoToNextSlide1", true);
})
.catch(error => {
    console.error('Error updating user level:', error);
    // Optionally, handle errors and stay on the current slide
    player.SetVar("GoToNextSlide1", false);
});

}

window.Script4 = function()
{
  // Access the Storyline Player
var player = GetPlayer();

// Retrieve the 'userCode1' variable from Storyline (Level 2 code input by the user)
var userCode1 = player.GetVar("userCode1");

// Define the backend endpoint for Level 2 validation
var backendEndpoint = "http://localhost:5000/verify";

// Send 'userCode1' to the backend for validation (Level 2)
fetch(backendEndpoint, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
        code: userCode1,  // Pass the user's code
        level: 2          // Specify Level 2 validation
    })
})
    .then((response) => response.json())
    .then((data) => {
        if (data.correct) { 
            // If the code is correct, set the 'IsCorrect1' Storyline variable to true
            player.SetVar("IsCorrect1", true);

            // Optionally, display a success message
            alert("Correct output! Proceeding to the next slide.");
        } else {
            // If the code is incorrect, set the 'ErrorMessage' Storyline variable
            player.SetVar("ErrorMessage", data.error);

            // Optionally, display the error message to the user
            alert("Error: " + data.error);
        }
    })
    .catch((error) => {
        console.error("Error validating code:", error);

        // Set an error message in Storyline
        player.SetVar("ErrorMessage", "An error occurred while validating your code. Please try again.");

        // Optionally, display an error message to the user
        alert("An error occurred while validating your code. Please try again.");
    });

}

window.Script5 = function()
{
  const player = GetPlayer();

// Get user details from Storyline variables
const Username = player.GetVar("Username");
const Useryear = player.GetVar("Useryear");
const Userhallticketno = player.GetVar("Userhallticketno");

console.log("Storyline Variables:");
console.log("Username:", Username);
console.log("Useryear:", Useryear);
console.log("Userhallticketno:", Userhallticketno);

// Send data to the backend to update the level
fetch('http://localhost:3000/api/users/level', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        Username: Username,
        Useryear: Useryear,
        Userhallticketno: Userhallticketno,
        level: 2
    }),
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('Response from server:', data);
    // Set a Storyline variable to true after the fetch completes
    player.SetVar("GoToNextSlide2", true);
})
.catch(error => {
    console.error('Error updating user level:', error);
    // Optionally, handle errors and stay on the current slide
    player.SetVar("GoToNextSlide2", false);
});

}

window.Script6 = function()
{
  // Access the Storyline Player
var player = GetPlayer();

// Retrieve the 'userCode2' variable from Storyline (Level 3 code input by the user)
var userCode2 = player.GetVar("userCode2");

// Define the backend endpoint for Level 3 validation
var backendEndpoint = "http://localhost:5000/verify";

// Send 'userCode2' to the backend for validation (Level 3)
fetch(backendEndpoint, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
        code: userCode2,  // Pass the user's code
        level: 3         // Specify Level 3 validation
    })
})
    .then((response) => response.json())
    .then((data) => {
        if (data.correct) { 
            // If the code is correct, set the 'IsCorrect2' Storyline variable to true
            player.SetVar("IsCorrect2", true);

            // Optionally, display a success message
            alert("Correct output! Proceeding to the next slide.");
        } else {
            // If the code is incorrect, set the 'ErrorMessage' Storyline variable
            player.SetVar("ErrorMessage", data.error);

            // Optionally, display the error message to the user
            alert("Error: " + data.error);
        }
    })
    .catch((error) => {
        console.error("Error validating code:", error);

        // Set an error message in Storyline
        player.SetVar("ErrorMessage", "An error occurred while validating your code. Please try again.");

        // Optionally, display an error message to the user
        alert("An error occurred while validating your code. Please try again.");
    });

}

window.Script7 = function()
{
  const player = GetPlayer();

// Get user details from Storyline variables
const Username = player.GetVar("Username");
const Useryear = player.GetVar("Useryear");
const Userhallticketno = player.GetVar("Userhallticketno");

console.log("Storyline Variables:");
console.log("Username:", Username);
console.log("Useryear:", Useryear);
console.log("Userhallticketno:", Userhallticketno);

// Send data to the backend to update the level
fetch('http://localhost:3000/api/users/level', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        Username: Username,
        Useryear: Useryear,
        Userhallticketno: Userhallticketno,
        level: 3
    }),
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('Response from server:', data);
    // Set a Storyline variable to true after the fetch completes
    player.SetVar("IsCorrect2", true);
})
.catch(error => {
    console.error('Error updating user level:', error);
    // Optionally, handle errors and stay on the current slide
    player.SetVar("IsCorrect2", false);
});

}

};
