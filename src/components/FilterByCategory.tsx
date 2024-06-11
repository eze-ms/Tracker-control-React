import { useBudget } from '../hooks/useBudget';
import { categories } from './data/category';

export default function FilterByCategory() {
    const { dispatch, state } = useBudget();

    const handleCategoryClick = (category: string) => {
        dispatch({ type: 'add-filter-category', payload: { id: category } });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div>
                    <p className="text-gray-600 text-2xl font-bold my-5">Filtrar Gastos</p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleCategoryClick('')}
                            className={` bg-slate-100 font-size-1 p-3 rounded flex-1 ${state.currentCategory === '' ? 'bg-blue-500 text-white' : ''}`}
                            style={{ minWidth: '150px' }}  // Ajusta el valor de minWidth según tus necesidades
                        >
                            Todos
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={`bg-slate-100 p-3 rounded flex-1 ${state.currentCategory === category.id ? 'bg-blue-500 text-white' : ''}`}
                                style={{ minWidth: '150px' }}  // Ajusta el valor de minWidth según tus necesidades
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
