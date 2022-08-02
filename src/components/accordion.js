class Accordion {
  constructor(el, options) {
    this.acc = el;
    this.id = Math.random().toString(36).substring(2, 16);
    this.options = options || {};
    this.buttons = [...this.acc.querySelectorAll(".accordion-btn")];
    this.panels = [...this.acc.querySelectorAll(".accordion-panel")];
    this.addMetaData();
    this.attachEventListeners();
  }

  addMetaData() {
    this.buttons.forEach((btn, index) => {
      btn.id = `btn-${this.id}-${index}`;
      btn.setAttribute("aria-expanded", "false");

      // DONE -- make the first one expand by` default
      if (this.options.firstExpanded && index === 0) {
        btn.setAttribute('aria-expanded', true);
        btn.classList.add('active');
      }

      btn.setAttribute("aria-controls", `panel-${this.id}-${index}`);
    });
    this.panels.forEach((panel, index) => {
      panel.id = `panel-${this.id}-${index}`;
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-labelledby", `btn-${this.id}-${index}`);
      panel.setAttribute("hidden", "true");

      // DONE: add option for the first one to be expanded
      if (this.options.firstExpanded && index === 0) {
        panel.removeAttribute('hidden');
      }
    });
  }

  attachEventListeners() {
    // click events
    this.acc.addEventListener("click", (e) => {
      if (!e.target.classList.contains("accordion-btn")) return;

      const isExpanded = e.target.getAttribute("aria-expanded") == "true";
      const index = this.buttons.findIndex((btn) => btn.id === e.target.id);

      // DONE: options for one panel only
      if (this.options.onePanelOnly) {
        this.panels.forEach((panel) => {
          panel.setAttribute('hidden', 'true');
        })
        this.buttons.forEach((btn) => {
          btn.setAttribute('aria-expanded', 'false');
          btn.classList.remove('active')
        })
      }

      if (isExpanded) {
        e.target.setAttribute("aria-expanded", "false");
        this.panels[index].setAttribute("hidden", "true");
        e.target.classList.remove('active');
      }
      if (!isExpanded) {
        e.target.setAttribute("aria-expanded", "true");
        this.panels[index].removeAttribute("hidden");
        e.target.classList.add('active');
      }
    });

    // keyboard events
    this.acc.addEventListener("keydown", (e) => {
      if (!e.target.classList.contains("accordion-btn")) return;

      const index = this.buttons.findIndex((btn) => btn.id === e.target.id);

      switch (e.key) {
        case "Home":
          e.preventDefault();
          this.buttons[0].focus();
          break;
        case "End":
          e.preventDefault();
          this.buttons[this.buttons.length - 1].focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          if (index === 0) {
            this.buttons[this.buttons.length - 1].focus();
          } else {
            this.buttons[index - 1].focus();
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (index === this.buttons.length - 1) {
            this.buttons[0].focus();
          } else {
            this.buttons[index + 1].focus();
          }
          break;
        default:
          break;
      }
    });
  }
}

export default function createAccordion(el, options) {
  document.querySelectorAll(el).forEach((accordion) => {
    new Accordion(accordion, options);
  });
}
