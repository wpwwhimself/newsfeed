import { createContext, useEffect, useState } from 'react';
import './App.css';
import { TopHeader } from './components/TopHeader';
import { ArticleList } from './components/ArticleList';
import { PopUp } from './components/PopUp';
import { Button } from './components/Button';
import { ArticleProps, FilterProps, PopUpProps, PopUpSwitchProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faList, faNewspaper, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserPanel } from './components/UserPanel';
import { SearchPanel } from './components/SearchPanel';
import { FilterPanel } from './components/FilterPanel';
import { rqGet } from './helpers/fetch';
import { Article } from './components/Article';

export const PopUpContext = createContext({} as PopUpProps)
export const PopUpSwitchContext = createContext({ popUpVisible: false, setPopUpVisible: (x: boolean) => {}} as PopUpSwitchProps)
export const FilterContext = createContext({ filters: {} as FilterProps, setFilters: (x: FilterProps) => {}})
export const ArticleContext = createContext({
  currentCategories: [] as string[],
  currentSources: [] as string[],
  setCurrentCategories: (x: string[]) => {},
  setCurrentSources: (x: string[]) => {},
  showArticle: (x: ArticleProps) => {},
})

function App() {
  const [popUpContent, setPopUpContent] = useState({} as PopUpProps)
  const [popUpVisible, setPopUpVisible] = useState(false)
  const [filters, setFilters] = useState({} as FilterProps)
  const [article, setArticle] = useState({} as ArticleProps)
  const [currentCategories, setCurrentCategories] = useState<string[]>([])
  const [currentSources, setCurrentSources] = useState<string[]>([])
  const [articleListVisible, setArticleListVisible] = useState(false)

  useEffect(() => {
    rqGet("hellothere").then(res => console.debug(res.data))
  }, [])

  const openPopUp = (popUpContent: PopUpProps) => {
    setPopUpContent(popUpContent)
    setPopUpVisible(true)
  }

  const toggleArticleList = () => {
    setArticleListVisible(!articleListVisible)
  }

  const showArticle = (article: ArticleProps) => {
    setArticle(article)
    setArticleListVisible(false)
  }

  return (
    <PopUpContext.Provider value={popUpContent}>
    <PopUpSwitchContext.Provider value={{ popUpVisible, setPopUpVisible }}>
    <FilterContext.Provider value={{ filters, setFilters }}>
    <ArticleContext.Provider value={{
      currentCategories,
      currentSources,
      setCurrentCategories,
      setCurrentSources,
      showArticle
    }}>

    <div className="App">
      <div className="main-wrapper flex-right">
        <div className={[
          `sidebar`,
          `flex-down`,
          articleListVisible && `open`,
        ].filter(Boolean).join(" ")}>
          <ArticleList setArticleListVisible={setArticleListVisible} />
        </div>
        <div className="main-content flex-down">
          <TopHeader
            level={1}
            label="NewsFeed"
            buttons={<>
              <Button icon={<FontAwesomeIcon icon={faSearch} />} onClick={() => openPopUp({
                title: "Search by keyword",
                content: <SearchPanel />,
                icon: <FontAwesomeIcon icon={faSearch} />,
              })} />
              <Button icon={<FontAwesomeIcon icon={faFilter} />} onClick={() => openPopUp({
                title: "Filter articles",
                content: <FilterPanel />,
                icon: <FontAwesomeIcon icon={faFilter} />,
              })} />
              <Button icon={<FontAwesomeIcon icon={faUser} />} onClick={() => openPopUp({
                title: "User preferences",
                content: <UserPanel />,
                icon: <FontAwesomeIcon icon={faUser} />,
              })} />
              <Button icon={<FontAwesomeIcon icon={faList} />} onClick={toggleArticleList} />
            </>}
            icon={<FontAwesomeIcon icon={faNewspaper} />}
          />
          <Article article={article} />
        </div>
      </div>
      <PopUp />
    </div>

    </ArticleContext.Provider>
    </FilterContext.Provider>
    </PopUpSwitchContext.Provider>
    </PopUpContext.Provider>
  );
}

export default App;
