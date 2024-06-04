import BaseConfigSheet from "./base-config.mjs";

/**
 * A simple form to configure Actor senses.
 */
export default class ActorSensesConfig extends BaseConfigSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["aafo"],
      template: "systems/aafo/templates/apps/senses-config.hbs",
      width: 300,
      height: "auto",
      keyPath: "system.attributes.senses"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `${game.i18n.localize("AAFO.SensesConfig")}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options) {
    const source = this.document.toObject();
    const senses = foundry.utils.getProperty(source, this.options.keyPath) ?? {};
    const raceData = this.document.system.details?.race?.system?.senses ?? {};
    return foundry.utils.mergeObject(super.getData(options), {
      senses: Object.entries(CONFIG.AAFO.senses).reduce((obj, [k, label]) => {
        obj[k] = { label, value: senses[k], placeholder: raceData[k] ?? 0 };
        return obj;
      }, {}),
      special: senses.special ?? "",
      units: senses.units, movementUnits: CONFIG.AAFO.movementUnits,
      unitsPlaceholder: game.i18n.format("AAFO.AutomaticValue", {
        value: CONFIG.AAFO.movementUnits[raceData.units ?? Object.keys(CONFIG.AAFO.movementUnits)[0]]?.toLowerCase()
      }),
      keyPath: this.options.keyPath
    });
  }
}
