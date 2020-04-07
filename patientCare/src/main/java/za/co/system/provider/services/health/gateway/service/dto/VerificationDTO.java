package za.co.system.provider.services.health.gateway.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link za.co.system.provider.services.health.gateway.domain.Verification} entity.
 */
public class VerificationDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String type;

    @NotNull
    private String details;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VerificationDTO verificationDTO = (VerificationDTO) o;
        if (verificationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), verificationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VerificationDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
