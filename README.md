# 📰 NewsFeed

## 🔧 Installation
1. Create your own `.env` file out of `.env.example` found in the root folder.
2. Build and run containers with `docker-compose up -d`.

## ⭐ What it can do
This test app retrieves news articles from different sources and lists them in one comprehensible list.
- querying - searching articles by keyword
- filtering - showing articles based on date, category and source
- user preferences - after creating an account, you can add your own filters based on categories, authors and sources you like

## 📦 Data sources used
- [NewsAPI](https://newsapi.org/)
- [The Guardian](https://open-platform.theguardian.com/access/)
- [New York Times](https://developer.nytimes.com/docs/articlesearch-product/1/overview)

This list can be easily extended via modifications in `ArticleController`'s `obtain()` functions.
