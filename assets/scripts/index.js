const signUp = document.querySelector("#signUp");
const signUpModal = document.querySelector("#signUpModal");
const modalContent = document.querySelector("#signUpModal .content");
const modalForm = document.querySelector("#modalForm");
const maxSymbols = 100;

signUp.addEventListener("click", () => {
    signUpModal.classList.add("show");
    setTimeout(() => {
        modalContent.style.display = "flex";
    }, 200);
});

signUpModal.addEventListener("click", (e) => {
    if (!e.target.closest(".content")) {
        signUpModal.classList.remove("show");
        modalContent.style = "";
    }
});

modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let dataIsValid = true;
    const { name, email, phone } = e.target.elements;
    const warningItemCyrillic = document.querySelector(
        ".data-only-cyrillic-warning"
    );
    const warningRequiredFields = document.querySelector(
        ".data-required-fields-warning"
    );
    const warningEmail = document.querySelector(
        ".data-email-not-valid-warning"
    );
    const warningPhone = document.querySelector(".data-phone-number-warning");

    if (!name.value || !email.value || !phone.value) {
        warningRequiredFields.classList.add("warn");
        !name.value ? (name.style.outline = "1px solid red") : null;
        !phone.value ? (phone.style.outline = "1px solid red") : null;
        !email.value ? (email.style.outline = "1px solid red") : null;
        dataIsValid = false;
    } else {
        [name, phone, email].forEach((item) => {
            const itemWarning = document.querySelector(
                `#${item.id} + .data-max-length-warning`
            );
            if (item.value.length > maxSymbols) {
                dataIsValid = false;
                itemWarning.classList.add("warn");
                item.style.outline = "1px solid red";
            } else {
                itemWarning.classList.remove("warn");
                item.style.outline = "";
            }
        });

        warningRequiredFields.classList.remove("warn");
        name.style.outline = "";
        phone.style.outline = "";
        email.style.outline = "";
    }

    if (/^$|[^а-я]/gi.test(name.value)) {
        warningItemCyrillic.classList.add("warn");
        name.style.outline = "1px solid red";
        dataIsValid = false;
    } else {
        warningItemCyrillic.classList.remove("warn");
        name.style.outline = "";
    }
    if (!/\+7\(\d{3}\)\d{3}\-\d{2}\-\d{2}/.test(phone.value)) {
        warningPhone.classList.add("warn");
        phone.style.outline = "1px solid red";
        dataIsValid = false;
    } else {
        warningPhone.classList.remove("warn");
        phone.style.outline = "";
    }

    if (
        !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            email.value.toLowerCase()
        )
    ) {
        warningEmail.classList.add("warn");
        email.style.outline = "1px solid red";
        dataIsValid = false;
    } else {
        warningEmail.classList.remove("warn");
        email.style.outline = "";
    }

    document
        .querySelector(".data-is-everything-valid")
        .classList.remove("show");

    if (!dataIsValid) {
        return;
    }

    const validateOnServer = async () => {
        try {
            const request = await fetch("../../app/validate.php", {
                method: "POST",
                body: new FormData(document.forms.modalForm),
            });
            const data = await request.json();
            const isAllValid = Object.values(data).every((item) => item);
            if (isAllValid) {
                document
                    .querySelector(".data-is-everything-valid")
                    .classList.add("show");
            }
        } catch (error) {
            alert("Произошла ошибка" + error);
        }
    };

    validateOnServer();
});

document.querySelectorAll(".form-input").forEach((item) => {
    item.addEventListener("keydown", (e) => {
        let target = e.target;
        let warningItem = document.querySelector(
            `#${target.id} + .data-max-length-warning`
        );

        if (target.value.length <= maxSymbols) {
            target.style = "";
            warningItem.classList.remove("warn");
        }

        if (e.target.id == "phone") {
            if (!(e.key == "Delete" || e.key == "Backspace")) {
                e.target.oninput = () => {
                    if (e.target.value == 7) {
                        e.target.value = `+7(7`;
                    } else {
                        let input = e.target.value
                            .replace(/\D/g, "")
                            .match(/(7?)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                        e.target.value = `+7(${input[2]}${
                            input[2].length == 3 ? ")" : ""
                        }${input[3]}${input[3].length == 3 ? "-" : ""}${
                            input[4]
                        }${input[4].length == 2 ? "-" : ""}${input[5]}`;
                    }
                };
            } else {
                e.target.oninput = null;
            }
        }
    });

    item.addEventListener("keypress", (e) => {
        let inputData = e.target.value;
        let warningItem = document.querySelector(
            `#${e.target.id} + .data-max-length-warning`
        );

        if (inputData.length >= maxSymbols) {
            e.preventDefault();
            e.target.style.outline = "1px solid red";
            warningItem.classList.add("warn");
        }
    });

    item.addEventListener("input", (e) => {
        let warningItem = document.querySelector(
            `#${e.target.id} + .data-max-length-warning`
        );
        if (e.target.value.length > maxSymbols) {
            warningItem.classList.add("warn");
            e.target.style.outline = "1px solid red";
        }
    });
});
