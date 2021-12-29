



export function SearchList({ list, onAddBook }) {

   
    
   
    
    return <section>
        <ol>
        {list && list.map((book,idx) => {

            return <li key={idx}> {book.volumeInfo.title} 
            <button onClick={()=>{onAddBook(book)}}>+</button> </li>
        })}
        </ol>
    </section>
}

