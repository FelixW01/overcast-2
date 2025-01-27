import { useEffect, useState } from "react"
import axios from 'axios';
import { Select } from 'antd';
import ProductsCard from '../components/cards/ProductsCard'
import './collectionpage.css'

function CollectionPage() {
const [collection, setCollection] = useState('')
const [collectionId, setCollectionId] = useState()
const [products, setProducts] = useState()
const [allProducts, setAllProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [selectedItems, setSelectedItems] = useState([]);
const [dynamicTags, setDynamicTags] = useState([]);
// const OPTIONS = ['T-shirt', 'Shorts', 'Jackets & Sweaters', 'Coats', 'Pants'];
const CATEGORY_MAP = {
    1: 'T-shirt',
    2: 'Shorts',
    3: 'Jackets & Sweaters',
    4: 'Coats',
    5: 'Pants',
};
// const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    
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

    // Update filter options dynamically based on available products
    useEffect(() => {
        if (allProducts.length > 0) {
            console.log(allProducts, '<<< allProducts');
            // Set object is built into JS, only stores unique values
            const uniqueTags = [...new Set(allProducts.map((product) => CATEGORY_MAP[product.category_id]))];
            console.log(uniqueTags, '<<< unique tags')
            setDynamicTags(uniqueTags);
        }
    }, [allProducts]);

    useEffect(() => {
        if (selectedItems.length === 0) {
            setProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter((product) =>
                selectedItems.includes(CATEGORY_MAP[product.category_id])
            );
            setProducts(filteredProducts);
        }
    }, [selectedItems, allProducts]);

    // Call to the backend for products based on collections, 1 for summer, 2 for fall and 3 for winter
    async function getProducts(collectionId) {
        try {
            if (collectionId !== undefined ) {
            const response = await axios.get(`/api/products`, {
                params: {collectionId}
            });

            if (response.status === 200) {
                setProducts(response.data.products)
                setAllProducts(response.data.products);
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
            <div className="select-div">
                <Select
                    mode="multiple"
                    placeholder="Filter by"
                    value={selectedItems}
                    onChange={setSelectedItems}
                    style={{
                        width: '50%',
                    }}
                    options={dynamicTags.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                />
            </div>
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