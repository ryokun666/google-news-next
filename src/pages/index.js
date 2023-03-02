import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/News.module.css";

const News = () => {
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("us");
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=68ad059b799d401b83fef24e593b8986`
      );
      const data = await res.json();
      setNews(data.articles);
    };
    fetchNews();
  }, [category, country]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </label>
        <label>
          Country:
          <select value={country} onChange={handleCountryChange}>
            <option value="us">US</option>
            <option value="ca">Canada</option>
            <option value="jp">Japan</option>
            <option value="gb">UK</option>
            <option value="au">Australia</option>
          </select>
        </label>
      </div>
      <div className={styles.cardContainer}>
        {news.map((article, index) => (
          <div key={index} className={styles.card}>
            <Link href={article.url} prefetch>
                <img src={article.urlToImage} className={styles.image} />
                <div className={styles.content}>
                  <h3 className={styles.title}>{article.title}</h3>
                  <p className={styles.description}>{article.description}</p>
                </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
