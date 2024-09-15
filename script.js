const textBox = document.querySelector(".main-text-box");
const dadQuestion = document.querySelector("#js-question");
const dadAnswer = document.querySelector("#js-answer");
const reply = document.querySelector(".js-reply");
const button = document.querySelector("#js-reply-button");
const reset = document.querySelector(".reset");

dadQuestion.style.marginTop = "0.5rem";
reply.style.left = `${textBox.offsetWidth - reply.offsetWidth - 16}px`;

async function run() {
  dadAnswer.style.display = "none";
  reply.style.display = "none";

  async function generateJoke() {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const res = await fetch("https://icanhazdadjoke.com", config);

    const data = await res.json();

    return data.joke;
  }

  let joke = "";
  while (
    (!joke.includes("What") &&
      !joke.includes("How") &&
      !joke.includes("Why") &&
      !joke.includes("When") &&
      !joke.includes("Where")) ||
    !joke.includes("?")
  ) {
    joke = await generateJoke();
    console.log(joke);
  }
  joke = joke.split("?");
  dadQuestion.innerHTML = joke[0] + "?";

  button.addEventListener("click", async () => {
    dadAnswer.innerHTML = joke[1];
    reply.style.display = "block";

    setTimeout(() => {
      dadAnswer.style.display = "block";
    }, 1000);
  });
}

run();

reset.addEventListener("click", () => {
  run();
});
