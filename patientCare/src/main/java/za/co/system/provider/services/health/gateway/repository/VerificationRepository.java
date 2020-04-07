package za.co.system.provider.services.health.gateway.repository;

import za.co.system.provider.services.health.gateway.domain.Verification;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Verification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VerificationRepository extends JpaRepository<Verification, Long> {
}
