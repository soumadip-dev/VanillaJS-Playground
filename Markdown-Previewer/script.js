////////// DOM Elements
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const clearBtn = document.getElementById('clearBtn');

////////// Global variables
const defaultContent = `# Welcome!
## Start editing here...
- [ ] Task 1
- [x] Task 2`;

////////// Functions

// Function to Update preview in real-time
function updatePreview() {
  try {
    const markdown = editor.value;
    const html = marked.parse(markdown);
    preview.innerHTML = html;
    localStorage.setItem('markdownContent', editor.value);
  } catch (error) {
    console.error('Error rendering preview:', error);
    preview.innerHTML = `<p class="error">Something Went Wrong!</p>`;
  }
}

// Function to Handle clear everything
function handleClear() {
  if (confirm('Clear all content?')) {
    editor.value = '';
    preview.innerHTML = '';
    localStorage.removeItem('markdownContent');
  }
}

//////////// Event Listeners

document.addEventListener('DOMContentLoaded', () => {
  const savedContent = localStorage.getItem('markdownContent');

  editor.value = savedContent || defaultContent;
  updatePreview();

  editor.addEventListener('input', updatePreview);
  clearBtn.addEventListener('click', handleClear);
});
