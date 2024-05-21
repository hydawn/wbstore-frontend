interface Props {
  onPage: string,
  setOnPage: Function,
  sideBarNames: string[],
}

function SideBar({ onPage, setOnPage, sideBarNames }: Props) {

  function handleClick(clickPage: string) {
    setOnPage(clickPage);
  }

  console.log(`side bar sees: [${onPage}]`)

  return (
    <div className="d-flex flex-column vh-100 p-3 bg-light">
    {
    sideBarNames.map((name, index) => {
      return (
      <div className="btn-group" role="main-side-bar" aria-label="just-main-sidebar">
        <button
        key={index}
        type="button"
        className={'btn btn-primary' + (onPage === name && ' active')}
        onClick={() => handleClick(name)}>
          {name}
        </button>
      </div>
      );
    })
    }
  </div>
  );
}

export default SideBar;
