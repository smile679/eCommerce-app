import { Outlet } from 'react-router-dom';
import ShoppingHeader from './ShoppingHeader'
import Footer from './Footer';

function ShoppingLayout() {
  return ( 
    <div className='relative'>
      <ShoppingHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
   );
}

export default ShoppingLayout;