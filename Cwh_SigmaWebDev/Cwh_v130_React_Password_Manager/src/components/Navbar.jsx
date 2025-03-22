const NavBar = () => {
  return (
    <div>
      <header className="h-14 bg-black flex w-full items-center justify-between">
        <h2 className="text-white text-end w-full text-3xl font-extrabold px-52">
          Password-Manager
        </h2>
        <nav className="w-1/2">
          <ul className=" w-full h-14 flex justify-end items-center px-24 gap-40">
            <li>
              <a className="cursor-pointer">
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                </svg>
              </a>
            </li>

            <li>
              <a className="cursor-pointer">
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  fill="white"
                >
                  <path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
