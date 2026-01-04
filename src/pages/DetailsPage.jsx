import { Link, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { useProducts } from "../context/ProductsContext";

import styles from "./DetailsPage.module.css";

function DetailsPage() {
  const { id } = useParams();
  const products = useProducts();

  if (!products.length) {
    return <Loader />;
  }

  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>Product not found.</p>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.content}>
        <h2>{product.title}</h2>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.meta}>
          <span className={styles.price}>{product.price} $</span>
          <Link to="/products" className={styles.backLink}>
            Back to products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
