import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function App() {
  const [livros, setLivros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [novoLivro, setNovoLivro] = useState({ titulo: '', autor: '', categoria: '' });
  const [editando, setEditando] = useState(null);

  const fetchLivros = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/livros?categoria=${filtro}`);
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  }, [filtro]);

  useEffect(() => {
    fetchLivros();
  }, [fetchLivros]);

  const adicionarLivro = async () => {
    if (!novoLivro.titulo || !novoLivro.autor || !novoLivro.categoria) {
      alert('Preencha todos os campos!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/livros', novoLivro);
      setLivros([...livros, response.data]);
      setNovoLivro({ titulo: '', autor: '', categoria: '' });
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  const editarLivro = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/livros/${id}`, editando);
      setLivros(livros.map(livro => (livro.id === id ? response.data : livro)));
      setEditando(null);
    } catch (error) {
      console.error('Erro ao editar livro:', error);
    }
  };

  const deletarLivro = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este livro?')) {
      try {
        await axios.delete(`http://localhost:5000/api/livros/${id}`);
        setLivros(livros.filter(livro => livro.id !== id));
      } catch (error) {
        console.error('Erro ao deletar livro:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            📚 Gerenciador de Livros
          </h1>
          <p className="mt-2 text-gray-600">Organize sua biblioteca pessoal</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtro */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🔍 Filtrar por Categoria
          </label>
          <input
            type="text"
            placeholder="Digite a categoria..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Formulário de Adicionar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">➕ Adicionar Novo Livro</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              placeholder="Título do livro"
              value={novoLivro.titulo}
              onChange={(e) => setNovoLivro({...novoLivro, titulo: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              placeholder="Autor"
              value={novoLivro.autor}
              onChange={(e) => setNovoLivro({...novoLivro, autor: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              placeholder="Categoria"
              value={novoLivro.categoria}
              onChange={(e) => setNovoLivro({...novoLivro, categoria: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={adicionarLivro}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Adicionar Livro
          </button>
        </div>

        {/* Lista de Livros */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 Meus Livros ({livros.length})</h2>
          {livros.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">Nenhum livro encontrado. Adicione um livro acima!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {livros.map(livro => (
                <div key={livro.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                  {editando?.id === livro.id ? (
                    <div className="space-y-3">
                      <input
                        value={editando.titulo}
                        onChange={(e) => setEditando({...editando, titulo: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        value={editando.autor}
                        onChange={(e) => setEditando({...editando, autor: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        value={editando.categoria}
                        onChange={(e) => setEditando({...editando, categoria: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => editarLivro(livro.id)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          ✓ Salvar
                        </button>
                        <button
                          onClick={() => setEditando(null)}
                          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          ✕ Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{livro.titulo}</h3>
                        <p className="text-gray-600 mb-1">✍️ <span className="font-semibold">Autor:</span> {livro.autor}</p>
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                          {livro.categoria}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => setEditando(livro)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => deletarLivro(livro.id)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          🗑️ Deletar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Feito com ❤️ usando React e Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
