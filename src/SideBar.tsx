interface Props {
  onPage: string,
  setOnPage: Function,
  sideBarNames: string[],
}

function SideBar({ onPage, setOnPage, sideBarNames }: Props) {
  type stringStater = { [key: string]: string };
  const nameMaps: stringStater = {
    'home': '主页',
    'books': '书籍',
    'add books': '添加书籍',
    'shopping cart': '购物车',
    'orders': '订单'
  };

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
          {nameMaps[name]}
        </button>
      </div>
      );
    })
    }
  </div>
  );
}

export default SideBar;
