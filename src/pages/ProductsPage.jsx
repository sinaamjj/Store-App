import { useEffect, useState } from "react";

import Card from "../components/Card";
import Loader from "../components/Loader";
import { useProducts } from "../context/ProductsContext";

import { ImSearch } from "react-icons/im";
import { FaListUl } from "react-icons/fa";

import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const products = useProducts();

  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const activeCategory = query.category ?? "all";

  const categories = [
    { label: "All", value: "all" },
    { label: "Electronics", value: "electronics" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
  ];

  useEffect(() => {
    let filtered = products;
    const { category, search } = query;

    if (category && category !== "all") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category
      );
    }

    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search)
      );
    }

    setDisplayed(filtered);
  }, [products, query]);

  const searchHandler = () => {
    setQuery((query) => ({ ...query, search }));
  };

  const categoryHandler = (category) => {
    setQuery((query) => ({ ...query, category }));
  };

  return (
    <>
      <div className={styles.searchBar}>
        <div className={styles.searchField}>
          <ImSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
          />
        </div>
        <button className={styles.searchButton} onClick={searchHandler}>
          Search
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <aside className={styles.sidebar}>
          <div className={styles.categoryHeader}>
            <FaListUl />
            <p>Categories</p>
          </div>
          <ul className={styles.categoryList}>
            {categories.map((category) => (
              <li key={category.value} className={styles.categoryItem}>
                <button
                  type="button"
                  className={`${styles.categoryButton} ${
                    activeCategory === category.value
                      ? styles.activeCategory
                      : ""
                  }`}
                  onClick={() => categoryHandler(category.value)}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}

export default ProductsPage;
