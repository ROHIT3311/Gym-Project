import { useSelector } from "react-redux";
import navDesign from "../../assets/Base.png";
import { useEffect, useState } from "react";
import { isAuthenticated as checkAuth } from "../../utils/isAuthenticated";

export default function SubNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuthentication = async () => {
      const result = await checkAuth();
      setIsAuthenticated(!!result);
    };
    checkAuthentication();
  }, []);
  return (
    <>
      <div className="relative">
        <img src={navDesign} alt="" className="h-[40px] sm:h-auto" />
        {!isAuthenticated ? (
          <p className="absolute top-1/2 left-0 pl-5 text-white transform -translate-y-1/2 font-semibold text-lg">
            Welcome
          </p>
        ) : (
          <p className="absolute top-1/2 left-0 pl-5 text-white transform -translate-y-1/2 font-semibold text-lg">
            {`Hello, ${user.user.firstName} ${user.user.lastName}`}
          </p>
        )}
      </div>
    </>
  );
}
