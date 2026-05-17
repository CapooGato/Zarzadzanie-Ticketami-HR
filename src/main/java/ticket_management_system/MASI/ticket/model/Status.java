package ticket_management_system.MASI.ticket.model;

public enum Status {
    OCZEKUJĄCE("Zgłoszenie oczekuje na przyjęcie."),
    ODRZUCONE("Zgłoszenie zostało odrzucone."),
    TRWAJĄCE("Zgłoszenie jest w trackie rozstrzygania."),
    ZAMKNIĘTE("Zgłoszenie jest zamknięte.");

    private String description;

    Status(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
