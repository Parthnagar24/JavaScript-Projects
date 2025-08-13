const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    const action = button.getAttribute('data-action');
    const func = button.getAttribute('data-func');

    if (action === 'clear') {
      display.value = '';
    } else if (action === 'delete') {
      display.value = display.value.slice(0, -1);
    } else if (action === 'calculate') {
      try {
        if (display.value.trim() !== '') {
          display.value = eval(display.value);
        }
      } catch {
        display.value = 'Error';
      }
    } else if (value) {
      display.value += value;
    } else if (func) {
      try {
        const input = parseFloat(display.value) || 0;
        let result;
        switch (func) {
          case 'sin':
            result = Math.sin(toRadians(input));
            break;
          case 'cos':
            result = Math.cos(toRadians(input));
            break;
          case 'tan':
            result = Math.tan(toRadians(input));
            break;
          case 'log':
            result = Math.log10(input);
            break;
          case 'sqrt':
            result = Math.sqrt(input);
            break;
          case 'square':
            result = input ** 2;
            break;
          case 'pi':
            result = Math.PI;
            break;
          case 'e':
            result = Math.E;
            break;
          default:
            result = 'Error';
        }
        display.value = result;
      } catch {
        display.value = 'Error';
      }
    }
  });
});

function toRadians(degree) {
  return degree * (Math.PI / 180);
}
