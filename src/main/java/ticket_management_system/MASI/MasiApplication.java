package ticket_management_system.MASI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import ticket_management_system.MASI.ticket.model.entity.Category;
import ticket_management_system.MASI.ticket.model.entity.Status;
import ticket_management_system.MASI.ticket.model.entity.Ticket;
import ticket_management_system.MASI.ticket.repository.TicketRepository;

import java.time.LocalDateTime;

@SpringBootApplication
public class MasiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MasiApplication.class, args);
	}
}
