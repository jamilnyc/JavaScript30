const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  // Grab the suffix from the data attributes, if it exists
  const suffix = this.dataset.sizing || '';

  // Set the style property on the root document element
  // The name attribute has the name of the variable in the style sheet
  document.documentElement.style.setProperty(
    `--${this.name}`,
    `${this.value}${suffix}`
  );
}

inputs.forEach((input) => {
  // Change when a new value is selected
  input.addEventListener('change', handleUpdate);

  // Change when the user is just dragging it back and forth
  input.addEventListener('mousemove', handleUpdate);
});
