// This function will be eval'd and run by index.html
window.startDogeEasterEgg = (audioCtx, audioBuffer, dogeSprites) => {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = true; // ✅ Loop the audio!
  source.connect(audioCtx.destination);
  source.start();

  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;

  const spawnDoge = () => {
    const img = document.createElement("img");
    img.className = "doge";
    img.src = dogeSprites[Math.floor(Math.random() * dogeSprites.length)];
    img.style.position = "absolute";
    img.style.width = "80px";
    img.style.height = "80px";
    img.style.left = `${Math.random() * maxWidth}px`;
    img.style.top = `${Math.random() * maxHeight}px`;
    document.body.appendChild(img);

    const endX = maxWidth / 2;
    const endY = maxHeight / 2;
    const startX = parseFloat(img.style.left);
    const startY = parseFloat(img.style.top);

    const duration = 4000;
    const start = performance.now();

    const animate = (now) => {
      const t = (now - start) / duration;
      if (t < 1) {
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        requestAnimationFrame(animate);
      } else {
        img.remove();
      }
    };
    requestAnimationFrame(animate);
  };

  const interval = setInterval(spawnDoge, 500);

  source.onended = () => {
    clearInterval(interval);
    dogeSprites.forEach(URL.revokeObjectURL);
  };
};
