import { createContext, useEffect, useState } from 'react';
import './App.css';
import { TopHeader } from './components/TopHeader';
import { ArticleList } from './components/ArticleList';
import { Pill } from './components/Pill';
import { PopUp } from './components/PopUp';
import { Button } from './components/Button';
import { PopUpProps, PopUpSwitchProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faNewspaper, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserPanel } from './components/UserPanel';
import { SearchPanel } from './components/SearchPanel';
import { FilterPanel } from './components/FilterPanel';
import { rqGet } from './helpers/fetch';

export const PopUpContext = createContext({} as PopUpProps)
export const PopUpSwitchContext = createContext({ popUpVisible: false, setPopUpVisible: (x: boolean) => {}} as PopUpSwitchProps)

function App() {
  const [popUpContent, setPopUpContent] = useState({} as PopUpProps)
  const [popUpVisible, setPopUpVisible] = useState(false)

  useEffect(() => {
    rqGet("hellothere").then(res => console.debug(res))
  }, [])

  const openSearchPopUp = () => {
    setPopUpContent({
      title: "Search by keyword",
      content: <SearchPanel />,
      icon: <FontAwesomeIcon icon={faSearch} />,
    })
    setPopUpVisible(true)
  }

  const openFilterPopUp = () => {
    setPopUpContent({
      title: "Filter articles",
      content: <FilterPanel />,
      icon: <FontAwesomeIcon icon={faFilter} />,
    })
    setPopUpVisible(true)
  }

  const openUserPopUp = () => {
    setPopUpContent({
      title: "User preferences",
      content: <UserPanel />,
      icon: <FontAwesomeIcon icon={faUser} />,
    })
    setPopUpVisible(true)
  }

  return (
    <PopUpContext.Provider value={popUpContent}>
    <PopUpSwitchContext.Provider value={{ popUpVisible, setPopUpVisible }}>

    <div className="App flex-down">
      <TopHeader
        level={1}
        label="NewsFeed"
        buttons={<>
          <Button icon={<FontAwesomeIcon icon={faSearch} />} onClick={openSearchPopUp}/>
          <Button icon={<FontAwesomeIcon icon={faFilter} />} onClick={openFilterPopUp}/>
          <Button icon={<FontAwesomeIcon icon={faUser} />} onClick={openUserPopUp}/>
        </>}
        icon={<FontAwesomeIcon icon={faNewspaper} />}
      />
      <div className="main-wrapper">
        <div className="sidebar flex-down">
          <Pill>aaa</Pill>
        </div>
        <div className="main-content">
          <ArticleList />
        </div>
      </div>
      <PopUp />
    </div>

    </PopUpSwitchContext.Provider>
    </PopUpContext.Provider>
  );
}

export default App;
