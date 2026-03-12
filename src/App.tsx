import { useState, type ChangeEvent, type FormEvent } from 'react';

interface IItem {
   id: number;
   title: string;
   description: string;
   photo: string;
}
type TNewItem = Omit<IItem, 'id'>;

type TSortOrder = 'asc' | 'desc';

const App = () => {
   const [items, setItems] = useState<IItem[]>([]);
   const [newItem, setNewItem] = useState<TNewItem>({ title: '', description: '', photo: '' });
   const [sortOrder, setSortOrder] = useState<TSortOrder>('asc');

   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setNewItem(prev => ({ ...prev, [name]: value }));
   };

   const addItem = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!newItem.title.trim()) return;

      const item: IItem = {
         id: Date.now(),
         ...newItem,
      };

      setItems([...items, item]);
      setNewItem({ title: '', description: '', photo: '' });
   };

   const removeItem = (id: number) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
   };

   const sortedItems = [...items].sort((a, b) => {
      if (sortOrder === 'asc') {
         return a.title.localeCompare(b.title);
      } 
      else {
         return b.title.localeCompare(a.title);
      }
   });

   return (
      <div className="container mt-5">
         <h1 className="text-center mb-4">Моя коллекция</h1>
         <div className="row justify-content-center">
         <div className="col-md-8">
            <form onSubmit={addItem} className="mb-4">
               <div className="mb-3">
                  <input
                     type="text"
                     className="form-control"
                     name="title"
                     value={newItem.title}
                     onChange={handleInputChange}
                     placeholder="Название"
                     required
                  />
               </div>
               <div className="mb-3">
                  <textarea
                     className="form-control"
                     name="description"
                     value={newItem.description}
                     onChange={handleInputChange}
                     placeholder="Описание"
                     rows={2}
                  />
               </div>
               <div className="mb-3">
                  <input
                     type="url"
                     className="form-control"
                     name="photo"
                     value={newItem.photo}
                     onChange={handleInputChange}
                     placeholder="URL фото (необязательно)"
                  />
               </div>
               <button type="submit" className="btn btn-primary w-100">
                  Добавить
               </button>
            </form>
         </div>
         </div>

         <div className="row mb-3">
            <div className="col-md-4">
               <label className="form-label">Сортировать по названию:</label>
               <select
                  className="form-select"
                  value={sortOrder}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortOrder(e.target.value as TSortOrder)}
               >
                  <option value="asc">А-Я</option>
                  <option value="desc">Я-А</option>
               </select>
            </div>
         </div>

         <div className="row">
            {sortedItems.length === 0 ? (
               <p className="text-center">Коллекция пуста, добавьте первый элемент</p>
            ) : (
               sortedItems.map(item => (
                  <div key={item.id} className="col-md-4 mb-3">
                     <div className="card h-100">
                        {item.photo && (
                           <img
                              src={item.photo}
                              className="card-img-top"
                              alt={item.title}
                              style={{ height: '200px', objectFit: 'cover' }}
                              onError={(e) => e.currentTarget.style.display = 'none'}
                           />
                        )}
                        <div className="card-body">
                           <h5 className="card-title">{item.title}</h5>
                           <p className="card-text">{item.description || '—'}</p>
                           <button
                              onClick={() => removeItem(item.id)}
                              className="btn btn-sm btn-danger"
                           >
                              Удалить
                           </button>
                        </div>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
}

export default App;