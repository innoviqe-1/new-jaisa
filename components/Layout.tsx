
import React from 'react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage, cartCount }) => {
  const buyMenuData = [
    {
      title: 'Laptop',
      items: ['Lenovo Laptops', 'HP Laptops', 'Acer ChromeBook', 'Dell Laptops', 'Microsoft Laptops']
    },
    {
      title: 'Desktop',
      items: ['Lenovo Desktops', 'HP Desktops', 'Acer Desktops', 'Dell Desktops', 'Asus Desktops']
    },
    {
      title: 'Mini PC',
      items: ['HP Mini PC', 'Acer Mini PC', 'Asus Mini PC', 'Dell Mini PC', 'Lenovo Mini PC']
    },
    {
      title: 'Monitor',
      items: ['Dell Monitors', 'HP Monitors', 'Lenovo Monitors', 'Lapcare Monitors']
    },
    {
      title: 'Gaming Laptop',
      items: [
        'Lenovo ThinkPad P52', 'Lenovo ThinkPad P52s', 'Lenovo ThinkPad P51s', 'Lenovo ThinkPad P50',
        'HP ZBook 17', 'HP ZBook 15', 'Lenovo IdeaPad Gaming 3', 'Dell Precision 7520'
      ]
    },
    {
      title: 'All in One Set',
      items: [
        'Acer All in One Set', 'Asus All in One Set', 'Lenovo All in One Desktop Computer Set',
        'HP All in One Desktop Computer Set', 'Dell All in One Desktop Computer Set'
      ]
    },
    {
      title: 'Find by Usage',
      items: [
        'Accounting', 'Best Gaming Laptops', 'Coding/Data Analytics', 'Pre/Mid School',
        'Trading', 'Video/Graphics Designing'
      ]
    },
    {
      title: 'Others',
      items: ['Top Selling Products']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
        <div className="bg-blue-900 text-white text-xs py-1 text-center font-medium">
          PRE-RAMADAN SALE: UP TO 70% OFF ON RENEWED MACBOOKS!
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              <div className="text-2xl font-black text-blue-900 flex items-center gap-1">
                <span className="bg-blue-900 text-white px-2 py-0.5 rounded">NJ</span>
                <span className="tracking-tight">NEWJAISA<span className="text-blue-500 italic">PRO</span></span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600 uppercase tracking-wider h-full">
              <button onClick={() => setCurrentPage('shop')} className="hover:text-blue-900 transition h-full">Shop</button>
              
              {/* Buy Mega Menu Trigger */}
              <div className="relative group h-full flex items-center">
                <button className="hover:text-blue-900 transition flex items-center gap-1 group-hover:text-blue-900 h-full">
                  Buy
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[850px] bg-white shadow-2xl rounded-b-2xl border-x border-b border-slate-100 p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="grid grid-cols-4 gap-8">
                    {buyMenuData.map((section) => (
                      <div key={section.title}>
                        <h4 className="text-blue-900 font-black text-xs mb-4 border-b border-slate-100 pb-2">{section.title}</h4>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item}>
                              <button 
                                onClick={() => {
                                  setCurrentPage('shop');
                                  // In a real app, this would filter by category
                                }}
                                className="text-slate-500 hover:text-blue-600 text-[11px] font-medium transition text-left block w-full capitalize"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button className="hover:text-blue-900 transition h-full">Bulk Orders</button>
              <button className="hover:text-blue-900 transition h-full">Warranty</button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search Laptops..." 
                  className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48"
                />
              </div>
              <button 
                onClick={() => setCurrentPage('cart')}
                className="relative p-2 text-slate-600 hover:text-blue-900 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2 text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-black text-white mb-6">NEWJAISA</div>
            <p className="text-sm leading-relaxed mb-6">
              NewJaisa is India's leading refurbished electronics brand. We make premium technology affordable for everyone, with zero compromise on quality.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">FB</div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">IG</div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">LN</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white transition">All Laptops</button></li>
              <li><button className="hover:text-white transition">Bulk Purchases</button></li>
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white transition">Buy Certified Renewed</button></li>
              <li><button className="hover:text-white transition">Sustainability Impact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Policy</h4>
            <ul className="space-y-4 text-sm">
              <li><button className="hover:text-white transition">Return Policy</button></li>
              <li><button className="hover:text-white transition">Warranty Terms</button></li>
              <li><button className="hover:text-white transition">Privacy Policy</button></li>
              <li><button className="hover:text-white transition">Terms of Service</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to get special offers and once-in-a-lifetime deals.</p>
            <div className="flex">
              <input type="email" placeholder="Email Address" className="bg-slate-800 border-none rounded-l px-4 py-2 w-full text-sm focus:ring-1 focus:ring-blue-500" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r font-bold hover:bg-blue-700 transition">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2024 NewJaisa Pro. All Rights Reserved. Certified Refurbished.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
