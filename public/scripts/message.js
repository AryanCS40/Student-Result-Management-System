
setTimeout(() => {
    document.querySelectorAll('.flashMessage').forEach(msg => {
      msg.classList.add('opacity-0', 'transition-opacity', 'duration-700');
      setTimeout(() => msg.remove(), 700);
    });
  }, 2500);

  