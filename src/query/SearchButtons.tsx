import './SearchButtons.css';
import { DropdownButton } from 'react-bootstrap';

export type Updater = { [key: string]: React.Dispatch<React.SetStateAction<string | null>> };
export type Stater = { [key: string]: string | null };

interface SearchButtonProps {
  simpleSearch: string[]
  searchStatus: string
  handleDropdownClick: (arg0: string) => void
  ReservedButton: () => JSX.Element
  handleSearch: () => void
  useRegex: boolean
  setUseRegex: Function
  setSearchFilterDefault: Function
  updaterMap: Updater
  staterMap: Stater
}

export default function SearchButtons(
  {
    simpleSearch, searchStatus, handleDropdownClick, ReservedButton,
    handleSearch, useRegex, setUseRegex, setSearchFilterDefault, updaterMap,
    staterMap
  }: SearchButtonProps) {
  function LocalDropdownButton() {
    return <><DropdownButton id="dropdown-basic-button" title={searchStatus} >
        {simpleSearch.map((item, index) => (
          <button key={index} className="dropdown-item" disabled={item === searchStatus} onClick={() => {handleDropdownClick(item)}}>
            {item}
          </button>
        ))}
        <hr className="dropdown-divider" />
        <button className="dropdown-item" disabled={searchStatus === '高级搜索'} onClick={() => {handleDropdownClick('高级搜索')}} >
          高级搜索
        </button>
      </DropdownButton>
      <ReservedButton /></>;
    // return <>
    //   <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    //     {searchStatus}
    //   </button>
    //   <ul className="dropdown-menu dropdown-menu-end">
    //     { simpleSearch.map((item, index) => (
    //       <li key={index}>
    //         <button className="dropdown-item" disabled={item === searchStatus} onClick={() => {handleDropdownClick(item)}}>
    //           {item}
    //         </button>
    //       </li>
    //     )) }
    //     <li><hr className="dropdown-divider" /></li>
    //     <li>
    //       <button className="dropdown-item" disabled={searchStatus === '高级搜索'} onClick={() => {handleDropdownClick('高级搜索')}} >
    //         高级搜索
    //       </button>
    //     </li>
    //     <ReservedButton />
    //   </ul>
    // </>;
  }

  function SimpleSearchButton() {
    return <button className="form-control search-button" onClick={handleSearch}>搜索</button>;
  }

  function SimpleSearch() {
    return <div className="input-group mb-3">
      <input
        onBlur={(event) => {
          setSearchFilterDefault();
          updaterMap[searchStatus](event.target.value);
          }}
        type="text"
        defaultValue={staterMap[searchStatus] || ''}
        className="form-control" aria-label="Text input with dropdown button" />
      <SimpleSearchButton />
      <LocalDropdownButton />
      </div> ;
  }

  function RegexDropdownButton() {
    // return <>
    //   <button id="dropdown-basic-button" className="btn btn-outline-secondary dropdown-toggle" type="button" aria-expanded="false">
    //     {!useRegex ? '普通' : '正则'}搜索
    //   </button>
    //   <ul className="dropdown-menu dropdown-menu-end">
    //     <li>
    //       <button className="dropdown-item" disabled={useRegex} onClick={() => {setUseRegex(true)}}>
    //         使用正则
    //       </button>
    //     </li>
    //     <li>
    //       <button className="dropdown-item" disabled={!useRegex} onClick={() => {setUseRegex(false)}}>
    //         不使用正则
    //       </button>
    //     </li>
    //   </ul>
    // </>;
    return <DropdownButton id="dropdown-regex-button" title={(!useRegex ? '普通' : '正则') + '搜索'} >
      <button className="dropdown-item" disabled={useRegex} onClick={() => {setUseRegex(true)}}>
        使用正则
      </button>
      <button className="dropdown-item" disabled={!useRegex} onClick={() => {setUseRegex(false)}}>
        不使用正则
      </button>
    </DropdownButton>
  }

  function FancySearch() {
    return <><div className="input-group mb-3">
      {simpleSearch.map((item, index) => (
      <div key={"fancysearch"+index} className="form-floating">
        <input
          onBlur={(event) => {updaterMap[item](event.target.value)}}
          type="text"
          id={"search-" + item}
          aria-label={"Search " + item}
          defaultValue={staterMap[item] || ''}
          className="form-control" />
        <label htmlFor={"search-" + item}>{item}</label>
      </div>
      ))}
      <SimpleSearchButton />
    </div>
    <RegexDropdownButton />
    <LocalDropdownButton />
    </>;
  }

  if (searchStatus === '高级搜索')
    return <FancySearch />;
  return <SimpleSearch />;
}
