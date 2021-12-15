
    const quoteUl = document.querySelector('#quote-list')

document.addEventListener('DOMContentLoaded', function() {
  

    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(data => renderQuote(data))
})

function renderQuote(data) {
    data.forEach(quoteData => {
    const li = document.createElement('li')
    li.className = 'quote-card'
    li.innerHTML = `
        <blockquote class="blockquote">
        <p class="mb-0">${quoteData.quote}</p>
        <footer class="blockquote-footer">${quoteData.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>
    `
    quoteUl.appendChild(li)
    })  
}