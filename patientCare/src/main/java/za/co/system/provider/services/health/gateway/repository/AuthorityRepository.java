package za.co.system.provider.services.health.gateway.repository;

import za.co.system.provider.services.health.gateway.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
