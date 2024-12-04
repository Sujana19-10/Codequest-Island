// Import the config.js file
import { CONFIG } from './config.js';

// Function to get the appropriate API URL based on environment (local or production)
const getApiUrl = (isValidation = false) => {
    const apiUrl = window.location.hostname === 'localhost' ? 
                   (isValidation ? CONFIG.VALIDATION_URL_LOCAL : CONFIG.API_BASE_URL_LOCAL) : 
                   (isValidation ? CONFIG.VALIDATION_URL : CONFIG.API_BASE_URL);
    return apiUrl;
};

window.InitUserScripts = function() {
    var player = GetPlayer();
    var object = player.object;
    var addToTimeline = player.addToTimeline;
    var setVar = player.SetVar;
    var getVar = player.GetVar;

    window.Script1 = function() {
        const player = GetPlayer();

        // Ensure you are accessing the updated variable values
        const Username = player.GetVar("Username");
        const Useryear = player.GetVar("Useryear");
        const Userhallticketno = player.GetVar("Userhallticketno");

        // Log the captured values to ensure they are correct
        console.log('Username:', Username);
        console.log('Useryear:', Useryear);
        console.log('Userhallticketno:', Userhallticketno);

        // Send data to the backend (make sure the URL and keys match)
        fetch(`${getApiUrl()}/api/users/createUser`, {  // Correct endpoint for user creation
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                Username: Username,       
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
            player.SetVar("GoToNextSlide", true);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        console.log('Submitting data to backend...');
    };

    window.Script2 = function() {
        var player = GetPlayer();

        // Retrieve the 'userCode' variable from Storyline
        var userCode = player.GetVar("userCode");

        // Send 'userCode' to the backend for validation
        fetch(`${getApiUrl(true)}/api/users/validateCode`, {  // Updated URL for validation at Level 1
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: userCode })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.correct) { 
                player.SetVar("IsCorrect", true);
                alert("Correct output! Proceeding to the next slide.");
            } else {
                player.SetVar("ErrorMessage", data.error);
                alert("Error: " + data.error);
            }
        })
        .catch((error) => {
            console.error("Error validating code:", error);
            player.SetVar("ErrorMessage", "An error occurred while validating your code. Please try again.");
            alert("An error occurred while validating your code. Please try again.");
        });
    };

    window.Script3 = function() {
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
        fetch(`${getApiUrl()}/api/users/updateUserLevel`, {  // Updated to PATCH route
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
            player.SetVar("GoToNextSlide1", true);
        })
        .catch(error => {
            console.error('Error updating user level:', error);
            player.SetVar("GoToNextSlide1", false);
        });
    };

    window.Script4 = function() {
        var player = GetPlayer();
        var userCode1 = player.GetVar("userCode1");

        fetch(`${getApiUrl(true)}/api/users/validateCodeLevel2`, {  // URL for Level 2 validation
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: userCode1, level: 2 })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.correct) { 
                player.SetVar("IsCorrect1", true);
                alert("Correct output! Proceeding to the next slide.");
            } else {
                player.SetVar("ErrorMessage", data.error);
                alert("Error: " + data.error);
            }
        })
        .catch((error) => {
            console.error("Error validating code:", error);
            player.SetVar("ErrorMessage", "An error occurred while validating your code. Please try again.");
            alert("An error occurred while validating your code. Please try again.");
        });
    };

    window.Script5 = function() {
        const player = GetPlayer();
        const Username = player.GetVar("Username");
        const Useryear = player.GetVar("Useryear");
        const Userhallticketno = player.GetVar("Userhallticketno");

        console.log("Storyline Variables:");
        console.log("Username:", Username);
        console.log("Useryear:", Useryear);
        console.log("Userhallticketno:", Userhallticketno);

        fetch(`${getApiUrl()}/api/users/level`, {
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
            player.SetVar("GoToNextSlide2", true);
        })
        .catch(error => {
            console.error('Error updating user level:', error);
            player.SetVar("GoToNextSlide2", false);
        });
    };

    window.Script6 = function() {
        var player = GetPlayer();
        var userCode2 = player.GetVar("userCode2");

        fetch(`${getApiUrl(true)}/api/users/validateCodeLevel3`, {  // URL for Level 3 validation
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: userCode2, level: 3 })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.correct) { 
                player.SetVar("IsCorrect2", true);
                alert("Correct output! Proceeding to the next slide.");
            } else {
                player.SetVar("ErrorMessage", data.error);
                alert("Error: " + data.error);
            }
        })
        .catch((error) => {
            console.error("Error validating code:", error);
            player.SetVar("ErrorMessage", "An error occurred while validating your code. Please try again.");
            alert("An error occurred while validating your code. Please try again.");
        });
    };
};
