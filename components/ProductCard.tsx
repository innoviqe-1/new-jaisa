
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
      <div 
        className="relative aspect-[4/3] cursor-pointer overflow-hidden"
        onClick={() => onClick(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
          {product.condition.toUpperCase()}
        </div>
        <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">
          {discount}% OFF
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs font-semibold text-blue-600 mb-1">{product.brand}</div>
        <h3 
          className="font-bold text-slate-800 mb-2 truncate cursor-pointer hover:text-blue-600 transition"
          onClick={() => onClick(product)}
        >
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-black text-slate-900">₹{product.price.toLocaleString()}</span>
          <span className="text-xs text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4 h-12 overflow-hidden">
          {product.specs.processor && (
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{product.specs.processor}</span>
          )}
          {product.specs.ram && (
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{product.specs.ram}</span>
          )}
          {product.specs.storage && (
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{product.specs.storage}</span>
          )}
        </div>

        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
