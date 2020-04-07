package za.co.system.provider.services.health.service.service.mapper;


import za.co.system.provider.services.health.service.domain.*;
import za.co.system.provider.services.health.service.service.dto.VerificationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Verification} and its DTO {@link VerificationDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface VerificationMapper extends EntityMapper<VerificationDTO, Verification> {



    default Verification fromId(Long id) {
        if (id == null) {
            return null;
        }
        Verification verification = new Verification();
        verification.setId(id);
        return verification;
    }
}
