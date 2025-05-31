function changeBackground() {
    const colors = ['#2c3e50', '#16a085', '#8e44ad', '#c0392b', '#f39c12'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}
