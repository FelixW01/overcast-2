import { Link } from 'react-router-dom';
import './collection.css'
import PropTypes from 'prop-types';
import { Carousel, ConfigProvider } from 'antd';
import { useState, useEffect } from 'react';

function Collection({collections}) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isArrowHidden, setIsArrowHidden] = useState(false);

    function handleClick(id) {
        localStorage.setItem('collection', id)
    }

    const handleCarouselChange = (current, next) => {
    setActiveIndex(next);
   };
   
   // Hides down arrow as the content no longer becomes scrollable
   useEffect(() => {
    const mainContainer = document.querySelector('.main-container');
    const handleScroll = () => {
      // returns the number of pixels mainContainer has been scrolled vertically
      const scrollTop = mainContainer.scrollTop;
      // returns the total height of the content inside the container
      const scrollHeight = mainContainer.scrollHeight;
      // returns the height of visible portion of mainContainer
      const clientHeight = mainContainer.clientHeight;

      // scrollHeight should returns the height of the cotent inside the container, which gets subtracted by scrollTop and then, subtracted by clientHeight
      // If the scroll position is within 100px of the bottom, hide the arrow
      // The user won't need the arrow anymore to indicate scrolling since they are at the bottom of the page
      if (scrollHeight - scrollTop - clientHeight <= 100) { 
        setIsArrowHidden(true);
      } else {
        setIsArrowHidden(false);
      }
    };

    mainContainer.addEventListener('scroll', handleScroll);

    // Remove listener when it's no longer needed
    return () => {
      mainContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

    return(
      <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowSize: 40,
            dotPosition: 'bottom',
          },
        },
      }}
    >
    <main className="main-container">
    {/* Summer Collection */}
      <section className="main-section">
      <Carousel beforeChange={handleCarouselChange} autoplay={true} autoplaySpeed={8000} infinite={true}>
       {/* Slide 1 */}
      <div className="content-style">
         <div className="hero-image" id={`hero-${collections[0].collection + activeIndex}`}> 
            <Link onClick={() => handleClick(collections[0].collection)} to="/collection">
                <div className="hero-content">
                    <h1>{collections[0].title},</h1>
                    <h2>{collections[0].description}</h2>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </Link>
        </div>
      </div>
      {/* Slide 2 */}
      <div className="content-style">
      <div className="hero-image" id="hero-summer2"> 
            <Link onClick={() => handleClick(collections[0].collection)} to="/collection">
                <div className="hero-content">
                    <h1>{collections[0].title},</h1>
                    <h2>{collections[0].description}</h2>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </Link>
         </div>
      </div>
       {/* Slide 2 */}
      <div className="content-style">
         <div className="hero-image" id="hero-summer3"> 
            <Link onClick={() => handleClick(collections[0].collection)} to="/collection">
                <div className="hero-content">
                    <h1>{collections[0].title},</h1>
                    <h2>{collections[0].description}</h2>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </Link>
        </div>
      </div>
      </Carousel>
      </section>

      {/* Fall and Winter collection */}
        {collections.slice(1).map((collection, index) => (
        <section className="main-section" key={index}>
         <div className="hero-image" id={`hero-${collection.collection}`}> 
            <Link onClick={() => handleClick(collection.collection)} to="/collection">
                <div className="hero-content">
                    <h1>{collection.title},</h1>
                    <h2>{collection.description}</h2>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </Link>
         {!isArrowHidden && (
                <div className="down-div" id="down-arrow">
                  <i className="fa-solid fa-angle-down" alt="down arrow icon"></i>
                </div>
              )}
        </div>
        </section>
        ))}
    </main>
    </ConfigProvider>
  );
}

Collection.propTypes = {
  collections: PropTypes.array.isRequired, 
};

export default Collection