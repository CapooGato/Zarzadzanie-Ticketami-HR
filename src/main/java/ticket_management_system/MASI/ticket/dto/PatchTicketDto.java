package ticket_management_system.MASI.ticket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ticket_management_system.MASI.ticket.model.Status;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatchTicketDto {
    private String hrComment;
    private Status status;
}
