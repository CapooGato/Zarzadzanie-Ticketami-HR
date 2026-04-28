package ticket_management_system.MASI.ticket.model.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ticket_management_system.MASI.ticket.model.entity.Ticket;
import ticket_management_system.MASI.ticket.repository.TicketRepository;

import java.util.Optional;

@RestController
public class TicketController {

    private final TicketRepository repository;

    @Autowired
    public TicketController(TicketRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/add")
    public Ticket save(@RequestBody Ticket ticket){
        return repository.save(ticket);
    }

    @GetMapping("/get/{id}")
    public Optional<Ticket> get(@PathVariable("id") Long id){
        return repository.findById(id);
    }
}
