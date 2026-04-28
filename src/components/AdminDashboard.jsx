import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  //Przykładowe zgłoszenia
  const [tickets, setTickets] = useState([
    { id: 1, author: 'Jan Kowalski', date: '24.10.2023 09:15', category: 'Urlop', title: 'Wniosek o urlop wypoczynkowy', content: 'Proszę o zaakceptowanie mojego urlopu w dniach 01.11 - 10.11.', status: 'Oczekujące'},
    { id: 2, author: 'Anna Nowak', date: '23.10.2023 14:30', category: 'Wsparcie IT', title: 'Problem z dostępem do systemu', content: 'Po wczorajszej aktualizacji nie mogę zalogować się do systemu wewnętrznego.', status: 'W trakcie'},
    { id: 3, author: 'Piotr Wiśniewski', date: '20.10.2023 11:00', category: 'Inne', title: 'Zapotrzebowanie na nowy monitor', content: 'Mój obecny monitor śnieży, proszę o wymianę.', status: 'Zamknięte'},
    { id: 4, author: 'Katarzyna Lewandowska', date: '15.10.2023 16:45', category: 'Pytanie o benefity', title: 'Prośba o dofinansowanie okularów', content: 'Przesyłam skan faktury za nowe okulary do komputera.', status: 'Odrzucone'},
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editComment, setEditComment] = useState('');

  const getStatusClass = (status) => {
    switch(status) {
      case 'Oczekujące': return 'pending';
      case 'W trakcie': return 'in-progress';
      case 'Zamknięte': return 'closed';
      case 'Odrzucone': return 'rejected';
      default: return '';
    }
  };

  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
    setEditStatus(ticket.status);
    setEditComment(ticket.adminComment || '');
  };

  const handleSave = () => {
    const updatedTickets = tickets.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, status: editStatus, adminComment: editComment }
        : t
    );
    setTickets(updatedTickets);
    setSelectedTicket(null);
  };

  return (
    <div className="dashboard-container">
      <header className="top-bar">
        <span>Anna Nowak (HR Admin)</span>
        <button className="logout-btn" onClick={() => navigate('/')}>Wyloguj</button>
      </header>

      <main className="content-area centered">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Zgłaszający</th>
                <th>Temat zgłoszenia</th>
                <th className="status-col">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr 
                  key={ticket.id} 
                  className="clickable-row"
                  onClick={() => handleRowClick(ticket)}
                >
                  <td><strong>{ticket.author}</strong></td>
                  <td>{ticket.title}</td>
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
      </main>

      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <h3>Zarządzaj zgłoszeniem</h3>
            
            <div className="ticket-info">
              <p><strong>Od kogo:</strong> {selectedTicket.author}</p>
              <p><strong>Data utworzenia:</strong> {selectedTicket.date}</p>
              <p><strong>Kategoria:</strong> {selectedTicket.category}</p>
              <p><strong>Temat:</strong> {selectedTicket.title}</p>
            </div>

            <div className="modal-form-group">
              <label>Treść zgłoszenia:</label>
              <textarea 
                className="text-area readonly-area" 
                readOnly 
                value={selectedTicket.content}
              ></textarea>
            </div>

            <hr />

            <div className="modal-form-group">
              <label>Zmień status:</label>
              <select 
                className="input" 
                value={editStatus} 
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option>Oczekujące</option>
                <option>W trakcie</option>
                <option>Zamknięte</option>
                <option>Odrzucone</option>
              </select>
            </div>

            <div className="modal-form-group">
              <label>Komentarz HR:</label>
              <textarea 
                className="text-area" 
                placeholder="Wpisz odpowiedź lub komentarz do zgłoszenia..."
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              ></textarea>
            </div>

            <div className="modal-actions">
              <button className="logout-btn" onClick={() => setSelectedTicket(null)}>Anuluj</button>
              <button className="create-btn" onClick={handleSave} style={{ marginTop: '0' }}>Zatwierdź</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;