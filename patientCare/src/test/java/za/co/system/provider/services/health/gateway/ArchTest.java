package za.co.system.provider.services.health.gateway;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("za.co.system.provider.services.health.gateway");

        noClasses()
            .that()
                .resideInAnyPackage("za.co.system.provider.services.health.gateway.service..")
            .or()
                .resideInAnyPackage("za.co.system.provider.services.health.gateway.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..za.co.system.provider.services.health.gateway.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
