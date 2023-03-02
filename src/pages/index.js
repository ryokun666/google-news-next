import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/News.module.css";

export default function Home() {
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("jp");
  const [articles, setArticles] = useState([]);

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleClick = async () => {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );
    const data = await res.json();
    setArticles(data.articles);
  };

  return (
    <div className={styles.container}>
      <h1>Google News</h1>
      <div>
        <select value={category} onChange={handleChangeCategory}>
          <option value="general">総合</option>
          <option value="business">ビジネス</option>
          <option value="entertainment">エンタメ</option>
          <option value="health">健康</option>
          <option value="science">科学</option>
          <option value="sports">スポーツ</option>
          <option value="technology">テクノロジー</option>
        </select>
        <select value={country} onChange={handleChangeCountry}>
          <option value="jp">日本</option>
          <option value="us">アメリカ</option>
          <option value="gb">イギリス</option>
          <option value="au">オーストラリア</option>
          <option value="ca">カナダ</option>
          <option value="fr">フランス</option>
          <option value="de">ドイツ</option>
        </select>
        <button onClick={handleClick}>表示</button>
      </div>
      <div className={styles.articles}>
        {articles.map((article) => (
          <article className={styles.list} key={article.url}>
            <Link
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.article}>
                <div className={styles.imageWrapper}></div>
                <div className={styles.contentWrapper}>
                  <p className={styles.title}>{article.title}</p>
                  <p className={styles.description}>{article.description}</p>
                  <p className={styles.source}>{article.source.name}</p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
