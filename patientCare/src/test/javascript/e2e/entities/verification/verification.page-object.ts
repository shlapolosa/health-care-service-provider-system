import { element, by, ElementFinder } from 'protractor';

export class VerificationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-verification div table .btn-danger'));
  title = element.all(by.css('jhi-verification div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class VerificationUpdatePage {
  pageTitle = element(by.id('jhi-verification-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  typeInput = element(by.id('field_type'));
  detailsInput = element(by.id('field_details'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTypeInput(type: string): Promise<void> {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput(): Promise<string> {
    return await this.typeInput.getAttribute('value');
  }

  async setDetailsInput(details: string): Promise<void> {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput(): Promise<string> {
    return await this.detailsInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class VerificationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-verification-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-verification'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
