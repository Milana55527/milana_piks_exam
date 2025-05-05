// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton?.addEventListener("click", function () {
  mobileMenu?.classList.toggle("hidden");
});

// Recipe Modal Functionality
const viewRecipeButtons = document.querySelectorAll(".view-recipe-btn");
const recipeModal = document.getElementById("recipe-modal");
const closeModal = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const prepTime = document.getElementById("prep-time");
const cookTime = document.getElementById("cook-time");
const servings = document.getElementById("servings");
const difficulty = document.getElementById("difficulty");
const ingredientsList = document.getElementById("ingredients-list");
const instructionsList = document.getElementById("instructions-list");
const saveRecipeButton = document.getElementById("save-recipe");

// Пример данных рецептов (можно расширить)
const recipes = {
  example: {
    title: "Омлет",
    image: "omelette.jpg",
    prepTime: "5 мин",
    cookTime: "10 мин",
    servings: "2 порции",
    difficulty: "Лёгкий",
    ingredients: ["2 яйца", "Соль", "Молоко"],
    instructions: ["Взбейте яйца", "Добавьте молоко", "Обжарьте на сковороде"],
  },
};

viewRecipeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const recipeKey = btn.dataset.recipe;
    const recipe = recipes[recipeKey];

    if (recipe) {
      modalTitle.textContent = recipe.title;
      modalImage.src = recipe.image;
      prepTime.textContent = recipe.prepTime;
      cookTime.textContent = recipe.cookTime;
      servings.textContent = recipe.servings;
      difficulty.textContent = recipe.difficulty;

      ingredientsList.innerHTML = "";
      recipe.ingredients.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ingredientsList.appendChild(li);
      });

      instructionsList.innerHTML = "";
      recipe.instructions.forEach((step) => {
        const li = document.createElement("li");
        li.textContent = step;
        instructionsList.appendChild(li);
      });

      recipeModal.classList.remove("hidden");
    }
  });
});

closeModal?.addEventListener("click", () => {
  recipeModal.classList.add("hidden");
});

// Password Validation
document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("password-error");
  const submitButton = document.querySelector('button[type="submit"]');
  const forbiddenChars = ["(", ")", ".", ":", ";", '"'];

  function validatePassword(password) {
    const foundForbiddenChar = forbiddenChars.find((char) =>
      password.includes(char)
    );

    if (foundForbiddenChar) {
      passwordError.textContent = `Символ "${foundForbiddenChar}" не допускается в пароле`;
      passwordError.classList.remove("hidden");
      passwordInput.classList.add("border-red-500");
      submitButton.disabled = true;
      submitButton.classList.add("opacity-50", "cursor-not-allowed");
      return false;
    } else if (password.length < 8) {
      passwordError.textContent = "Пароль должен содержать минимум 8 символов";
      passwordError.classList.remove("hidden");
      passwordInput.classList.add("border-red-500");
      submitButton.disabled = true;
      submitButton.classList.add("opacity-50", "cursor-not-allowed");
      return false;
    }

    passwordError.classList.add("hidden");
    passwordInput.classList.remove("border-red-500");
    submitButton.disabled = false;
    submitButton.classList.remove("opacity-50", "cursor-not-allowed");
    return true;
  }

  // Блокируем ввод запрещённых символов
  passwordInput?.addEventListener("keydown", (e) => {
    if (forbiddenChars.includes(e.key)) {
      e.preventDefault();
    }
  });

  // Очищаем вставленные запрещённые символы
  passwordInput?.addEventListener("input", (e) => {
    const raw = e.target.value;
    const clean = raw
      .split("")
      .filter((char) => !forbiddenChars.includes(char))
      .join("");

    if (raw !== clean) {
      e.target.value = clean;
    }

    validatePassword(clean);
  });

  document.getElementById("signup-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = passwordInput.value;

    if (!validatePassword(password)) {
      return;
    }

    // Успешная регистрация
    alert("Регистрация успешна!");
    e.target.reset();
    passwordError.classList.add("hidden");
    passwordInput.classList.remove("border-red-500");
  });
});
