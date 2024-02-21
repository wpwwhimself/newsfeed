import React from 'react';
import './App.css';
import { TopHeader } from './components/TopHeader';
import { ArticleList } from './components/ArticleList';
import { Pill } from './components/Pill';

function App() {
  return (
    <div className="App flex-down">
      <TopHeader label="NewsFeed" />
      <div className="main-wrapper">
        <div className="sidebar flex-down">
          <Pill>aaa</Pill>
        </div>
        <div className="main-content">
          <ArticleList />
        </div>
      </div>
    </div>
  );
}

export default App;
