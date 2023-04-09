const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/engine/davinci-codex/completions";

const form = document.querySelector('form');
const questionInput = document.querySelector('#question');
const submitBtn = document.querySelector('#submit-btn');
const responseDiv = document.querySelector('#response');

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const question = questionInput.value;
  if (question) {
    responseDiv.textContent = 'Loading...';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: question,
        max_tokens: 100,
        n: 1,
        stop: ['\n']
      })
    };
    fetch(proxyUrl + apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        const answer = data.choices[0].text.trim();
        responseDiv.textContent = answer;
      })
      .catch(error => {
        console.error(error);
        responseDiv.textContent = 'An error occurred while processing your request.';
      });
  }
});
