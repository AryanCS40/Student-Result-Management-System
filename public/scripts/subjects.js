(function () {
            const container = document.getElementById('subjects-container');
            const addBtn = document.getElementById('add-subject');
            const clearBtn = document.getElementById('clear-subjects');

            function updateIndexes() {
                const rows = container.querySelectorAll('.subject-row');
                rows.forEach((row, index) => {
                    const nameInput = row.querySelector('input[name$="[name]"]');
                    const codeInput = row.querySelector('input[name$="[code]"]');
                   
                    if (nameInput) nameInput.name = `subjects[${index}][name]`;
                    if (codeInput) codeInput.name = `subjects[${index}][code]`;
                   
                });
            }

            // Delegate remove button clicks
            container.addEventListener('click', function (e) {
                if (e.target && e.target.classList.contains('remove-subject')) {
                    const row = e.target.closest('.subject-row');
                    if (row) {
                        row.remove();
                        updateIndexes();
                    }
                }
            });

            addBtn.addEventListener('click', function () {
                const index = container.querySelectorAll('.subject-row').length;
                const row = document.createElement('div');
                row.className = 'grid grid-cols-1 md:grid-cols-3 gap-3 subject-row items-end';
                row.innerHTML = `
                    <input type="text" name="subjects[${index}][name]" placeholder="Subject name" class="px-4 py-2 rounded-lg bg-white bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700 font-medium" required>
                    <input type="text" name="subjects[${index}][code]" placeholder="Subject code" min="0" class="px-4 py-2 rounded-lg bg-white bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700 font-medium" required>                        
                        <button type="button" class="remove-subject bg-red-600 text-white font-semibold px-3 py-2 rounded-lg shadow hover:bg-red-700 transition">Remove</button>
                        
                        `;
                container.appendChild(row);
                updateIndexes();
                row.querySelector('input').focus();
            });

            clearBtn.addEventListener('click', function () {
                // keep one empty row
                container.innerHTML = '';
                const row = document.createElement('div');
                row.className = 'grid grid-cols-1 md:grid-cols-3 gap-3 subject-row items-end';
                row.innerHTML = `
                    <input type="text" name="subjects[0][name]" placeholder="Subject name" class="px-4 py-2 rounded-lg bg-white bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700 font-medium" required>
                    <input type="text" name="subjects[0][code]" placeholder="Subject code" min="0" class="px-4 py-2 rounded-lg bg-white bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700 font-medium" required>
                    
                        <button type="button" class="remove-subject bg-red-600 text-white font-semibold px-3 py-2 rounded-lg shadow hover:bg-red-700 transition">Remove</button>
                   
                `;
                container.appendChild(row);
            });

            // Optional: prevent accidental submit with empty subjects
            document.getElementById('add-subject-form').addEventListener('submit', function (e) {
                const rows = container.querySelectorAll('.subject-row');
                if (rows.length === 0) {
                    e.preventDefault();
                    alert('Please add at least one subject.');
                }
            });
        })();
