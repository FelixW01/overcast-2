import { useEffect, useState } from "react"
import axios from 'axios';
import { Select, Skeleton, Avatar, Card } from 'antd';
import ProductsCard from '../components/cards/ProductsCard'
import './collectionpage.css'
const { Meta } = Card;

function CollectionPage() {
const [collection, setCollection] = useState('')
const [collectionId, setCollectionId] = useState()
const [products, setProducts] = useState()
const [allProducts, setAllProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [selectedItems, setSelectedItems] = useState([]);
const [dynamicTags, setDynamicTags] = useState([]);
const [sortOrder, setSortOrder] = useState(null);
const CATEGORY_MAP = {
    1: 'T-shirt',
    2: 'Shorts',
    3: 'Jackets & Sweaters',
    4: 'Coats',
    5: 'Pants',
};

    
    // 1. Gets collection from localstorage, put it in state
    useEffect(() => {
        const storedCollection = localStorage.getItem('collection')
        setCollection(storedCollection)
    }, []) 

    // 2. Sets collection Id based on collection state
    useEffect(() => {
        if(collection !== '') {
            collection === 'summer' ? setCollectionId(1) : collection === 'fall' ? setCollectionId(2) : setCollectionId(3);
        }
    }, [collection])

    // 3. Calls getProducts, pass in collection Id and set loading to false signifying product is ready
    useEffect(() => {
        if (collectionId !== undefined) {
            getProducts(collectionId);
        }
    }, [collectionId])

    // 4. Update filter options dynamically based on available products
    useEffect(() => {
        if (allProducts.length > 0) {
            console.log(allProducts, '<<< allProducts');
            // Set object is built into JS, only stores unique values, Set object will consist of unique tags from the available products array
            // Spread the set object in the array
            // This is done because there will be 3 different collections and 6 different tags, For every collection the products will be different as well
            const uniqueTags = [...new Set(allProducts.map((product) => CATEGORY_MAP[product.category_id]))];
            console.log(uniqueTags, '<<< unique tags')
            setDynamicTags(uniqueTags);
        }
    }, [allProducts]);

    // 5. Filters products based on user input from select
    useEffect(() => {
        if (selectedItems.length === 0) {
            setProducts(allProducts);
        } else {
            // product.category_id returns a number which mimics the CATEGORY_MAP
            const filteredProducts = allProducts.filter((product) =>
                selectedItems.includes(CATEGORY_MAP[product.category_id])
            );
            setProducts(filteredProducts);
        }
    }, [selectedItems, allProducts]);


    // Filters products by price, asc/desc/all
    useEffect(() => {
    // Resets products with allProducts which is a copy of the original data from the db
    if (sortOrder === 'all' || !sortOrder) {
        setProducts(allProducts);
    } else {
        // Sort desc/assc depending on sortOrder state
        const sortedProducts = [...products].sort((a, b) => 
            sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );
        setProducts(sortedProducts);
    }
    }, [sortOrder]);

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
        { isLoading ? 
        <div className="skeleton-container">
         <div className="loading-div">
            <Skeleton loading={isLoading} avatar active>
                  <Meta
                    avatar={<Avatar className="custom-avatar" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                    title="Card title"
                    description="This is the description"
                  />
            </Skeleton> 
            <Skeleton loading={isLoading} avatar active>
                  <Meta
                    avatar={<Avatar className="custom-avatar" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                    title="Card title"
                    description="This is the description"
                  />
            </Skeleton>
         </div>
        </div> 
    : <main id="collection-container">
        <section id="product-section">
            <h1 id="collection-title">{collection}</h1>
            
            <div className="main-div">
              <div className="card-div-container" id="product-container">
              <div className="select-div">
                <Select
                    id="tag-select"
                    mode="multiple"
                    placeholder="Category"
                    value={selectedItems}
                    onChange={setSelectedItems}
                    style={{
                        minWidth: '160px',
                        marginRight: '.25rem'
                    }}
                    options={dynamicTags.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                />

                <Select
                        id="sort-select"
                        placeholder="Price"
                        value={sortOrder}
                        onChange={setSortOrder}
                        style={{
                            minWidth: '160px',
                        }}
                        options={[
                            { value: 'all', label: 'All' },
                            { value: 'asc', label: 'Price: Low to High' },
                            { value: 'desc', label: 'Price: High to Low' }
                        ]}
                    />
            </div>
              <ProductsCard products={products} />
              </div>
            </div>
        </section>
    </main>}
    </>
    )
}



export default CollectionPage