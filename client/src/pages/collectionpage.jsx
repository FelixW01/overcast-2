import { useEffect, useState } from "react"
import axios from 'axios';
import { Select } from 'antd';
import ProductsCard from '../components/cards/ProductsCard'
import './collectionpage.css'

function CollectionPage() {
const [collection, setCollection] = useState('')
const [collectionId, setCollectionId] = useState()
const [products, setProducts] = useState()
const [isLoading, setIsLoading] = useState(true);
const OPTIONS = ['Male', 'Female','T-shirt', 'Shorts', 'Jackets & Sweaters', 'Coats', 'Pants'];
const [selectedItems, setSelectedItems] = useState([]);
const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

    // Gets collection from localstorage, put it in state
    useEffect(() => {
        const storedCollection = localStorage.getItem('collection')
        setCollection(storedCollection)
    }, []) 

    // Sets collection Id based on collection state
    useEffect(() => {
        if(collection !== '') {
            collection === 'summer' ? setCollectionId(1) : collection === 'fall' ? setCollectionId(2) : setCollectionId(3);
        }
    }, [collection])

    // Calls getProducts, pass in collection Id and set loading to false signifying product is ready
    useEffect(() => {
        if (collectionId !== undefined) {
            getProducts(collectionId);

        }
    }, [collectionId])

    // Call to the backend for products based on collections, 1 for summer, 2 for fall and 3 for winter
    async function getProducts(collectionId) {
        try {
            if (collectionId !== undefined ) {
            const response = await axios.get(`/api/products`, {
                params: {collectionId}
            });

            // console.log(response, '<<< response')

            if (response.status === 200) {
                setProducts(response.data.products)
                setIsLoading(false)
            } else {
                console.log("Unable to fetch products data");
            }
          }
        } catch (error) {
            console.log(error, 'Error')
        }
    }


    return (
        <>
        { isLoading ? <h1>loading...</h1> : <main id="collection-container">
        <section id="product-section">
            <h1 id="collection-title"></h1>
            
            <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{
                    width: '100%',
                }}
                options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
            />
          
            <div className="main-div">
              <div className="card-div-container" id="product-div">
              <ProductsCard products={products} />
              </div>
            </div>
        </section>
    </main>}
    </>
    )
}



export default CollectionPage