document.getElementById('compare-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Show the spinner and status message
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('status-message').textContent = 'Fetching responses...';

    var model1 = document.getElementById('model1').value;
    var model2 = document.getElementById('model2').value;
    var openai_api_key = document.getElementById('openai_api_key').value;
    var question = document.getElementById('question').value;

    fetch('/compare', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model_names: [model1, model2],
            openai_api_key: openai_api_key,
            question: question,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Hide the spinner
        document.getElementById('spinner').style.display = 'none';

        if (data.error) {
            document.getElementById('status-message').textContent = 'An error occurred. Please try again.';
            alert('Error: ' + data.error);
            return;
        }
        
        document.getElementById('status-message').textContent = 'Responses received!';
        document.getElementById('answer1').innerText = data.answers[0];
        document.getElementById('answer2').innerText = data.answers[1];
        document.getElementById('results').style.display = 'block';
    })
    .catch(error => {
        // Hide the spinner
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('status-message').textContent = 'An error occurred. Please try again.';
        alert('Error while fetching: ' + error);
    });
});
