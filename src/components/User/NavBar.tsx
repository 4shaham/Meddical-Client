import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../Redux/store/store";
import { logOut } from "../../api/user";
import { logout } from "../../Redux/slice/userAuthSlice";

interface navItems {
  link: string;
  path: string;
}

function NavBar() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state: RootState) => state.user.userStatus);

  // nav items

  const navItem: navItems[] = [
    { link: "", path: "Services" },
    { link: "", path: "About Us" },
    { link: "", path: "Contact Us" },
    { link: "/doctors", path: "Doctors" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoout = async () => {
    try {
      const response = await logOut();
      if (response.data.status == true) {
        dispatch(logout());
      }
    } catch (error) {}
  };

  return (
    <header className="bg-bgColors w-full ">
      <nav className="p-10">
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-black text-4xl font-extrabold">
              <Link to={"/"}>
                <div className="flex items-center">
                  <div>
                    <p>ME<span className="text-blue-400">D</span></p>
                  </div>
                  <div>
                    <p className="relative flex items-center rotate-180 text-red-600">D</p>
                  </div>
                  <div>
                    <p>ICAL</p>
                  </div>
                </div>
              </Link>
            </h1>
          </div>

          <ul className="hidden md:flex gap-x-16">
            {navItem.map((values, index) => (
              <Link to={values.path}>
                <li
                  className="mx-auto text-black text-lg font-medium"
                  key={index}
                >
                  {values.path}
                </li>
              </Link>
            ))}
          </ul>

          <div>
            {userStatus ? (
              <button
                className="md:bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={handleLogoout}
              >
                Logout
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="md:bg-btnColor text-white py-2 px-4 rounded-lg">
                  Sign In
                </button>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <button className="text-black" onClick={toogleMenu}>
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}

        {isMenuOpen ? (
          <ul className="block my-2 bg-serviceColors rounded-md p-2 ">
            {navItem.map((values) => (
              <li className="mx-auto text-black text-lg font-medium">
                {values.path}
              </li>
            ))}
          </ul>
        ) : null}
      </nav>
    </header>
  );
}

export default NavBar;
