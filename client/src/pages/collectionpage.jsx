import { useEffect } from "react"

function CollectionPage() {

    useEffect(() => {
        localStorage.getItem('collection')
    }, []) 


    return (
        <div>
            <h1>Summer</h1>
        </div>
    )
}



export default CollectionPage