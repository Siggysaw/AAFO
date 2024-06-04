/**
 * Journal entry page that displays a controls for editing rule page tooltip & type.
 */
export default class JournalRulePageSheet extends JournalTextPageSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.classes.push("rule");
    return options;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get template() {
    return this.isEditable
      ? "systems/aafo/templates/journal/page-rule-edit.hbs"
      : "templates/journal/page-text-view.html";
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async getData(options) {
    const context = await super.getData(options);
    context.CONFIG = CONFIG.AAFO;
    context.enrichedTooltip = await TextEditor.enrichHTML(this.object.system.tooltip, {
      relativeTo: this.object,
      secrets: this.object.isOwner,
      async: true
    });
    return context;
  }
}
