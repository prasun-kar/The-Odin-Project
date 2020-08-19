const form           = document.getElementById('form-add-book')
const formButton     = document.getElementById('form-button')
const helperText     = document.getElementById('helper-text')
const validationText = document.getElementById('validation-text')

let myLibrary = []

const toggleHelperText = toggle => {
  let display = toggle ? 'absolute' : 'none'
  helperText.style.display = display
}

const toggleValidationText = (toggle, message) => {
  let display = toggle ? 'absolute' : 'hidden'
  validationText.innerText     = message
  validationText.style.display = display
}

const toggleForm = () => {
  form.hidden       = !form.hidden
  formButton.hidden = !formButton.hidden
}

const Book = (title, author, pages, read) => {
  return {
    title  : title,
    author : author,
    pages  : pages,
    read   : read
  }
}

toggleHelperText(true)

function addBookToLibrary() {
  let form   = document.getElementById('form-add-book')
  let title  = document.getElementById('form-title').value
  let author = document.getElementById('form-author').value
  let pages  = Number(document.getElementById('form-pages').value)
  let read   = document.getElementById('form-read').checked

  if (title == '' || author == '' || pages == '') return toggleValidationText(true, 'Please fill in all fields.')

  toggleValidationText(false, '')
  toggleForm()
  form.reset()

  myLibrary = [...myLibrary, Book(title, author, pages, read)]

  renderLibrary()
}

function renderLibrary() {
  let library = document.getElementById('library')
  
  library.innerHTML = ''
  toggleHelperText(false)

  myLibrary.forEach(book => {
    let bookDiv  = document.createElement('div')
    let metaDiv  = document.createElement('div')
    let title    = document.createElement('h1')
    let author   = document.createElement('p')
    let pages    = document.createElement('p')
    let readText = document.createElement('label')
    let read     = document.createElement('input')

    bookDiv.className  = 'book'
    metaDiv.className  = 'metadata'
    title.className    = 'book-title'
    author.className   = 'book-author'
    pages.className    = 'book-pages'
    read.type          = 'checkbox'
    readText.className = 'book-read-text'
    readText.setAttribute('for', 'book-read')

    title.innerText    = book.title
    author.innerText   = `by ${book.author}`
    pages.innerText    = `${book.pages} pages`
    readText.innerText = 'Read '
    read.checked       = book.read

    bookDiv.append(title, metaDiv)
    metaDiv.append(author, pages, readText, read)

    library.appendChild(bookDiv)
  })
}