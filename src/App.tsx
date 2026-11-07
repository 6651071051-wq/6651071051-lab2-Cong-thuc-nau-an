import { Route, Routes } from 'react-router-dom';
import FavoritesProvider from './components/FavoritesProvider';
import Header from './components/Header';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

export default function App() {
  return (
    <FavoritesProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/item/:id" element={<DetailPage />} />
      </Routes>
      <footer className="mx-auto max-w-6xl px-4 pb-8 text-sm text-stone-600">Ảnh món ăn: Wikipedia / Wikimedia Commons (giấy phép Creative Commons).</footer>
    </FavoritesProvider>
  );
}
