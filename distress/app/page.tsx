import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import CategoryShowcase from './components/CategoryShowcase';
import FlashDeals from './components/FlashDeals';
import PromoBanner from './components/PromoBanner';
import TrendingProducts from './components/TrendingProducts';
import ProductsSection from './components/ProductsSection';
import Newsletter from './components/Newsletter';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <CategoryShowcase />
      <FlashDeals />
      <PromoBanner />
      <TrendingProducts />
      <ProductsSection />
      <Newsletter />
    </div>
  );
}
