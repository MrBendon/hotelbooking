import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./page/Login";
import Applayout from "./ui/Applayout";
import Dashboard from "./page/Dashboard";
import GlobalStyles from "./styles/GlobalStyles";
import Bookings from "./page/Bookings";
import Rooms from "./page/Rooms";
import Settings from "./page/Settings";
import PageNotFound from "./page/PageNotFound";
import System from "./page/System";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactForm from "./features/settings/ContactForm";
import HousekeepingForm from "./features/settings/HousekeepingForm";
import OtherForm from "./features/settings/OtherForm";
import BookingDetails from "./features/bookings/BookingDetails";
import NewBooking from "./features/bookings/NewBooking";
import SystemInterface from "./features/system/SystemInterface";
import AccountSetting from "./features/system/AccountSetting";
import AccountsManage from "./features/system/AccountsManage";
import PortectedRoute from "./ui/PortectedRoute";

// import { useAuth } from "@supabase/ui";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

// function PrivateRoute({ element, path }) {
//   const auth = useAuth();

//   // 檢查使用者是否已登入
//   const isAuthenticated = auth.user() !== null;

//   return isAuthenticated ? element : <Navigate to="/login" replace />;
// }

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <ToastContainer autoClose={3000} closeOnClick />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PortectedRoute>
                <Applayout />
              </PortectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />}>
              <Route path=":bookingId" element={<BookingDetails />}></Route>
              <Route path="newbooking" element={<NewBooking />}></Route>
            </Route>
            <Route path="rooms" element={<Rooms />} />
            <Route path="settings" element={<Settings />}>
              <Route index element={<Navigate to="contact" replace />} />
              <Route path="contact" element={<ContactForm />} />
              <Route path="housekeeping" element={<HousekeepingForm />} />
              <Route path="other" element={<OtherForm />} />
            </Route>
            <Route path="system" element={<System />}>
              <Route index element={<Navigate to="systeminterface" replace />} />
              <Route path="systeminterface" element={<SystemInterface />} />
              <Route path="accountsetting" element={<AccountSetting />} />
              <Route path="accountsmanage" element={<AccountsManage />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
