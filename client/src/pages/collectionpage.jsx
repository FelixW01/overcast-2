import { useEffect, useState } from "react"
import axios from 'axios';

function CollectionPage() {
const [collection, setCollection] = useState('')
const [collectionId, setCollectionId] = useState()
const [products, setProducts] = useState()
const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const storedCollection = localStorage.getItem('collection')
        setCollection(storedCollection)
    }, []) 

    useEffect(() => {
        if(collection !== '') {
            collection === 'summer' ? setCollectionId(1) : collection === 'fall' ? setCollectionId(2) : setCollectionId(3);
        }
    }, [collection])

    useEffect(() => {
        if (collectionId !== undefined) {
            getProducts(collectionId);
            setIsLoading(false)
        }
    }, [collectionId])

    async function getProducts(collectionId) {
        console.log(collectionId)
        try {
            if (collectionId !== undefined ) {
            const response = await axios.get(`/api/products`, {
                params: {collectionId}
            });

            console.log(response, '<<< response')

            if(response.status === 200) {
                setProducts(response.data.products)
                console.log("Products data fetched:", response.data.products);
            } else {
                console.log("Unable to fetch products data");
            }
          }
        } catch (error) {
            console.log(error, 'Error')
        }
    }
console.log(isLoading)
    return (
        <div>
            <h1>{collection}</h1>
            {isLoading ? <p>Loading products...</p> : <p>Products Loaded</p>}
        </div>
    )
}



export default CollectionPage