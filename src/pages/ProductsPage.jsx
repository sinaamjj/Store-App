import Card from "../components/Card";
import { useProducts } from "../context/ProductsContext";

import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const products = useProducts();
  console.log(products);
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {!products.length && <h1>LOADING ....</h1>}
        {products.map((p) => (
          <Card key={p.id} data={p} />
        ))}
      </div>
      <div>SideBar</div>
    </div>
  );
}

export default ProductsPage;
