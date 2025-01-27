import { ArrowsAltOutlined, PlusOutlined} from '@ant-design/icons';
import { Card, Tag } from 'antd';
const { Meta } = Card;
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import './productsCard.css'

function ProductsCard({products}) {
  
  const handleLinkClick = (link) => {
    window.open(link, '_blank');
  };

  function handleAddItem() {
    toast.success('Item added to cart,\nCart is not implemented yet')
  };

  return (
    <div id="product-div">
      {products !== undefined ? 
      products.map((product) => {
        return(
      <Card style={{ width: 300, }}
        key={product.id}
        className="product-card"
        cover={
      <img
        alt={`${product.alt}`}
        src={`${product.src}`}
      />
    }
    actions={[
      <PlusOutlined  key="add" onClick={() => handleAddItem()} />,
      <ArrowsAltOutlined  key="link" onClick={() => handleLinkClick(product.link)}/>,
    ]}
  >
  <Tag color="green" style={{ marginTop: '10px' }}>
    ${product.price}
  </Tag>

    <Meta
      title={`${product.name}`}
      body={`${product.price}`}
      description={`${product.description}`}
      link={product.link}

    />
  </Card>
      )}) : null}
  </div>
  )
}

ProductsCard.propTypes = {
  products: PropTypes.array.isRequired, 
};

export default ProductsCard;