import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VerificationComponentsPage, VerificationDeleteDialog, VerificationUpdatePage } from './verification.page-object';

const expect = chai.expect;

describe('Verification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let verificationComponentsPage: VerificationComponentsPage;
  let verificationUpdatePage: VerificationUpdatePage;
  let verificationDeleteDialog: VerificationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Verifications', async () => {
    await navBarPage.goToEntity('verification');
    verificationComponentsPage = new VerificationComponentsPage();
    await browser.wait(ec.visibilityOf(verificationComponentsPage.title), 5000);
    expect(await verificationComponentsPage.getTitle()).to.eq('patientCareApp.verification.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(verificationComponentsPage.entities), ec.visibilityOf(verificationComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Verification page', async () => {
    await verificationComponentsPage.clickOnCreateButton();
    verificationUpdatePage = new VerificationUpdatePage();
    expect(await verificationUpdatePage.getPageTitle()).to.eq('patientCareApp.verification.home.createOrEditLabel');
    await verificationUpdatePage.cancel();
  });

  it('should create and save Verifications', async () => {
    const nbButtonsBeforeCreate = await verificationComponentsPage.countDeleteButtons();

    await verificationComponentsPage.clickOnCreateButton();

    await promise.all([verificationUpdatePage.setTypeInput('type'), verificationUpdatePage.setDetailsInput('details')]);

    expect(await verificationUpdatePage.getTypeInput()).to.eq('type', 'Expected Type value to be equals to type');
    expect(await verificationUpdatePage.getDetailsInput()).to.eq('details', 'Expected Details value to be equals to details');

    await verificationUpdatePage.save();
    expect(await verificationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await verificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Verification', async () => {
    const nbButtonsBeforeDelete = await verificationComponentsPage.countDeleteButtons();
    await verificationComponentsPage.clickOnLastDeleteButton();

    verificationDeleteDialog = new VerificationDeleteDialog();
    expect(await verificationDeleteDialog.getDialogTitle()).to.eq('patientCareApp.verification.delete.question');
    await verificationDeleteDialog.clickOnConfirmButton();

    expect(await verificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
