import { useState } from "react";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("technology");
  const [country, setCountry] = useState("us");
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  const getNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if (!data) {
    <div>ニュースが取得できませんでした！</div>  
    }
    setArticles(data.articles);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getNews();
  };

  return (
    <div>
      <h1>ニュース</h1>
      <form onSubmit={handleFormSubmit}>
        <select value={category} onChange={handleCategoryChange}>
          <option value="technology">テクノロジー</option>
          <option value="business">ビジネス</option>
          <option value="entertainment">エンターテイメント</option>
          <option value="health">健康</option>
          <option value="science">科学</option>
          <option value="sports">スポーツ</option>
        </select>
        <select value={country} onChange={handleCountryChange}>
          <option value="us">アメリカ</option>
          <option value="jp">日本</option>
          <option value="gb">イギリス</option>
          <option value="ca">カナダ</option>
          <option value="au">オーストラリア</option>
        </select>
        <button type="submit">更新</button>
      </form>
      {articles.map((article) => (
        <div key={article.url}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            続きを読む
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
