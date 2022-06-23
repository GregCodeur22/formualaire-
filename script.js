const inputs = document.querySelectorAll(
  "input[type='text'], input[type='password']  "
);
let progressBar = document.getElementById("progresse-Bar");
let form = document.querySelector("form");
let pseudo, email, password, confirmPass;

let errorDisplay = (tag, message, valid) => {
  const container = document.querySelector(`.${tag}-container`);
  const span = document.querySelector(`.${tag}-container > span`);

  if (!valid) {
    span.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

let pseudoChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("pseudo", "le pseudo doit possèdé entre 3 et 20 caractères");
    pseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "pseudo",
      "le pseudo ne doit pas contenir de caractères spéciaux"
    );
    pseudo = null;
  } else {
    errorDisplay("pseudo", "", true);
    pseudo = value;
  }
};

let emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/)) {
    errorDisplay("email", "l'email n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

let passwordChecker = (value) => {
  progressBar.classList = "";
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    errorDisplay(
      "password",
      "le mot de passe doit contenir 8 caractères minimun 1 chiffre et 1 caractères spéciale"
    );
    password = null;
    progressBar.classList.add("progressRed");
  } else if (value.length < 12) {
    progressBar.classList.add("progressBlue");
    errorDisplay("password", "", true);
    password = value;
  } else {
    progressBar.classList.add("progressGreen");
    errorDisplay("password", "", true);
    password = value;
  }
  if (confirmPass) confirmChecker(confirmPass);
};

let confirmChecker = (value) => {
  if (value !== password) {
    errorDisplay("confirm", "les mots de passe ne correspondent pas");
    confirmPass = false;
  } else {
    errorDisplay("confirm", "", true);
    confirmPass = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pseudo && email && password && confirmPass) {
    const data = {
      pseudo,
      email,
      password,
    };
    console.log(data);

    inputs.forEach((input) => {
      input.value = "";
    });

    progressBar.classList = "";

    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("inscription validé !");
  } else {
    alert("veuillz remplir corectement les champs");
  }
});
