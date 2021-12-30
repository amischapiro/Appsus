export function FilterNote(){

    return( 
        <section className="filter-notes">
            <input type="text" placeholder="search notes" />
            <button>All notes</button>
            <button>Simple notes</button>
            <button>Lists</button>
            <button>Images</button>
            <button>Videos</button>
        </section>
    )
}