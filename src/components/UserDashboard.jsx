import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('form');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const myTickets = [
    { id: 1, title: 'Wniosek o urlop wypoczynkowy', date: '24.10.2023 09:15', status: 'Oczekujące', adminComment: 'Czekamy na potwierdzenie od kierownika działu.' },
    { id: 2, title: 'Problem z dostępem do systemu', date: '23.10.2023 14:30', status: 'W trakcie', adminComment: 'Informatyk sprawdza Twoje uprawnienia w bazie danych.' },
    { id: 3, title: 'Zapotrzebowanie na nowy monitor', date: '20.10.2023 11:00', status: 'Zamknięte', adminComment: 'Monitor został dostarczony na Twoje stanowisko pracy.' },
    { id: 4, title: 'Prośba o dofinansowanie okularów', date: '15.10.2023 16:45', status: 'Odrzucone', adminComment: 'Brak załączonego aktualnego badania lekarskiego.' },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'Oczekujące': return 'pending';
      case 'W trakcie': return 'in-progress';
      case 'Zamknięte': return 'closed';
      case 'Odrzucone': return 'rejected';
      default: return '';
    }
  };

  return (
    <div className="dashboard-container">
      <header className="top-bar">
        <span>Jan Kowalski (Pracownik)</span>
        
        <div className="top-bar-actions">
          {currentView === 'form' ? (
            <button className="nav-btn" onClick={() => setCurrentView('list')}>
              Przeglądaj zgłoszenia
            </button>
          ) : (
            <button className="nav-btn" onClick={() => setCurrentView('form')}>
              Dodaj zgłoszenie
            </button>
          )}
          
          <button className="logout-btn" onClick={() => navigate('/')}>
            Wyloguj
          </button>
        </div>
      </header>

      <main className="content-area centered">
        
        {currentView === 'form' ? (
          <div className="form-card">
            <label>Kategoria:</label>
            <select className="input">
              <option>Urlop</option>
              <option>Zachowania niepożądane</option>
              <option>Problemy kadrowo-płacowe</option>
              <option>Naruszenia etyki i prawa</option>
              <option>Konflikty w pracy</option>
              <option>Inne</option>
            </select>

            <label>Temat zgłoszenia:</label>
            <input 
              type="text" 
              className="input" 
              placeholder="Wpisz krótki temat..." 
            />

            <textarea 
              className="text-area" 
              placeholder="Treść zgłoszenia..."
              style={{ marginTop: '5px' }}
            ></textarea>
            
            <button className="create-btn">Utwórz</button>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Twoje zgłoszenia</th>
                  <th className="date-col">Data złożenia</th>
                  <th className="status-col">Status</th>
                </tr>
              </thead>
              <tbody>
                {myTickets.map(ticket => (
                  <tr 
                    key={ticket.id} 
                    className="clickable-row" 
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <td>{ticket.title}</td>
                    <td className="date-cell">{ticket.date}</td>
                    <td className="status-cell">
                      <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Szczegóły zgłoszenia</h3>
            <p><strong>Temat:</strong> {selectedTicket.title}</p>
            <p><strong>Status:</strong> {selectedTicket.status}</p>
            <hr />
            <div className="admin-comment-section">
              <label>Komentarz administratora:</label>
              <p className="comment-text">{selectedTicket.adminComment}</p>
            </div>
            <button className="button" onClick={() => setSelectedTicket(null)}>Zamknij</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;