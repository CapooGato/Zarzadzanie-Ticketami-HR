package ticket_management_system.MASI.ticket.exceptions;

public class TicketNotFoundException extends RuntimeException {
    public TicketNotFoundException(Long id) {
        super("Ticket with id: " + id +" not found.");
    }
}
