const coffeeData = [
  {
    name: "Flat White",
    cn: "澳白",
    type: "milk",
    category: "Milk Coffee",
    caffeine: "Medium",
    caffeineValue: 62,
    ratio: "1:2.5",
    origin: "Australia / New Zealand",
    flavors: ["nutty", "chocolate", "smooth"],
    time: "Morning",
    summary: "浓缩感比拿铁更明显，奶泡更薄，入口顺滑但咖啡味清楚。",
  },
  {
    name: "Latte",
    cn: "拿铁",
    type: "milk",
    category: "Milk Coffee",
    caffeine: "Medium",
    caffeineValue: 55,
    ratio: "1:4",
    origin: "Italy",
    flavors: ["milky", "soft", "caramel"],
    time: "Anytime",
    summary: "牛奶比例更高，整体温和，适合想要低苦感和奶香的人。",
  },
  {
    name: "Cappuccino",
    cn: "卡布奇诺",
    type: "milk",
    category: "Milk Coffee",
    caffeine: "Medium",
    caffeineValue: 58,
    ratio: "1:2:2",
    origin: "Italy",
    flavors: ["foam", "cocoa", "dry"],
    time: "Morning",
    summary: "奶泡厚，口感轻盈，咖啡、牛奶和泡沫的层次更明确。",
  },
  {
    name: "Mocha",
    cn: "摩卡",
    type: "dessert",
    category: "Dessert Coffee",
    caffeine: "Medium",
    caffeineValue: 60,
    ratio: "1:3 + chocolate",
    origin: "Yemen / Modern cafe",
    flavors: ["chocolate", "sweet", "cream"],
    time: "Afternoon",
    summary: "加入巧克力风味，甜感更强，适合从甜点饮品进入咖啡世界。",
  },
  {
    name: "Americano",
    cn: "美式",
    type: "black",
    category: "Black Coffee",
    caffeine: "High",
    caffeineValue: 78,
    ratio: "1:5 water",
    origin: "United States",
    flavors: ["clean", "roasted", "light bitter"],
    time: "Morning",
    summary: "用水稀释浓缩，咖啡因感和清醒感明显，口味比浓缩更轻。",
  },
  {
    name: "Cold Brew",
    cn: "冷萃",
    type: "cold",
    category: "Cold Coffee",
    caffeine: "High",
    caffeineValue: 86,
    ratio: "12h extraction",
    origin: "Global",
    flavors: ["smooth", "cocoa", "low acid"],
    time: "Early afternoon",
    summary: "低温长时间萃取，酸度低、顺滑，咖啡因强度通常偏高。",
  },
  {
    name: "Espresso",
    cn: "浓缩",
    type: "black",
    category: "Black Coffee",
    caffeine: "High",
    caffeineValue: 82,
    ratio: "1 shot",
    origin: "Italy",
    flavors: ["intense", "roasted", "syrupy"],
    time: "Morning",
    summary: "小体积高浓度，是多数意式咖啡的基础。",
  },
  {
    name: "Yirgacheffe",
    cn: "耶加雪菲",
    type: "black",
    category: "Origin Coffee",
    caffeine: "Low",
    caffeineValue: 42,
    ratio: "Pour-over",
    origin: "Ethiopia",
    flavors: ["floral", "citrus", "tea-like"],
    time: "Late morning",
    summary: "以花香、柑橘和茶感著称，适合探索产地风味。",
  },
];

const caffeineImpactFactors = [
  {
    name: "Coffee Species",
    cn: "咖啡豆品种",
    description:
      "罗布斯塔通常含有比阿拉比卡更高的咖啡因，是影响咖啡因含量的基础变量。",
    strength: "★★★★★",
    value: 90,
  },
  {
    name: "Coffee Dose",
    cn: "咖啡粉量",
    description:
      "使用的咖啡粉越多，最终萃取出的咖啡因通常越高。粉量比饮品名称更能影响总咖啡因。",
    strength: "★★★★☆",
    value: 80,
  },
  {
    name: "Serving Size",
    cn: "饮用容量",
    description:
      "一小杯浓缩浓度很高，但大杯咖啡因为容量更大，总咖啡因可能更高。",
    strength: "★★★★☆",
    value: 75,
  },
  {
    name: "Brewing Method",
    cn: "萃取方式",
    description:
      "高压、浸泡、滴滤等方式会影响咖啡因释放效率，但不能单独决定最终含量。",
    strength: "★★★☆☆",
    value: 60,
  },
];

