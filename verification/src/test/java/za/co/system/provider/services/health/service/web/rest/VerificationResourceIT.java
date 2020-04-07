package za.co.system.provider.services.health.service.web.rest;

import za.co.system.provider.services.health.service.VerificationApp;
import za.co.system.provider.services.health.service.config.TestSecurityConfiguration;
import za.co.system.provider.services.health.service.domain.Verification;
import za.co.system.provider.services.health.service.repository.VerificationRepository;
import za.co.system.provider.services.health.service.service.VerificationService;
import za.co.system.provider.services.health.service.service.dto.VerificationDTO;
import za.co.system.provider.services.health.service.service.mapper.VerificationMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VerificationResource} REST controller.
 */
@SpringBootTest(classes = { VerificationApp.class, TestSecurityConfiguration.class })

@AutoConfigureMockMvc
@WithMockUser
public class VerificationResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    @Autowired
    private VerificationRepository verificationRepository;

    @Autowired
    private VerificationMapper verificationMapper;

    @Autowired
    private VerificationService verificationService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVerificationMockMvc;

    private Verification verification;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Verification createEntity(EntityManager em) {
        Verification verification = new Verification()
            .type(DEFAULT_TYPE)
            .details(DEFAULT_DETAILS);
        return verification;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Verification createUpdatedEntity(EntityManager em) {
        Verification verification = new Verification()
            .type(UPDATED_TYPE)
            .details(UPDATED_DETAILS);
        return verification;
    }

    @BeforeEach
    public void initTest() {
        verification = createEntity(em);
    }

    @Test
    @Transactional
    public void createVerification() throws Exception {
        int databaseSizeBeforeCreate = verificationRepository.findAll().size();

        // Create the Verification
        VerificationDTO verificationDTO = verificationMapper.toDto(verification);
        restVerificationMockMvc.perform(post("/api/verifications").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verificationDTO)))
            .andExpect(status().isCreated());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeCreate + 1);
        Verification testVerification = verificationList.get(verificationList.size() - 1);
        assertThat(testVerification.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testVerification.getDetails()).isEqualTo(DEFAULT_DETAILS);
    }

    @Test
    @Transactional
    public void createVerificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = verificationRepository.findAll().size();

        // Create the Verification with an existing ID
        verification.setId(1L);
        VerificationDTO verificationDTO = verificationMapper.toDto(verification);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVerificationMockMvc.perform(post("/api/verifications").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verificationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = verificationRepository.findAll().size();
        // set the field null
        verification.setType(null);

        // Create the Verification, which fails.
        VerificationDTO verificationDTO = verificationMapper.toDto(verification);

        restVerificationMockMvc.perform(post("/api/verifications").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verificationDTO)))
            .andExpect(status().isBadRequest());

        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDetailsIsRequired() throws Exception {
        int databaseSizeBeforeTest = verificationRepository.findAll().size();
        // set the field null
        verification.setDetails(null);

        // Create the Verification, which fails.
        VerificationDTO verificationDTO = verificationMapper.toDto(verification);

        restVerificationMockMvc.perform(post("/api/verifications").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verificationDTO)))
            .andExpect(status().isBadRequest());

        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVerifications() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        // Get all the verificationList
        restVerificationMockMvc.perform(get("/api/verifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(verification.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)));
    }
    
    @Test
    @Transactional
    public void getVerification() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        // Get the verification
        restVerificationMockMvc.perform(get("/api/verifications/{id}", verification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(verification.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS));
    }

    @Test
    @Transactional
    public void getNonExistingVerification() throws Exception {
        // Get the verification
        restVerificationMockMvc.perform(get("/api/verifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVerification() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        int databaseSizeBeforeUpdate = verificationRepository.findAll().size();

        // Update the verification
        Verification updatedVerification = verificationRepository.findById(verification.getId()).get();
        // Disconnect from session so that the updates on updatedVerification are not directly saved in db
        em.detach(updatedVerification);
        updatedVerification
            .type(UPDATED_TYPE)
            .details(UPDATED_DETAILS);
        VerificationDTO verificationDTO = verificationMapper.toDto(updatedVerification);

        restVerificationMockMvc.perform(put("/api/verifications").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verificationDTO)))
            .andExpect(status().isOk());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeUpdate);
        Verification testVerification = verificationList.get(verificationList.size() - 1);
        assertThat(testVerification.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testVerification.getDetails()).isEqualTo(UPDATED_DETAILS);
    }

    @Test
    @Transactional
    public void updateNonExistingVerification() throws Exception {
        int databaseSizeBeforeUpdate = verificationRepository.findAll().size();

        // Create the Verification
        VerificationDTO verificationDTO = verificationMapper.toDto(verification);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVerificationMockMvc.perform(put("/api/verifications").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verificationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVerification() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        int databaseSizeBeforeDelete = verificationRepository.findAll().size();

        // Delete the verification
        restVerificationMockMvc.perform(delete("/api/verifications/{id}", verification.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
