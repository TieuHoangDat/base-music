import {useEffect} from "react";
// import Home from "@pages/Home";
import Home from "./pages/Home";
import {IRootState} from "@redux/store";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound/clientNotFound";
import HomeLayout from "./layout/user/HomeLayout";
import "./styles/global.scss";
import "./styles/style.scss";
import {updateUserInfo} from "@redux/slices/UserSlice";
import ApiAuth from "@api/ApiAuth";
import {useQueryClient} from "@tanstack/react-query";
function App() {
  const dispatch = useDispatch();
  // const {accessToken} = useSelector(
  //   (state: IRootState) => state.user,
  // );
  // const {language} = useSelector((state: IRootState) => state.settings);
  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   queryClient.invalidateQueries({type: "active"});
  // }, [accessToken, language]);

  // useEffect(() => {
  //   if (accessToken) {
  //     ApiAuth.getMe().then((res) => {
  //       dispatch(updateUserInfo({accessToken, userInfo: res}));
  //     });
  //   }
  // }, [accessToken]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="*" element={<NotFound />} />
            <Route
              element={
                <HomeLayout>
                  <Outlet />
                </HomeLayout>
              }
            >
              <Route path="/" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        draggable
        pauseOnFocusLoss
        autoClose={3000}
        hideProgressBar
        newestOnTop
        pauseOnHover
      />
    </>
  );
}

export default App;
