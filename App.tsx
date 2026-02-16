
import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductCarousel from './components/ProductCarousel';
import { Page, Product, CartItem } from './types';
import { PRODUCTS, CATEGORIES, TRUST_SIGNALS } from './constants';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [advisorInput, setAdvisorInput] = useState('');
  const [advisorResponse, setAdvisorResponse] = useState('');
  const [isAdvisorLoading, setIsAdvisorLoading] = useState(false);

  // Persistence (mock)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedProduct]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleAdvisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorInput.trim()) return;
    setIsAdvisorLoading(true);
    setAdvisorResponse('');
    const resp = await geminiService.getRecommendation(advisorInput, PRODUCTS);
    setAdvisorResponse(resp);
    setIsAdvisorLoading(false);
  };

  const renderHome = () => (
    <>
      <Hero 
        onShopNow={() => setCurrentPage('shop')} 
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* Stats Section - New requested addition */}
      <section className="relative z-20 -mt-12 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-slate-100">
          <div className="text-center md:px-4">
            <div className="text-2xl md:text-3xl font-black text-blue-900 mb-1">210,010 +</div>
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Products Sold</div>
          </div>
          <div className="text-center md:px-4">
            <div className="text-2xl md:text-3xl font-black text-blue-900 mb-1">20,000 +</div>
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Pincodes Delivered</div>
          </div>
          <div className="text-center md:px-4">
            <div className="text-2xl md:text-3xl font-black text-green-600 mb-1">466.561 Kt</div>
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">CO2 Reduced</div>
          </div>
          <div className="text-center md:px-4">
            <div className="flex justify-center items-center gap-2 text-2xl md:text-3xl font-black text-slate-900 mb-1">
              4.4 <span className="text-yellow-400 text-xl">★</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">
              Google Rating <br className="hidden md:block"/><span className="text-slate-400 font-medium">(4.2K Reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-slate-50 pt-16 pb-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto hide-scrollbar flex justify-between gap-8 sm:px-6 lg:px-8">
          {CATEGORIES.map(cat => (
            <div key={cat.name} className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl group-hover:bg-blue-50 group-hover:scale-110 transition shadow-sm border border-slate-100">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter group-hover:text-blue-900">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_SIGNALS.map(signal => (
            <div key={signal.title} className="flex flex-col items-center text-center p-4 rounded-xl border border-slate-50 hover:border-blue-100 transition">
              <div className="text-3xl mb-2">{signal.icon}</div>
              <div className="font-bold text-slate-800 text-sm">{signal.title}</div>
              <div className="text-xs text-slate-400 mt-1">{signal.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Best Sellers</h2>
            <p className="text-slate-500 mt-1">Our most popular refurbished professional gear.</p>
          </div>
          <button 
            onClick={() => setCurrentPage('shop')}
            className="text-blue-600 font-bold hover:underline"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
              onClick={(p) => {
                setSelectedProduct(p);
                setCurrentPage('product-detail');
              }}
            />
          ))}
        </div>
      </section>

      {/* Brand Partners */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">AUTHORIZED BRANDS WE RENEW</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition duration-500">
            <span className="text-3xl font-black">DELL</span>
            <span className="text-3xl font-black italic underline">HP</span>
            <span className="text-3xl font-black">LENOVO</span>
            <span className="text-3xl font-black tracking-tighter">APPLE</span>
            <span className="text-3xl font-black italic">Logitech</span>
          </div>
        </div>
      </section>
    </>
  );

  const renderShop = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">Categories</h4>
              <div className="space-y-2">
                {CATEGORIES.map(c => (
                  <label key={c.name} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-blue-600">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    {c.name}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">Condition</h4>
              <div className="space-y-2">
                {['Excellent', 'Good', 'Fair'].map(c => (
                  <label key={c} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-blue-600">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    {c}
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="text-xs font-bold text-blue-600 uppercase mb-2">Sustainability</div>
              <p className="text-[10px] text-blue-800 leading-relaxed">Buying refurbished saves ~20kg of e-waste and 100kg of CO2 per device.</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="text-sm font-medium text-slate-500">Showing <span className="text-slate-900 font-bold">{PRODUCTS.length}</span> results</div>
            <select className="text-sm border-none focus:ring-0 bg-transparent font-bold text-slate-700">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
                onClick={(p) => {
                  setSelectedProduct(p);
                  setCurrentPage('product-detail');
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductDetail = () => {
    if (!selectedProduct) return <div>Product not found</div>;
    const p = selectedProduct;
    // Fallback to single image array if images not defined
    const carouselImages = p.images && p.images.length > 0 ? p.images : [p.image];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Functional Carousel */}
          <ProductCarousel images={carouselImages} />

          {/* Info */}
          <div className="flex flex-col">
            <nav className="flex text-xs font-bold uppercase tracking-wider text-slate-400 gap-2 mb-4">
              <button onClick={() => setCurrentPage('home')}>Home</button>
              <span>/</span>
              <button onClick={() => setCurrentPage('shop')}>{p.category}</button>
            </nav>
            <h1 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{p.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">CONDITION: {p.condition.toUpperCase()}</div>
              <div className="flex text-yellow-400">★★★★☆ <span className="text-slate-400 text-xs ml-2">(128 Reviews)</span></div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-black text-blue-900">₹{p.price.toLocaleString()}</span>
                <span className="text-lg text-slate-400 line-through">₹{p.originalPrice.toLocaleString()}</span>
                <span className="text-green-600 font-bold text-sm">Save ₹{(p.originalPrice - p.price).toLocaleString()}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Inclusive of all taxes + FREE shipping in India.</p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Key Specifications</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(p.specs).map(([key, value]) => (
                    <div key={key} className="bg-white border border-slate-100 p-3 rounded-xl">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">{key}</div>
                      <div className="text-sm font-bold text-slate-800">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <button 
                onClick={() => addToCart(p)}
                className="flex-grow bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-600/20"
              >
                Buy Now
              </button>
              <button className="w-16 h-16 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-black text-slate-900 mb-10">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Cart is empty</h2>
          <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
          <button 
            onClick={() => setCurrentPage('shop')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex gap-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm items-center">
                <img src={item.image} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-grow">
                  <h3 className="font-bold text-slate-900">{item.name}</h3>
                  <div className="text-xs text-blue-600 font-bold mb-2">{item.condition.toUpperCase()}</div>
                  <div className="flex justify-between items-center">
                    <div className="font-black">₹{item.price.toLocaleString()}</div>
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button className="px-3 py-1 bg-slate-50 hover:bg-slate-100">-</button>
                      <span className="px-4 text-sm font-bold">{item.quantity}</span>
                      <button className="px-3 py-1 bg-slate-50 hover:bg-slate-100">+</button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-fit space-y-6">
            <h3 className="font-black text-xl">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-xs">FREE</span>
              </div>
              <div className="flex justify-between text-slate-500 border-t border-slate-100 pt-3">
                <span className="text-lg font-black text-slate-900">Total</span>
                <span className="text-lg font-black text-slate-900">₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-900 transition">
              Checkout Now
            </button>
            <div className="flex flex-col gap-2 pt-4">
              <div className="text-[10px] text-slate-400 text-center font-bold">SECURE PAYMENT PARTNERS</div>
              <div className="flex justify-center gap-4 opacity-50 text-xs font-black">
                <span>RAZORPAY</span>
                <span>STRIPE</span>
                <span>VISA</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSell = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full font-bold text-xs mb-6 uppercase tracking-widest">Buyback Program</div>
      <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Sell Your Old Laptop. <br/>Get Instant Cash.</h1>
      <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">Get the best price for your pre-owned devices. Fast, transparent, and eco-friendly buyback process.</p>
      
      <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-2xl relative">
        <div className="grid md:grid-cols-2 gap-8 text-left mb-10">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Device Brand</label>
            <select className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold text-slate-700">
              <option>Dell</option>
              <option>HP</option>
              <option>Lenovo</option>
              <option>Apple</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Approximate Age</label>
            <select className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold text-slate-700">
              <option>Less than 1 year</option>
              <option>1-3 years</option>
              <option>3-5 years</option>
              <option>More than 5 years</option>
            </select>
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition">
          Calculate Price →
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-20">
        {[
          { icon: '📝', title: 'Enter Details', desc: 'Tell us about your device model and condition.' },
          { icon: '💰', title: 'Instant Quote', desc: 'Get a real-time price based on market value.' },
          { icon: '🚚', title: 'Doorstep Pickup', desc: 'We pick it up for free and pay you instantly.' },
        ].map(step => (
          <div key={step.title} className="p-6 rounded-2xl bg-white border border-slate-100">
            <div className="text-4xl mb-4">{step.icon}</div>
            <div className="font-bold text-slate-900 mb-2">{step.title}</div>
            <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)}
    >
      {currentPage === 'home' && renderHome()}
      {currentPage === 'shop' && renderShop()}
      {currentPage === 'product-detail' && renderProductDetail()}
      {currentPage === 'cart' && renderCart()}
      {currentPage === 'sell' && renderSell()}

      {/* AI Advisor Modal */}
      {isAdvisorOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="font-black text-lg">NewJaisa AI Advisor</h3>
                  <p className="text-xs text-blue-100">Finding you the perfect tech match</p>
                </div>
              </div>
              <button onClick={() => setIsAdvisorOpen(false)} className="hover:bg-blue-500 rounded-full p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-grow bg-slate-50">
              {!advisorResponse && !isAdvisorLoading && (
                <div className="text-center py-10">
                  <p className="text-slate-600 font-medium mb-4">What are you looking for today?</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Laptop for coding', 'Under ₹20,000', 'Lightweight for travel', 'Best for office work'].map(q => (
                      <button 
                        key={q} 
                        onClick={() => setAdvisorInput(q)}
                        className="text-xs bg-white border border-slate-200 px-3 py-2 rounded-full hover:border-blue-500 hover:text-blue-600 transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isAdvisorLoading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-500 font-bold animate-pulse">Consulting technical data...</p>
                </div>
              )}

              {advisorResponse && (
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed bg-white p-6 rounded-2xl border border-slate-200 shadow-inner">
                  <div className="flex gap-2 text-blue-600 font-black mb-4 items-center">
                    <span className="text-xl">✨</span> Recommendation
                  </div>
                  <div className="whitespace-pre-wrap">{advisorResponse}</div>
                  <button 
                    onClick={() => { setAdvisorResponse(''); setAdvisorInput(''); }}
                    className="mt-6 text-xs font-bold text-blue-600 hover:underline"
                  >
                    ← Ask another question
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border-t border-slate-100">
              <form onSubmit={handleAdvisorSubmit} className="flex gap-2">
                <input 
                  type="text" 
                  value={advisorInput}
                  onChange={(e) => setAdvisorInput(e.target.value)}
                  placeholder="e.g. I need a laptop for video editing under 50k" 
                  className="flex-grow bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600"
                />
                <button 
                  type="submit"
                  disabled={isAdvisorLoading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50"
                >
                  Ask
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
