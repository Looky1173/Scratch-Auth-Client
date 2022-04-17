import Header from '../Header';
import Footer from '../Footer';

function Layout({ children, ...props }) {
    return (
        <>
            <Header {...props} />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;
