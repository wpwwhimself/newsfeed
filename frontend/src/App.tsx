import React from 'react';
import './App.css';
import { TopHeader } from './components/TopHeader';
import { ArticleList } from './components/ArticleList';

function App() {
  return (
    <div className="App flex-down">
      <TopHeader label="NewsFeed" />
      <ArticleList />
    </div>
  );
}

export default App;
