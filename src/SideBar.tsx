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
    sideBarNames.map((name, index) => {
      return (
        <button
        key={index}
        className={'sidebar-button' + (onPage === name && ' sidebar-button-active')}
        onClick={() => handleClick(name)}>
          {name}
        </button>
      );
    })
    }
  </>
  );
}

export default SideBar;
