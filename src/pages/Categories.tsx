import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { categories } from '@/data/mockData';

const Categories = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Категории
          </h1>
          <p className="text-muted-foreground">Выберите категорию и найдите именно то, что вам нужно</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate(`/listings?category=${cat.id}`)}
              className="group p-6 rounded-2xl border border-border/60 bg-white text-left hover:shadow-lg transition-all card-hover"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-4xl shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {cat.name}
              </h3>
              <p className="text-muted-foreground text-sm">{cat.count.toLocaleString()} объявлений</p>
            </button>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-3xl gradient-bg text-center">
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Не нашли нужную категорию?
          </h2>
          <p className="text-white/80 mb-4">Воспользуйтесь поиском — мы найдём то, что вам нужно</p>
          <button
            onClick={() => navigate('/search')}
            className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-lg"
          >
            Открыть поиск
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
