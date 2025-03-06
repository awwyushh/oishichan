// components/Categories.jsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="w-64 h-80 bg-gray-200 animate-pulse rounded-lg">
      <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
      <div className="p-4 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );

  // Card Variants for animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Meal Categories</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {loading ? (
            // Show skeleton loaders while fetching
            Array(8).fill(0).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            // Render actual categories
            categories.map((category) => (
              <motion.div
                key={category.idCategory}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative group overflow-hidden rounded-xl bg-white shadow-lg"
              >
                {/* Image */}
                <div className="relative w-full h-48">
                  <Image
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Shining border effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%]"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{category.strCategory}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {category.strCategoryDescription}
                  </p>
                </div>

                {/* Gradient overlay on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Categories;