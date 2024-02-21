import { createContext, useState } from 'react';
import './App.css';
import { TopHeader } from './components/TopHeader';
import { ArticleList } from './components/ArticleList';
import { Pill } from './components/Pill';
import { PopUp } from './components/PopUp';
import { Button } from './components/Button';
import { PopUpProps, PopUpSwitchProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faNewspaper, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

export const PopUpContext = createContext({} as PopUpProps)
export const PopUpSwitchContext = createContext({ popUpVisible: false, setPopUpVisible: (x: boolean) => {}} as PopUpSwitchProps)

function App() {
  const [popUpContent, setPopUpContent] = useState({} as PopUpProps)
  const [popUpVisible, setPopUpVisible] = useState(false)

  const openSearchPopUp = () => {
    setPopUpContent({
      title: "Search by keyword",
      content: "aaa",
      icon: <FontAwesomeIcon icon={faSearch} />,
    })
    setPopUpVisible(true)
  }

  const openFilterPopUp = () => {
    setPopUpContent({
      title: "Filter articles",
      content: "aaa",
      icon: <FontAwesomeIcon icon={faFilter} />,
    })
    setPopUpVisible(true)
  }

  const openUserPopUp = () => {
    setPopUpContent({
      title: "User preferences",
      content: "aaa",
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
