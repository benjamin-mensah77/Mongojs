

document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const studentClass = document.getElementById('class').value;
    const location = document.getElementById('location').value;
    const birthdate = document.getElementById('birthdate').value;

    const mobile = document.getElementById('mobile').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, class: studentClass, location, birthdate, mobile })
    });

    const result = await response.json();
    document.getElementById('message').innerText = result.message;
    if (response.ok) {
        document.getElementById('registrationForm').reset();
    }
});

document.getElementById('viewStudentsButton').addEventListener('click', function() {
    window.location.href = '/students'; // Redirect to the user list page
});



