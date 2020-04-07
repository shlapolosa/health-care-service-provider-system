package za.co.system.provider.services.health.service.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Verification.
 */
@Entity
@Table(name = "verification")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Verification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "type", nullable = false)
    private String type;

    @NotNull
    @Column(name = "details", nullable = false)
    private String details;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Verification type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDetails() {
        return details;
    }

    public Verification details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Verification)) {
            return false;
        }
        return id != null && id.equals(((Verification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Verification{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
