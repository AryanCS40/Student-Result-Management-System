// result.js
(() => {
  const container = document.getElementById('subjects-container');
  const addBtn = document.getElementById('add-subject');
  const clearBtn = document.getElementById('clear-subjects');

  function getNextIndex() {
    const rows = container.querySelectorAll('.subject-row');
    return rows.length; // next index
  }

  function createRow(index) {
    const row = document.createElement('div');
    row.className = 'grid grid-cols-1 md:grid-cols-4 gap-3 subject-row overflow-hidden';
    row.setAttribute('data-index', index);
    row.innerHTML = `
      <input type="text" name="subjects[${index}][name]" placeholder="Subject name" required class="px-4 py-2 rounded-lg" />
      <input type="text" name="subjects[${index}][code]" placeholder="Code" required class="px-4 py-2 rounded-lg" />
      <input type="number" name="subjects[${index}][maxMarks]" placeholder="Max marks" min="0"  required class="px-4 py-2 rounded-lg" />
      <div class="flex items-center gap-2">
        <input type="number" name="subjects[${index}][obtainedMarks]" placeholder="Obtained marks" min="0" required class="px-2 py-2 rounded-lg" />
        </div>
        <button type="button" class="remove-subject bg-red-600 text-white px-3 py-1 rounded-lg">Remove</button>
    `;
    return row;
  }

  addBtn.addEventListener('click', () => {
    const idx = getNextIndex();
    container.appendChild(createRow(idx));
  });

  clearBtn.addEventListener('click', () => {
    // remove all and add one empty row
    container.innerHTML = '';
    container.appendChild(createRow(0));
  });

  // delegate remove button clicks
  container.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('remove-subject')) {
      const row = e.target.closest('.subject-row');
      row.remove();
      reindexRows();
    }
  });

  function reindexRows() {
    const rows = container.querySelectorAll('.subject-row');
    rows.forEach((row, i) => {
      row.setAttribute('data-index', i);
      const inputs = row.querySelectorAll('input');
      inputs.forEach(input => {
        const name = input.getAttribute('name') || '';
        // replace first numeric index found between [ ] with new i
        const newName = name.replace(/subjects\[\d+\]/, `subjects[${i}]`);
        input.setAttribute('name', newName);
      });
    });
  }

  // ensure reindex before submit (just in case)
  const form = document.getElementById('add-result-form');
  form.addEventListener('submit', () => {
    reindexRows();
  });

})();
