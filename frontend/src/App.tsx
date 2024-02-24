import { createContext, useEffect, useState } from 'react';
import './App.css';
import './mobile.css';
import { TopHeader } from './components/TopHeader';
import { ArticleList } from './components/ArticleList';
import { PopUp } from './components/PopUp';
import { Button } from './components/Button';
import { ArticleProps, AuthData, FilterProps, PopUpProps, PopUpSwitchProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faList, faNewspaper, faSearch, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons';
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
  setArticleListVisible: (x: boolean) => {},
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
  const [authData, setAuthData] = useState({} as AuthData)

  useEffect(() => {
    rqGet("hellothere").then(res => console.debug(res.data))
    checkAuth()
  }, [])

  const checkAuth = () => {
    rqGet("me").then(res => {
      setAuthData(res.data == "" ? {} : res.data)
    })
  }

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
      setArticleListVisible,
      showArticle
    }}>

    <div className="App">
      <div className="main-wrapper flex-right">
        <div className={[
          `sidebar`,
          `flex-down`,
          articleListVisible && `open`,
        ].filter(Boolean).join(" ")}>
          <ArticleList />
        </div>
        <div className="main-content flex-down">
          <TopHeader
            level={1}
            label="NewsFeed"
            buttons={<>
              <Button icon={<FontAwesomeIcon icon={faSearch} />} highlighted={!!filters.keyword?.length} onClick={() => openPopUp({
                title: "Search by keyword",
                content: <SearchPanel />,
                icon: <FontAwesomeIcon icon={faSearch} />,
              })} />
              <Button icon={<FontAwesomeIcon icon={faFilter} />} highlighted={!!filters.dateFrom?.length || !!filters.dateTo?.length || !!filters.categories?.length || !!filters.sources?.length} onClick={() => openPopUp({
                title: "Filter articles",
                content: <FilterPanel />,
                icon: <FontAwesomeIcon icon={faFilter} />,
              })} />
              <Button icon={<FontAwesomeIcon icon={!authData?.name ? faUserAlt : faUser} />} highlighted={authData?.preferences?.length > 0} onClick={() => openPopUp({
                title: "User preferences",
                content: <UserPanel />,
                icon: <FontAwesomeIcon icon={faUser} />,
              })} />
              <div className="wide-hide">
                <Button icon={<FontAwesomeIcon icon={faList} />} highlighted={!article.title} onClick={toggleArticleList} />
              </div>
            </>}
            icon={<FontAwesomeIcon icon={faNewspaper} />}
          />
          <Article article={article} />
        </div>
      </div>
      <PopUp onClose={checkAuth} />
    </div>

    </ArticleContext.Provider>
    </FilterContext.Provider>
    </PopUpSwitchContext.Provider>
    </PopUpContext.Provider>
  );
}

export default App;