const caffeineTendencyData = [
  {
    level: "Low",
    name: "Low Caffeine",
    cn: "低咖啡因倾向",
    points: ["单份浓缩基底", "较少咖啡粉量", "小杯容量", "选择低咖啡因豆"],
    value: 35,
  },
  {
    level: "Medium",
    name: "Medium Caffeine",
    cn: "中等咖啡因倾向",
    points: ["标准粉量", "标准杯量", "手冲或单份意式基底"],
    value: 60,
  },
  {
    level: "High",
    name: "High Caffeine",
    cn: "高咖啡因倾向",
    points: [
      "双份浓缩",
      "大杯容量",
      "高粉量手冲",
      "冷萃或长时间浸泡",
      "罗布斯塔比例较高",
    ],
    value: 88,
  },
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

function caffeineDots(level) {
  const filled = level === "Low" ? 2 : level === "Medium" ? 3 : 5;
  return Array.from(
    { length: 5 },
    (_, index) => `<span class="dot${index < filled ? " filled" : ""}"></span>`,
  ).join("");
}

function resultTemplate(item) {
  return `
    <article class="result-card fade-in">
      <h3>${item.name}</h3>
      <p>${item.cn} / ${item.category}</p>
      <div class="meta">
        <span class="tag">${item.caffeine} caffeine</span>
        <span class="tag">${item.origin}</span>
      </div>
    </article>
  `;
}

function normalize(value) {
  return value.toLowerCase().trim();
}

function matchesSearch(item, query) {
  const text = [
    item.name,
    item.cn,
    item.type,
    item.category,
    item.caffeine,
    item.origin,
    item.time,
    ...item.flavors,
  ].join(" ");
  return normalize(text).includes(query);
}

function renderHomeResults(query = "") {
  const results = $("#searchResults");
  if (!results) return;

  const cleaned = normalize(query);
  if (!cleaned) {
    results.innerHTML = "";
    return;
  }

  const matches = coffeeData
    .filter((item) => matchesSearch(item, cleaned))
    .slice(0, 3);
  results.innerHTML = matches.length
    ? matches.map(resultTemplate).join("")
    : `<article class="result-card fade-in"><h3>未找到匹配档案</h3><p>可以尝试搜索 Latte、Mocha、High、Ethiopia 或 chocolate。</p></article>`;
}

function initHome() {
  const form = $("#homeSearchForm");
  const input = $("#homeSearch");

  if (form && input) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      renderHomeResults(input.value);
    });
    input.addEventListener("input", () => renderHomeResults(input.value));
  }

  $$("[data-search-chip]").forEach((chip) => {
    chip.addEventListener("click", () => {
      input.value = chip.dataset.searchChip;
      renderHomeResults(input.value);
      input.focus();
    });
  });

  const randomButton = $("#randomBrew");
  const randomText = $("#randomBrewText");
  const dailyCard = $("#dailyCard");

  if (randomButton && randomText && dailyCard) {
    randomButton.addEventListener("click", () => {
      const item = coffeeData[Math.floor(Math.random() * coffeeData.length)];
      randomText.textContent = `${item.name} / ${item.cn} / ${item.caffeine} caffeine`;
      dailyCard.innerHTML = `
        <div class="card-rule"></div>
        <p class="section-kicker">Random cup</p>
        <h3>${item.name}</h3>
        <dl class="fact-list">
          <div><dt>Caffeine Index</dt><dd>${caffeineDots(item.caffeine)} ${item.caffeine}</dd></div>
          <div><dt>Ratio</dt><dd>${item.ratio}</dd></div>
          <div><dt>Flavor Profile</dt><dd>${item.flavors.join(" | ")}</dd></div>
        </dl>
      `;
      dailyCard.classList.remove("fade-in");
      requestAnimationFrame(() => dailyCard.classList.add("fade-in"));
    });
  }
}

function initHomeTitleReveal() {
  const titles = $$(".cn-title, .hero-reveal-title");
  if (!titles.length) return;

  titles.forEach((title) => {
    if (title.dataset.revealReady === "true") return;

    const text = title.textContent.trim();
    if (!text) return;

    const characters =
      typeof Intl !== "undefined" && "Segmenter" in Intl
        ? Array.from(
            new Intl.Segmenter("zh-CN", { granularity: "grapheme" }).segment(
              text,
            ),
            ({ segment }) => segment,
          )
        : Array.from(text);

    title.dataset.revealReady = "true";
    title.classList.add("home-title-reveal");
    title.setAttribute("aria-label", text);
    title.innerHTML = characters
      .map((character, index) => {
        const safeCharacter =
          character === " "
            ? "&nbsp;"
            : character
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        return `<span class="home-title-reveal-unit" aria-hidden="true"><span class="home-title-reveal-char" style="--char-index:${index}">${safeCharacter}</span></span>`;
      })
      .join("");

    function replay() {
      title.classList.remove("is-revealed");
      void title.offsetWidth;
      title.classList.add("is-revealed");
    }

    requestAnimationFrame(replay);
    title.addEventListener("mouseenter", replay);
  });
}

