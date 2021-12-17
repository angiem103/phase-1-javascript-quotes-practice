
    const quoteUl = document.querySelector('#quote-list')
    const form = document.querySelector('#new-quote-form')
    const url = 'http://localhost:3000/quotes'

document.addEventListener('DOMContentLoaded', function() {
  

    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(data => {
        renderQuote(data)
    })
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
        <button class='btn-success'>Likes: <span> 0</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>
    `
    //console.log(quoteData)

    li.querySelector('.btn-danger').addEventListener('click', () =>{
        li.remove()
        deleteQuote(quoteData.id)
    })

    quoteData.likes.forEach(key => {
        //console.log(key.id)\
    const span = li.querySelector('span')
    span.innerText = key.id

    li.querySelector('.btn-success').addEventListener('click', () =>{
        console.log('click')
        key.id++

        fetch('http://localhost:3000/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quoteId: parseInt(`${quoteData.id}`),
                id: key.id
            })
        })
        .then(res=>res.json())
        .then(key => console.log(key.id))

    }) 


    })
     

    quoteUl.appendChild(li)

    }) 
    
    form.addEventListener('submit', (e) =>{
        e.preventDefault()
            const newQuote = e.target.querySelector('#new-quote').value
            const newAuthor = e.target.author.value
           fetch(url, {
               method: 'POST',
               headers: {
                   'Content-Type' : 'application/json'
               },
               body: JSON.stringify({
                   quote: newQuote,
                   author: newAuthor
               })
           })
           .then(res => res.json())
           .then(quoteInfo => createNewQuote(quoteInfo))
       })

    function createNewQuote(quoteInfo){
        console.log(quoteInfo)
        const li = document.createElement('li')
        li.className = 'quote-card'
        li.innerHTML = `
        <blockquote class="blockquote">
        <p class="mb-0">${quoteInfo.quote}</p>
        <footer class="blockquote-footer">${quoteInfo.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span> 0</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>
    `
        quoteUl.appendChild(li)

        li.querySelector('.btn-danger').addEventListener('click', () =>{
            li.remove()
            deleteQuote(quoteInfo.id)
        })
    }

}


function deleteQuote(id){
    fetch(url + `/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application.json'
        },
    })
    .then(res => res.json())
    .then(quote => console.log(quote))
}
