import TypeComponent from "../components/TypeComponents";
// import productDetailComponents from "../components/productDetailComponents";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import LoginComponents from "../components/LoginComponents";
import SignupComponents from "../components/SignupComponents";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import MyOrder from "../pages/MyOrder/MyOrder";
import DetailOrderPage from "../pages/DetailOrderPage/DetailOrderPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/my-order',
        page: MyOrder,
        isShowHeader: true,
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true,
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,
    },
    {
        path: '/product/:type',
        page: TypeComponent,
        isShowHeader: true,
    },
    {
        path: '/details-order/:id',
        page: DetailOrderPage,
        isShowHeader: true
    },
    {
        path: '/sign-up',
        page: SignupComponents,
        isShowHeader: true,
    },
    {
        path: '/login',
        page: LoginComponents,
        isShowHeader: true,
    },
    {
        path: '/detailProduct/:id',
        page: ProductDetailsPage,
        isShowHeader: true,
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
];