function initHomeLogoScroll() {
  const logo = $(".logo-title");
  const searchConsole = $(".search-console");
  if (!logo || !searchConsole) return;

  const finalScale = 0.68;
  let frame = null;

  function setLogoTransform(progress) {
    const logoRect = logo.getBoundingClientRect();
    const logoStyle = getComputedStyle(logo);
    const currentScale =
      Number.parseFloat(logoStyle.getPropertyValue("--home-logo-scale")) || 1;
    const currentY =
      Number.parseFloat(logoStyle.getPropertyValue("--home-logo-y")) || 0;
    const currentX =
      Number.parseFloat(logoStyle.getPropertyValue("--home-logo-x")) || 0;
    const baseLogoLeft = logoRect.left - currentX;
    const baseLogoTop = logoRect.top + window.scrollY - currentY;
    const baseLogoHeight = logoRect.height / currentScale;
    const searchRect = searchConsole.getBoundingClientRect();
    const searchStyle = getComputedStyle(searchConsole);
    const searchShift =
      Number.parseFloat(searchStyle.getPropertyValue("--home-search-shift")) ||
      0;
    const searchLeft = searchRect.left;
    const searchTop = searchRect.top + window.scrollY - searchShift;
    const endX = Math.max(0, searchLeft - baseLogoLeft);
    const endY = Math.max(
      0,
      searchTop - baseLogoTop - baseLogoHeight * finalScale,
    );
    const scale = 1 - (1 - finalScale) * progress;

    logo.style.setProperty("--home-logo-x", `${endX * progress}px`);
    logo.style.setProperty("--home-logo-y", `${endY * progress}px`);
    logo.style.setProperty("--home-logo-scale", scale.toFixed(4));
  }

  function update() {
    frame = null;
    const distance = Math.max(window.innerHeight * 0.32, 220);
    const progress = Math.max(0, Math.min(1, window.scrollY / distance));
    setLogoTransform(progress);
  }

  function requestUpdate() {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  update();
}

function initHomeArchiveHeadingScroll() {
  const section = $("#archive");
  const heading = $(".section-heading", section || document);
  const card = $("#dailyCard");
  if (!section || !heading || !card) return;

  let frame = null;

  function setHeadingPosition(progress) {
    const headingStyle = getComputedStyle(heading);
    const currentY =
      Number.parseFloat(
        headingStyle.getPropertyValue("--home-archive-heading-y"),
      ) || 0;
    const sectionRect = section.getBoundingClientRect();
    const headingRect = heading.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const baseHeadingTop = headingRect.top - currentY;
    const baseHeadingBottom = headingRect.bottom - currentY;
    const startY = sectionRect.top - baseHeadingTop;
    const endY = cardRect.top - baseHeadingBottom;
    const y = startY + (endY - startY) * progress;

    heading.style.setProperty("--home-archive-heading-y", `${y}px`);
  }

  function update() {
    frame = null;
    const headingStyle = getComputedStyle(heading);
    const currentY =
      Number.parseFloat(
        headingStyle.getPropertyValue("--home-archive-heading-y"),
      ) || 0;
    const headingRect = heading.getBoundingClientRect();
    const headingCenter = (headingRect.top + headingRect.bottom) / 2 - currentY;
    const distance = Math.max(window.innerHeight * 0.32, 220);
    const progress = Math.max(
      0,
      Math.min(1, (window.innerHeight / 2 - headingCenter) / distance),
    );
    setHeadingPosition(progress);
  }

  function requestUpdate() {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  update();
}

function initHomeQuestionBeansScroll() {
  const strip = $(".question-strip");
  const intro = $(".home-question-intro");
  if (!strip) return;

  const maxIntroShift = 220;
  let frame = null;

  function update() {
    frame = null;
    const introStyle = intro ? getComputedStyle(intro) : null;
    const currentY = introStyle
      ? Number.parseFloat(
          introStyle.getPropertyValue("--home-question-intro-y"),
        ) || 0
      : 0;
    const triggerRect = intro
      ? intro.getBoundingClientRect()
      : strip.getBoundingClientRect();
    const triggerCenter = (triggerRect.top + triggerRect.bottom) / 2 - currentY;
    const distance = Math.max(window.innerHeight * 0.32, 220);
    const progress = Math.max(
      0,
      Math.min(1, (window.innerHeight / 2 - triggerCenter) / distance),
    );
    strip.style.setProperty(
      "--home-beans-opacity",
      (progress * 0.9).toFixed(4),
    );
    if (intro) {
      intro.style.setProperty(
        "--home-question-intro-y",
        `${Math.round(maxIntroShift * progress)}px`,
      );
    }
  }

  function requestUpdate() {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  update();
}

function impactFactorTemplate(item) {
  return `
    <button
      class="impact-factor-card"
      type="button"
      data-impact-value="${item.value}"
      data-impact-name="${item.name}"
      aria-label="${item.name} impact ${item.value}"
    >
      <div>
        <strong>${item.name}</strong>
        <p>${item.cn}</p>
      </div>
      <p>${item.description}</p>
      <span class="tag">${item.strength}</span>
      <div class="meter" aria-label="${item.name} impact ${item.value}">
        <i style="width:${item.value}%"></i>
      </div>
    </button>
  `;
}

function caffeineRowTemplate(item, index) {
  const indexLabel = String(index + 1).padStart(2, "0");
  const tendencyLabels = {
    Low: "\u4f4e\u5496\u5561\u56e0",
    Medium: "\u4e2d\u7b49\u5496\u5561\u56e0",
    High: "\u9ad8\u5496\u5561\u56e0",
  };
  const tendencyLabel = tendencyLabels[item.level] || item.cn;

  return `
    <article class="caffeine-row" data-caffeine-card="${item.level}">
      <span class="caffeine-row-index" role="button" tabindex="0" data-caffeine-card="${item.level}" aria-label="将${tendencyLabel}卡片移至最上方">${indexLabel} ${tendencyLabel}</span>
      <div class="caffeine-row-panel">
        <div>
          <strong>${item.name}</strong>
          <p>${item.cn}</p>
          <ul>
            ${item.points.map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </div>
        <span class="tag">${item.level}</span>
        <div class="meter" aria-label="${item.name} tendency ${item.value}">
          <i style="width:${item.value}%"></i>
        </div>
      </div>
    </article>
  `;
}

function initCaffeine() {
  const impactList = $("#caffeineImpactList");
  const gauge = $(".caffeine-gauge");
  const list = $("#caffeineList");
  if (!list) return;

  function setImpactGauge(value, label = "Impact") {
    if (!gauge) return;
    gauge.style.setProperty("--caffeine-impact-value", `${value}%`);
    const gaugeLabel = $("span", gauge);
    if (gaugeLabel) gaugeLabel.textContent = `${value} ${label}`;
  }

  if (impactList) {
    impactList.innerHTML = caffeineImpactFactors
      .map(impactFactorTemplate)
      .join("");
    const impactCards = $$(".impact-factor-card", impactList);
    impactCards.forEach((card, index) => {
      card.classList.toggle("is-active", index === 0);
      card.addEventListener("click", () => {
        const value = Number.parseInt(card.dataset.impactValue, 10) || 0;
        impactCards.forEach((item) => item.classList.remove("is-active"));
        card.classList.add("is-active");
        setImpactGauge(value, card.dataset.impactName || "Impact");
      });
    });
    const firstFactor = caffeineImpactFactors[0];
    setImpactGauge(firstFactor.value, firstFactor.name);
  }

  list.innerHTML = caffeineTendencyData.map(caffeineRowTemplate).join("");

  $$(".caffeine-row-index", list).forEach((indexMarker) => {
    function moveCardToTop() {
      const card = indexMarker.closest(".caffeine-row");
      const firstCard = $(".caffeine-row", list);
      if (!card || !firstCard) return;
      list.insertBefore(card, firstCard);
      $$(".caffeine-row", list).forEach((item) =>
        item.classList.remove("is-promoted"),
      );
      void card.offsetWidth;
      card.classList.add("is-promoted");
    }

    indexMarker.addEventListener("click", moveCardToTop);
    indexMarker.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      moveCardToTop();
    });
  });
}

function initEspressoCarousel() {
  const gallery = $(".espresso-card-gallery");
  const cards = $$(".espresso-type-card", gallery || document);
  const prevButton = $("[data-espresso-prev]");
  const nextButton = $("[data-espresso-next]");
  const status = $("#espressoCarouselStatus");

  if (!gallery || cards.length === 0) return;

  const baseSlots = {
    "-3": { x: -34, y: 34, rot: -19, scale: 0.72, z: 1 },
    "-2": { x: -23, y: 18, rot: -12, scale: 0.82, z: 2 },
    "-1": { x: -11, y: 6, rot: -6, scale: 0.92, z: 4 },
    0: { x: 0, y: 0, rot: 0, scale: 1, z: 8 },
    1: { x: 11, y: 6, rot: 6, scale: 0.92, z: 4 },
    2: { x: 23, y: 18, rot: 12, scale: 0.82, z: 2 },
  };

  let activeIndex = 0;
  let expandedIndex = null;
  let hoverIntentTimer = null;

  function spreadFactor() {
    const width = window.innerWidth;
    if (width < 520) return 0.42;
    if (width < 760) return 0.55;
    if (width < 1040) return 0.78;
    return 1;
  }

  function slotFor(index) {
    let delta = index - activeIndex;
    if (delta >= cards.length / 2) delta -= cards.length;
    if (delta < -cards.length / 2) delta += cards.length;
    return baseSlots[delta] || baseSlots[0];
  }

  function render() {
    const factor = spreadFactor();
    cards.forEach((card, index) => {
      const slot = slotFor(index);
      card.style.setProperty("--fan-x", `${slot.x * factor}rem`);
      card.style.setProperty("--fan-y", `${slot.y * factor}px`);
      card.style.setProperty("--fan-rot", `${slot.rot}deg`);
      card.style.setProperty("--fan-scale", slot.scale);
      card.style.setProperty("--fan-z", slot.z);
      card.classList.toggle("is-active", index === activeIndex);
      card.classList.toggle("is-expanded", index === expandedIndex);
      card.setAttribute(
        "aria-current",
        index === activeIndex ? "true" : "false",
      );
      card.setAttribute(
        "aria-expanded",
        index === expandedIndex ? "true" : "false",
      );
    });
    if (status) status.textContent = `${activeIndex + 1} / ${cards.length}`;
  }

  function setActive(index) {
    activeIndex = (index + cards.length) % cards.length;
    if (expandedIndex !== null && expandedIndex !== activeIndex)
      expandedIndex = null;
    render();
  }

  function toggleExpanded(index) {
    clearHoverIntent();
    cards.forEach((item) => {
      item.dataset.hoverIntent = "false";
    });

    if (expandedIndex === index) {
      expandedIndex = null;
    } else {
      activeIndex = index;
      expandedIndex = index;
    }
    render();
  }

  function clearHoverIntent() {
    if (!hoverIntentTimer) return;
    window.clearTimeout(hoverIntentTimer);
    hoverIntentTimer = null;
  }

  function scheduleHoverIntent(card, index, event) {
    if (event.pointerType === "touch") return;
    if (expandedIndex !== null) return;
    clearHoverIntent();
    cards.forEach((item) => {
      item.dataset.hoverIntent = "false";
    });
    card.dataset.hoverIntent = "true";
    hoverIntentTimer = window.setTimeout(() => {
      hoverIntentTimer = null;
      if (card.dataset.hoverIntent === "true") setActive(index);
    }, 260);
  }

  cards.forEach((card, index) => {
    card.tabIndex = 0;
    card.addEventListener("pointerenter", (event) =>
      scheduleHoverIntent(card, index, event),
    );
    card.addEventListener("pointerleave", () => {
      card.dataset.hoverIntent = "false";
      clearHoverIntent();
    });
    card.addEventListener("focus", () => {
      if (expandedIndex === null) setActive(index);
    });
    card.addEventListener("click", () => toggleExpanded(index));
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      gallery.focus();
      setActive(activeIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      gallery.focus();
      setActive(activeIndex + 1);
    });
  }

  document.addEventListener("keydown", (event) => {
    const tagName = event.target.tagName;
    if (
      tagName === "INPUT" ||
      tagName === "TEXTAREA" ||
      event.target.isContentEditable
    )
      return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActive(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActive(activeIndex + 1);
    }
    if (event.key === "Escape" && expandedIndex !== null) {
      event.preventDefault();
      expandedIndex = null;
      render();
    }
  });

  window.addEventListener("resize", render);
  render();
}

function initExtractionMethodCards() {
  const cards = $$(".extraction-method-card");
  if (!cards.length) return;

  function showMethod(methodId) {
    cards.forEach((card) => {
      card.classList.toggle(
        "is-selected",
        card.dataset.extractionMethod === methodId,
      );
    });
  }

  function resetMethod(clearFocus = false) {
    cards.forEach((card) => card.classList.remove("is-selected"));
    if (
      clearFocus &&
      document.activeElement?.closest(".extraction-method-card")
    ) {
      document.activeElement.blur();
    }
  }

  cards.forEach((card) => {
    card.addEventListener("click", () =>
      showMethod(card.dataset.extractionMethod),
    );
    card.addEventListener("pointerleave", () => resetMethod(true));
    card.addEventListener("focusout", (event) => {
      if (card.contains(event.relatedTarget)) return;
      resetMethod();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      showMethod(card.dataset.extractionMethod);
    });
  });
}

function initExtractionMethodsTitleScroll() {
  const title = $(".extraction-methods-title");
  if (!title) return;

  const maxTitleShift = 300;
  let frame = null;

  function update() {
    frame = null;
    const titleStyle = getComputedStyle(title);
    const currentY =
      Number.parseFloat(
        titleStyle.getPropertyValue("--extraction-methods-title-y"),
      ) || 0;
    const rect = title.getBoundingClientRect();
    const titleCenter = (rect.top + rect.bottom) / 2 - currentY;
    const distance = Math.max(window.innerHeight * 0.36, 300);
    const progress = Math.max(
      0,
      Math.min(1, (window.innerHeight / 2 - titleCenter) / distance),
    );

    title.style.setProperty(
      "--extraction-methods-title-y",
      `${Math.round(maxTitleShift * progress)}px`,
    );
  }

  function requestUpdate() {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  update();
}

function initArchiveHeroReveal() {
  const hero = $(".classification-hero");
  const spread = $(".archive-hero-spread");
  if (!hero || !spread) return;

  const header = $(".site-header");
  let frame = null;

  function setProgress(value) {
    const progress = Math.max(0, Math.min(1, value));
    spread.style.setProperty(
      "--archive-reveal-offset",
      `${(1 - progress) * 100}%`,
    );
  }

  function updateReveal() {
    frame = null;

    if (window.innerWidth <= 980) {
      setProgress(0);
      return;
    }

    const stickyTop = header ? header.offsetHeight : 76;
    hero.style.setProperty("--archive-sticky-top", `${stickyTop}px`);
    const heroTop = hero.getBoundingClientRect().top + window.scrollY;
    const start = heroTop - stickyTop;
    const distance = Math.max(hero.offsetHeight - spread.offsetHeight, 1);
    setProgress((window.scrollY - start) / distance);
  }

  function requestUpdate() {
    if (frame) return;
    frame = window.requestAnimationFrame(updateReveal);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  updateReveal();
}

function initFlavorHeroReveal() {
  const scrollSection = $('body[data-page="flavor"] .flavor-hero-scroll');
  const hero = $('body[data-page="flavor"] .page-hero');
  const header = $(".site-header");
  if (!scrollSection || !hero) return;

  let progress = 0;
  let targetProgress = 0;
  let animationFrame = null;

  function setProgress(value) {
    progress = Math.max(0, Math.min(1, value));
    hero.style.setProperty(
      "--flavor-hero-reveal-offset",
      `${(1 - progress) * 100}%`,
    );
  }

  function animateProgress() {
    const nextProgress = progress + (targetProgress - progress) * 0.18;
    if (Math.abs(targetProgress - nextProgress) < 0.001) {
      setProgress(targetProgress);
      animationFrame = null;
      return;
    }

    setProgress(nextProgress);
    animationFrame = window.requestAnimationFrame(animateProgress);
  }

  function requestProgressAnimation() {
    if (animationFrame) return;
    animationFrame = window.requestAnimationFrame(animateProgress);
  }

  function getRevealDistance() {
    const sectionStyle = getComputedStyle(scrollSection);
    return (
      Number.parseFloat(
        sectionStyle.getPropertyValue("--flavor-hero-reveal-scroll"),
      ) || 720
    );
  }

  function isHeroAtScrollGate() {
    const stickyTop = header ? header.offsetHeight : 76;
    scrollSection.style.setProperty(
      "--flavor-hero-sticky-top",
      `${stickyTop}px`,
    );
    const rect = scrollSection.getBoundingClientRect();
    return rect.top <= stickyTop + 2 && rect.bottom > stickyTop;
  }

  function handleWheel(event) {
    const isRevealingDown =
      event.deltaY > 0 && progress < 0.999 && isHeroAtScrollGate();
    const isReversingUp =
      event.deltaY < 0 && progress > 0.001 && isHeroAtScrollGate();
    if (!isRevealingDown && !isReversingUp) return;

    event.preventDefault();
    const deltaMultiplier =
      event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? window.innerHeight
          : 1;
    const normalizedDelta = event.deltaY * deltaMultiplier;
    targetProgress = Math.max(
      0,
      Math.min(
        1,
        targetProgress + normalizedDelta / Math.max(getRevealDistance(), 1),
      ),
    );
    requestProgressAnimation();
  }

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("resize", () => isHeroAtScrollGate());

  setProgress(0);
  targetProgress = 0;
}

function initCaffeineHeroReveal() {
  const scrollSection = $('body[data-page="caffeine"] .caffeine-hero-scroll');
  const hero = $('body[data-page="caffeine"] .page-hero');
  const header = $(".site-header");
  if (!scrollSection || !hero) return;

  let progress = 0;
  let targetProgress = 0;
  let animationFrame = null;

  function setProgress(value) {
    progress = Math.max(0, Math.min(1, value));
    hero.style.setProperty(
      "--caffeine-hero-reveal-offset",
      `${(1 - progress) * 100}%`,
    );
  }

  function animateProgress() {
    const nextProgress = progress + (targetProgress - progress) * 0.18;
    if (Math.abs(targetProgress - nextProgress) < 0.001) {
      setProgress(targetProgress);
      animationFrame = null;
      return;
    }

    setProgress(nextProgress);
    animationFrame = window.requestAnimationFrame(animateProgress);
  }

  function requestAnimation() {
    if (animationFrame) return;
    animationFrame = window.requestAnimationFrame(animateProgress);
  }

  function getRevealDistance() {
    const sectionStyle = getComputedStyle(scrollSection);
    return (
      Number.parseFloat(
        sectionStyle.getPropertyValue("--caffeine-hero-reveal-scroll"),
      ) || 720
    );
  }

  function isHeroAtScrollGate() {
    const stickyTop = header ? header.offsetHeight : 76;
    scrollSection.style.setProperty(
      "--caffeine-hero-sticky-top",
      `${stickyTop}px`,
    );
    const rect = scrollSection.getBoundingClientRect();
    return rect.top <= stickyTop + 2 && rect.bottom > stickyTop;
  }

  function handleWheel(event) {
    const isRevealingDown =
      event.deltaY > 0 && progress < 0.999 && isHeroAtScrollGate();
    const isReversingUp =
      event.deltaY < 0 && progress > 0.001 && isHeroAtScrollGate();
    if (!isRevealingDown && !isReversingUp) return;

    event.preventDefault();
    const deltaMultiplier =
      event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? window.innerHeight
          : 1;
    const normalizedDelta = event.deltaY * deltaMultiplier;
    targetProgress = Math.max(
      0,
      Math.min(1, targetProgress + normalizedDelta / getRevealDistance()),
    );
    requestAnimation();
  }

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("resize", () => isHeroAtScrollGate());

  setProgress(0);
  targetProgress = 0;
}

function initBrewImageReveal() {
  const section = $(".brew-section");
  const stage = $(".brew-title-stage");
  const frame = $(".brew-photo-frame");
  const header = $(".site-header");
  if (!section || !stage || !frame) return;

  let frameRequest = null;

  function setProgress(value) {
    const progress = Math.max(0, Math.min(1, value));
    frame.style.setProperty("--brew-reveal-offset", `${(1 - progress) * 100}%`);
  }

  function updateReveal() {
    frameRequest = null;
    const stickyTop = header ? header.offsetHeight : 76;
    section.style.setProperty("--brew-sticky-top", `${stickyTop}px`);
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const start = sectionTop - stickyTop;
    const distance = Math.max(section.offsetHeight - stage.offsetHeight, 1);
    setProgress((window.scrollY - start) / distance);
  }

  function requestUpdate() {
    if (frameRequest) return;
    frameRequest = window.requestAnimationFrame(updateReveal);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  updateReveal();
}

function initEspressoHeadingReveal() {
  const section = $(".espresso-heading");
  const stage = $(".espresso-title-stage");
  const visual = $(".espresso-heading-visual");
  const header = $(".site-header");
  if (!section || !stage || !visual) return;

  let frameRequest = null;

  function setProgress(value) {
    const progress = Math.max(0, Math.min(1, value));
    visual.style.setProperty(
      "--espresso-reveal-offset",
      `${(1 - progress) * 100}%`,
    );
  }

  function updateReveal() {
    frameRequest = null;
    const stickyTop = header ? header.offsetHeight : 76;
    section.style.setProperty("--espresso-sticky-top", `${stickyTop}px`);
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const start = sectionTop - stickyTop;
    const distance = Math.max(section.offsetHeight - stage.offsetHeight, 1);
    setProgress((window.scrollY - start) / distance);
  }

  function requestUpdate() {
    if (frameRequest) return;
    frameRequest = window.requestAnimationFrame(updateReveal);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  updateReveal();
}

const originData = [
  {
    id: "brazil",
    name: "Brazil",
    cn: "巴西",
    flavors: "坚果、巧克力、低酸、醇厚",
    region: "巴西",
    description:
      "巴西是世界重要咖啡产区之一，风味通常稳定圆润，常见坚果、可可与焦糖调性，适合作为意式拼配基础。",
  },
  {
    id: "colombia",
    name: "Colombia",
    cn: "哥伦比亚",
    flavors: "焦糖、坚果、柔和酸质、甜感",
    region: "哥伦比亚",
    description:
      "哥伦比亚咖啡以平衡感著称，常呈现焦糖、坚果与柔和果酸，口感顺滑，适合日常饮用。",
  },
  {
    id: "ethiopia",
    name: "Ethiopia",
    cn: "埃塞俄比亚",
    flavors: "花香、柑橘、莓果、明亮酸质",
    region: "埃塞俄比亚",
    description:
      "埃塞俄比亚被视为咖啡原产地之一，风味表现明亮而复杂，常见花香、柑橘与莓果调性。",
  },
  {
    id: "kenya",
    name: "Kenya",
    cn: "肯尼亚",
    flavors: "黑加仑、柑橘、明亮酸质、果汁感",
    region: "肯尼亚",
    description:
      "肯尼亚咖啡常具有强烈果酸与清晰层次，黑加仑、柑橘和莓果风味突出，辨识度很高。",
  },
  {
    id: "guatemala",
    name: "Guatemala",
    cn: "危地马拉",
    flavors: "可可、香料、烟熏、坚果",
    region: "危地马拉",
    description:
      "危地马拉多火山土壤与高海拔产区，咖啡常带可可、香料与轻微烟熏感，口感厚实。",
  },
  {
    id: "mexico",
    name: "Mexico",
    cn: "墨西哥",
    flavors: "温和酸质、坚果、香料、轻盈甜感",
    region: "墨西哥",
    description:
      "墨西哥咖啡整体风味温和，酸质较柔和，常见坚果、香料与轻盈甜感，适合轻度烘焙或日常饮用。",
  },
  {
    id: "india",
    name: "India",
    cn: "印度",
    flavors: "香料、木质、低酸、厚重",
    region: "印度",
    description:
      "印度咖啡常带有香料、木质与低酸特征，部分处理方式会形成厚重、圆润且独特的风味表现。",
  },
  {
    id: "indonesia",
    name: "Indonesia",
    cn: "印度尼西亚",
    flavors: "草本、泥土、木质、巧克力",
    region: "印度尼西亚",
    description:
      "印度尼西亚咖啡以厚重质感和低酸著称，常见草本、泥土、木质与深色巧克力调性。",
  },
  {
    id: "yemen",
    name: "Yemen",
    cn: "也门",
    flavors: "酒香、香料、果干、复杂",
    region: "也门",
    description:
      "也门咖啡历史悠久，常带有复杂的酒香、香料与果干风味，口感浓郁而独特。",
  },
  {
    id: "yunnan",
    name: "Yunnan",
    cn: "中国云南",
    flavors: "坚果、红糖、茶感、柔和果酸",
    region: "中国云南",
    description:
      "云南是中国重要咖啡产区，风味通常温和清晰，常见坚果、红糖、茶感与柔和果酸。",
  },
];

function initOriginMap() {
  const stage = $(".origin-map-stage");
  const buttons = $$(".origin-hotspot");
  const profile = $("#originProfile");
  const nameEn = $("#originNameEn");
  const nameCn = $("#originNameCn");
  const flavors = $("#originFlavors");
  const region = $("#originRegion");
  const description = $("#originDescription");

  if (
    !stage ||
    !buttons.length ||
    !profile ||
    !nameEn ||
    !nameCn ||
    !flavors ||
    !region ||
    !description
  )
    return;

  function resetProfile() {
    buttons.forEach((button) => button.classList.remove("active"));
    profile.classList.remove("is-visible", "is-popping");
    profile.setAttribute("aria-hidden", "true");
  }

  function popProfile() {
    profile.classList.remove("is-popping");
    void profile.offsetWidth;
    profile.classList.add("is-visible", "is-popping");
    profile.setAttribute("aria-hidden", "false");
  }

  function render(id) {
    const item = originData.find((origin) => origin.id === id) || originData[2];
    nameEn.textContent = item.name;
    nameCn.textContent = item.cn;
    flavors.textContent = item.flavors;
    region.textContent = item.region;
    description.textContent = item.description;
    buttons.forEach((button) => {
      button.classList.toggle("active", button.dataset.origin === item.id);
    });
    const activeButton = buttons.find(
      (button) => button.dataset.origin === item.id,
    );
    if (activeButton) {
      stage.style.setProperty(
        "--card-x",
        activeButton.style.getPropertyValue("--x"),
      );
      stage.style.setProperty(
        "--card-y",
        activeButton.style.getPropertyValue("--y"),
      );
    }
    popProfile();
  }

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      render(button.dataset.origin);
    });
    button.addEventListener("mouseleave", resetProfile);
  });

  profile.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  stage.addEventListener("click", (event) => {
    if (event.target.closest(".origin-hotspot, .origin-profile-card")) return;
    resetProfile();
  });

  profile.addEventListener("animationend", () => {
    profile.classList.remove("is-popping");
  });

  resetProfile();
}

function initOriginTitleScroll() {
  const title = $(".origin-title-block");
  const guide = $(".origin-region-guide");
  const header = $(".site-header");
  if (!title || !guide) return;

  let frame = null;

  function update() {
    frame = null;
    const titleStyle = getComputedStyle(title);
    const currentY =
      Number.parseFloat(titleStyle.getPropertyValue("--origin-title-y")) || 0;
    const titleRect = title.getBoundingClientRect();
    const guideRect = guide.getBoundingClientRect();
    const baseTitleTop = titleRect.top - currentY;
    const baseTitleBottom = titleRect.bottom - currentY;
    const triggerLine =
      (header ? header.getBoundingClientRect().bottom : 0) + 50;
    const maxShift = Math.max(0, guideRect.top - baseTitleBottom);
    const progress = Math.max(
      0,
      Math.min(1, (triggerLine - baseTitleTop) / Math.max(maxShift, 1)),
    );

    title.style.setProperty(
      "--origin-title-y",
      `${Math.round(maxShift * progress)}px`,
    );
  }

  function requestUpdate() {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  update();
}

function initFlavorWheelInteraction() {
  const panel = $(".flavor-wheel-panel");
  const wheel = $(".flavor-wheel-image", panel || document);
  if (!panel || !wheel) return;

  const autoSpeed = 360 / 40000;
  let angle = 0;
  let velocity = 0;
  let scale = 1;
  let pointerInsideWheel = false;
  let grabbingTimer = null;
  let lastTime = performance.now();

  function isPointInWheel(clientX, clientY) {
    const rect = wheel.getBoundingClientRect();
    const radius = Math.min(rect.width, rect.height) / 2;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return dx * dx + dy * dy <= radius * radius;
  }

  function setPointerInside(value) {
    pointerInsideWheel = value;
    panel.classList.toggle("is-wheel-hover", value);
    if (!value) panel.classList.remove("is-wheel-grabbing");
  }

  function updatePointerState(event) {
    setPointerInside(isPointInWheel(event.clientX, event.clientY));
  }

  function spin(timestamp) {
    const delta = Math.min(timestamp - lastTime, 64);
    lastTime = timestamp;

    if (!pointerInsideWheel) angle += autoSpeed * delta;
    if (Math.abs(velocity) > 0.0008) {
      angle += velocity * delta;
      velocity *= Math.pow(0.9, delta / 16.67);
    } else {
      velocity = 0;
    }

    const targetScale = pointerInsideWheel ? 1.1 : 1;
    scale += (targetScale - scale) * (1 - Math.exp(-delta / 120));
    angle = ((angle % 360) + 360) % 360;

    panel.style.setProperty("--flavor-wheel-angle", `${angle}deg`);
    panel.style.setProperty("--flavor-wheel-scale", scale.toFixed(4));
    window.requestAnimationFrame(spin);
  }

  panel.addEventListener("pointermove", updatePointerState);
  panel.addEventListener("pointerleave", () => setPointerInside(false));
  panel.addEventListener(
    "wheel",
    (event) => {
      if (!pointerInsideWheel) return;
      event.preventDefault();

      const clampedDelta = Math.max(-120, Math.min(120, event.deltaY));
      velocity += clampedDelta * 0.00065;
      panel.classList.add("is-wheel-grabbing");
      window.clearTimeout(grabbingTimer);
      grabbingTimer = window.setTimeout(() => {
        panel.classList.remove("is-wheel-grabbing");
      }, 220);
    },
    { passive: false },
  );

  window.requestAnimationFrame(spin);
}

function initFlavorWheelGuideHeaderScroll() {
  const guide = $(".flavor-wheel-guide");
  const header = $(".flavor-wheel-guide-header");
  if (!guide || !header) return;

  const maxHeaderShift = 300;
  let frame = null;

  function update() {
    frame = null;
    const headerStyle = getComputedStyle(header);
    const currentY =
      Number.parseFloat(
        headerStyle.getPropertyValue("--flavor-wheel-guide-header-y"),
      ) || 0;
    const rect = header.getBoundingClientRect();
    const headerCenter = (rect.top + rect.bottom) / 2 - currentY;
    const distance = Math.max(window.innerHeight * 0.48, 360);
    const progress = Math.max(
      0,
      Math.min(1, (window.innerHeight / 2 - headerCenter) / distance),
    );

    guide.style.setProperty(
      "--flavor-wheel-guide-header-y",
      `${Math.round(maxHeaderShift * progress)}px`,
    );
  }

  function requestUpdate() {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  update();
}

function initCaffeineMythsHeadingScroll() {
  const heading = $(".caffeine-myths > .section-heading");
  if (!heading) return;

  const startOffset = -300;
  let frame = null;

  function update() {
    frame = null;
    const headingStyle = getComputedStyle(heading);
    const currentY =
      Number.parseFloat(
        headingStyle.getPropertyValue("--caffeine-myth-heading-y"),
      ) || 0;
    const rect = heading.getBoundingClientRect();
    const baseTop = rect.top - currentY;
    const distance = Math.max(window.innerHeight * 0.24, 180);
    const progress = Math.max(
      0,
      Math.min(1, (window.innerHeight * 0.58 - baseTop) / distance),
    );
    const y = Math.round(startOffset * (1 - progress));

    heading.style.setProperty("--caffeine-myth-heading-y", `${y}px`);
  }

  function requestUpdate() {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  update();
}

document.addEventListener("DOMContentLoaded", () => {
  initHome();
  initHomeTitleReveal();
  initHomeLogoScroll();
  initHomeArchiveHeadingScroll();
  initHomeQuestionBeansScroll();
  initCaffeine();
  initEspressoCarousel();
  initExtractionMethodCards();
  initExtractionMethodsTitleScroll();
  initArchiveHeroReveal();
  initFlavorHeroReveal();
  initCaffeineHeroReveal();
  initEspressoHeadingReveal();
  initBrewImageReveal();
  initOriginMap();
  initOriginTitleScroll();
  initFlavorWheelInteraction();
  initFlavorWheelGuideHeaderScroll();
  initCaffeineMythsHeadingScroll();
  document.body.classList.add("fade-in");
});
