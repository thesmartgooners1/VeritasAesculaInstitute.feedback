function showSection(section) {
    const sections = ['home', 'downloads', 'feedback'];
    sections.forEach(sec => {
        document.getElementById(sec + 'Section').style.display = (sec === section ? 'block' : 'none');
    });
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    document.getElementById(section + 'Link').classList.add('active');
}
function sendFeedback(event) {
    event.preventDefault();
    const email = document.getElementById('email').value || "None";
    const feedback = document.querySelector('textarea').value;

    if (!feedback) {
        alert("Please provide feedback.");
        return;
    }

    const message = `**New Feedback**\n**Email:** ${email}\n**Feedback:** ${feedback}`;

    fetch('https://discord.com/api/webhooks/1364889560571576430/hub0FuCzAPIk9YJJCtE7IwqIjadFdNz4IUeyxeU-I5uBHo9DyrR4tL9GR-2wzLGIfD27', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message })
    }).then(response => {
        if (response.ok) {
            alert("Feedback submitted successfully!");
            document.getElementById('feedbackForm').reset();
        } else {
            alert("Something went wrong, please try again later.");
        }
    });
}

function validateEmailInput() {
    const email = document.getElementById('email').value;
    const emailStatus = document.getElementById('emailStatus');
    const emailInput = document.getElementById('email');

    if (!email) {
        emailStatus.textContent = '';
        emailInput.style.borderColor = '#444';
        return;
    }

    if (validateEmail(email)) {
        emailStatus.textContent = 'Valid email';
        emailStatus.className = 'email-status valid';
        emailInput.style.borderColor = '#4caf50';
    } else {
        emailStatus.textContent = 'Invalid email';
        emailStatus.className = 'email-status invalid';
        emailInput.style.borderColor = '#f44336';
    }
}

function validateEmail(email) {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return email.match(emailPattern);
}

showSection('home');
