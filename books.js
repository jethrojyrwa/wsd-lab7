let booklist=[]
let currentPage=1
let itemsPerPage=6

const fetchbookss=document.querySelector('#fetchbooks')
let mainContainer=document.querySelector('#books-container')
let paginationcontainer=document.querySelector('#pagination-container')
let searchingInput=document.querySelector('#search')
let sortingItem=document.querySelector('#sorting')


fetchbookss.addEventListener('click',async()=>{
await fetch('https://raw.githubusercontent.com/bvaughn/infinite-list-reflow-examples/master/books.json')
.then((response)=>response.json())
.then((data)=>booklist=data)
.catch((error)=>console.error(error))
displayBooks()
})

function displayBooks() {
    mainContainer.innerHTML = "";
    let filteredBooks = booklist.filter(book => book.title.toLowerCase().includes(searchingInput.value.toLowerCase()));

    if (sortingItem.value == 'asc') {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
    }

    let paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, (currentPage * itemsPerPage));

    mainContainer.classList.add('grid', 'grid-cols-3', 'gap-4'); 

    for (let i = 0; i < paginatedBooks.length; i++) {
        let container = document.createElement('div');
        container.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-lg', 'flex', 'flex-col', 'items-center'); 

        let bookimg = document.createElement('img');
        bookimg.src = paginatedBooks[i].thumbnailUrl;
        bookimg.alt = "IMG NOT AVAILABLE"
        bookimg.classList.add('h-32', 'w-32', 'object-cover', 'mb-4'); 

        let title = document.createElement('div');
        title.textContent = paginatedBooks[i].title;
        title.classList.add('text-lg', 'font-semibold', 'text-center', 'mb-2'); 

        let author = document.createElement('div');
        author.textContent = paginatedBooks[i].authors;
        author.classList.add('text-sm', 'text-gray-600', 'text-center'); 

        container.appendChild(bookimg);
        container.appendChild(title);
        container.appendChild(author);
        mainContainer.appendChild(container);
    }
    displayPagination(filteredBooks.length);
}


searchingInput.addEventListener('input',()=>{
    currentPage=1
    displayBooks()
})

sortingItem.addEventListener('change',()=>{
    displayBooks()
})

function displayPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationcontainer = document.querySelector('#pagination-container');
    paginationcontainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add(
            'm-2','px-4', 'py-2', 'mx-1', 'bg-white-500', 'text-black', 'rounded-lg', 
            'hover:bg-white-600', 'hover:text-black', 'focus:outline-none', 'focus:ring-2', 
            'focus:ring-black-400', 'focus:ring-opacity-50'
        );

        if (i === currentPage) {
            pageButton.classList.add('bg-black-700', 'font-bold'); // Active page button style
        }

        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayBooks();
        });

        paginationcontainer.appendChild(pageButton);
    }
}
