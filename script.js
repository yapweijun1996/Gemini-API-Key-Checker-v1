document.getElementById('checkKeys').addEventListener('click', async () => {
    const apiKeys = document.getElementById('apiKeys').value.trim().split('\n');
    const selectedModel = document.getElementById('modelSelector').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    for (const key of apiKeys) {
        if (key.trim() === '') continue;

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.textContent = `Checking ${key}...`;
        resultsDiv.appendChild(resultDiv);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "contents": [{
                        "parts": [{
                            "text": "hello"
                        }]
                    }]
                })
            });

            if (response.ok) {
                resultDiv.textContent = `${key} - Alive`;
                resultDiv.classList.add('alive');
            } else {
                resultDiv.textContent = `${key} - Dead`;
                resultDiv.classList.add('dead');
            }
        } catch (error) {
            resultDiv.textContent = `${key} - Dead (Error)`;
            resultDiv.classList.add('dead');
        }
    }
});
