package ticket_management_system.MASI.ticket;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import ticket_management_system.MASI.ticket.dto.PatchTicketDto;
import ticket_management_system.MASI.ticket.exceptions.TicketNotFoundException;
import ticket_management_system.MASI.ticket.model.Status;
import ticket_management_system.MASI.ticket.model.Ticket;
import ticket_management_system.MASI.ticket.repository.TicketRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository repository;

    public TicketService(TicketRepository repository) {
        this.repository = repository;
    }

    public Ticket saveTicket(@RequestBody Ticket ticket){
        ticket.setCreatedAt(LocalDateTime.now());
        return repository.save(ticket);
    }

    public Ticket getById(Long id){
        return repository.findById(id).orElseThrow(() -> new TicketNotFoundException(id));
    }

    @Transactional
    public Ticket patchTicket(Long ticketId, PatchTicketDto patchTicketDto){
        Ticket ticket = getById(ticketId);
        ticket.setHrComment(patchTicketDto.getHrComment());
        ticket.setStatus(patchTicketDto.getStatus());
        return repository.save(ticket);
    }

    @Transactional
    public Ticket patchHrComment(Long ticketId, String hrComment){
        Ticket ticket = getById(ticketId);
        ticket.setHrComment(hrComment);
        return repository.save(ticket);
    }

    @Transactional
    public Ticket patchStatus(Long ticketId, Status status){
        Ticket ticket = getById(ticketId);
        ticket.setStatus(status);
        return repository.save(ticket);
    }
}
