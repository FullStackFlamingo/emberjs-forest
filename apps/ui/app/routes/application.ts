import Route from "@ember/routing/route";
import { type Registry as Services, service } from "@ember/service";
import translationsForEn from "virtual:ember-intl/translations/en";

export default class ApplicationRoute extends Route {
  @service declare intl: Services["intl"];

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
    this.intl.addTranslations("en", translationsForEn);
    this.intl.setLocale(["en"]);
  }
}
