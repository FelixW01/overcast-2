import { Link } from 'react-router-dom';
import './collection.css'
import PropTypes from 'prop-types';

function Collection({collections}) {
    function handleClick(id) {
        localStorage.setItem('collection', id)
    }

    return(
      <main className="main-container">
        {collections.map((collection, index) => {
        return(
        <section className="main-section" key={index}>
         <div className="hero-image" id={`hero-${collection.collection}`}> 
            <Link onClick={() => handleClick(collection.collection)} to="/collection">
                <div className="hero-content">
                    <h1>{collection.title},</h1>
                    <h2>{collection.description}</h2>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </Link>
         <div className="down-div" id="down-arrow"><i className="fa-solid fa-angle-down" alt="down arrow icon"></i></div>
        </div>
        </section>
        )})
     }
     </main>
    )
}

Collection.propTypes = {
  collections: PropTypes.array.isRequired, 
};

export default Collection