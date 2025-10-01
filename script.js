// Solution data
const solutions = [
  {
    basePrice: 100,
    desc: "This is the description of the selected solution for the user.",
  },
  {
    basePrice: 150,
    desc: "Advanced solution with enhanced features and capabilities.",
  },
  {
    basePrice: 200,
    desc: "Premium solution with complete feature set and priority support.",
  },
  {
    basePrice: 120,
    desc: "Specialized solution tailored for enterprise environments.",
  },
];

let currentSolution = 0;
let basePrice = solutions[currentSolution].basePrice;

// Solution picker functionality
const solutionImgs = document.querySelectorAll(".solution-img");
const descElement = document.getElementById("solutionDesc");

solutionImgs.forEach((img) => {
  img.addEventListener("click", function () {
    solutionImgs.forEach((i) => i.classList.remove("active"));
    this.classList.add("active");

    currentSolution = parseInt(this.dataset.solution);
    basePrice = solutions[currentSolution].basePrice;
    descElement.textContent = solutions[currentSolution].desc;

    updatePrice(true);
  });
});

// Toggle switches functionality
const toggles = document.querySelectorAll(".option-toggle");
const optionItems = document.querySelectorAll(".solution-options li");

toggles.forEach((toggle, index) => {
  toggle.addEventListener("change", function () {
    if (this.checked) {
      optionItems[index].classList.add("active");
    } else {
      optionItems[index].classList.remove("active");
    }
    updatePrice(true);
  });
});

// Update total price with animation
function updatePrice(animate = false) {
  let total = basePrice;

  optionItems.forEach((item, index) => {
    if (toggles[index].checked) {
      total += parseInt(item.dataset.price);
    }
  });

  const priceText = total + "€/month";
  const mobilePrice = document.getElementById("mobilePrice");
  const desktopPrice = document.getElementById("desktopPrice");
  const desktopBtn = document.querySelector(".place-btn");
  const mobileBtn = document.querySelector(".mobile-cta");

  // Update prices
  mobilePrice.textContent = priceText;
  desktopPrice.textContent = priceText;

  // Animate if requested
  if (animate) {
    // Mobile price animation
    mobilePrice.classList.remove("animate");
    void mobilePrice.offsetWidth;
    mobilePrice.classList.add("animate");

    // Button pop animation
    desktopBtn.classList.remove("pop");
    mobileBtn.classList.remove("pop");
    void desktopBtn.offsetWidth;
    desktopBtn.classList.add("pop");
    mobileBtn.classList.add("pop");

    // Remove animation classes after animation completes
    setTimeout(() => {
      mobilePrice.classList.remove("animate");
      desktopBtn.classList.remove("pop");
      mobileBtn.classList.remove("pop");
    }, 400);
  }
}

// Place order button functionality
function placeOrder() {
  const selectedOptions = [];
  let totalPrice = basePrice;

  optionItems.forEach((item, index) => {
    if (toggles[index].checked) {
      const optionName = item.querySelector(".option-name").textContent.trim();
      selectedOptions.push(optionName);
      totalPrice += parseInt(item.dataset.price);
    }
  });

  const message =
    selectedOptions.length > 0
      ? `Order placed!\nTotal: ${totalPrice}€/month\nOptions: ${selectedOptions.join(
          ", "
        )}`
      : `Order placed!\nTotal: ${totalPrice}€/month\nNo additional options selected.`;

  alert(message);
}

document.querySelector(".place-btn").addEventListener("click", placeOrder);
document.querySelector(".mobile-cta").addEventListener("click", placeOrder);

// Initialize price
updatePrice(false);
