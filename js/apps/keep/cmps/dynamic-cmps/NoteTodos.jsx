export function NoteTodos({info}) {
    const {label, todos} = info;

    return (
        <div>
            <h3>{label}</h3>
            <ul>
                {todos.map((todo, idx) => {
                    return <li key={idx}>{todo.txt}</li>
                })}
            </ul>
        </div>
    )
}