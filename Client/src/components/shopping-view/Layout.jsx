import { Outlet } from 'react-router-dom';
import ShoppingHeader from './ShoppingHeader'

function ShoppingLayout() {
  return ( 
    <div>
      <ShoppingHeader />
      <main>
        <Outlet />
      </main>
    </div>
   );
}

export default ShoppingLayout;