package ticket_management_system.MASI.ticket.model;

public enum Category {
    INNE("Inne"),
    KADRY("Problemy kadrowo-płacowe."),
    KONFLIKTY("Konflikty w pracy."),
    NADUŻYCIA("Zachowania niepożądane."),
    NARUSZENIA("Naruszenia etyki i prawa."),
    URLOP("Urlop.");

    private String description;

    Category(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
