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
  <>
    {
    sideBarNames.map(name => {
      return (
      <div className="btn-group" role="main-side-bar" aria-label="just-main-sidebar">
        <button
        type="button"
        className={'btn btn-primary' + (onPage === name && ' active')}
        onClick={() => handleClick(name)}>
          {name}
        </button>
      </div>
      );
    })
    }
  </>
  );
}

export default SideBar;
