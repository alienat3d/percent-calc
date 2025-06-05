const title = document.querySelector('h1');
const checkbox = document.querySelector('#checkbox');
const numberInput = document.querySelector('#number');
const percentInput = document.querySelector('#percent');
const output = document.querySelector('.output-box');
const inputs = [numberInput, percentInput];

const calcPercent = function () {
  return numberInput.value * (percentInput.value / 100);
};
const calcNumSubtractPercent = function () {
  return numberInput.value - calcPercent();
};
const roundToTwoAfterPoint = function (number) {
  return Math.round(number * 100) / 100;
};
const outputPercent = function () {
  if (numberInput === '' || numberInput === 0) return;
  output.textContent = roundToTwoAfterPoint(calcPercent());
};
const outputSubtraction = function () {
  if (numberInput === '' || numberInput === 0) return;
  output.textContent = roundToTwoAfterPoint(calcNumSubtractPercent());
};

function smoothAutoResize(input) {
  const hiddenDiv = document.createElement('div');
  hiddenDiv.classList.add('hidden-div');
  document.body.appendChild(hiddenDiv);

  function resize() {
    const styles = window.getComputedStyle(input);
    hiddenDiv.style.fontSize = styles.fontSize;
    hiddenDiv.style.fontFamily = styles.fontFamily;
    hiddenDiv.style.fontWeight = styles.fontWeight;
    hiddenDiv.style.letterSpacing = styles.letterSpacing;
    hiddenDiv.style.padding = styles.padding;

    hiddenDiv.textContent = input.value || input.placeholder || '';

    const width = hiddenDiv.offsetWidth;
    input.style.width = Math.max(100, Math.min(500, width + 17)) + 'px';
  }

  input.addEventListener('input', resize);
  input.addEventListener('focus', resize);

  resize();

  return function cleanup() {
    document.body.removeChild(hiddenDiv);
  };
}

inputs.forEach((input) => {
  checkbox.checked
    ? input.addEventListener('input', outputSubtraction)
    : input.addEventListener('input', outputPercent);
});

checkbox.addEventListener('change', () => {
  if (!checkbox.checked) {
    inputs.forEach((input) => {
      input.removeEventListener('input', outputSubtraction);
      input.addEventListener('input', outputPercent);
      title.textContent = 'Calculate the percentage of a number:';
      outputPercent();
    });
  } else {
    inputs.forEach((input) => {
      input.removeEventListener('input', outputPercent);
      input.addEventListener('input', outputSubtraction);
      title.textContent = 'Subtract a percentage from a number:';
      outputSubtraction();
    });
  }
});

numberInput.addEventListener('input', (evt) => {
  let value = evt.target.value;

  value = value.replace(/^0+/, '');

  evt.target.value = value;
});

percentInput.addEventListener('input', (evt) => {
  let value = evt.target.value;

  if (value < 1) {
    value = 1;
  } else if (value > 99) {
    value = 99;
  }

  evt.target.value = value;
});

smoothAutoResize(numberInput);
