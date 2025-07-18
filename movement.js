window.startEE = (audioCtx, audioBuffer, dogeSprites) => {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = true;
  source.connect(audioCtx.destination);
  source.start();

  const spawnDoge = () => {
    const img = document.createElement("img");
    img.className = "doge";
    img.src = dogeSprites[Math.floor(Math.random() * dogeSprites.length)];
    img.style.position = "absolute";
    img.style.width = "80px";
    img.style.height = "80px";
    img.style.pointerEvents = "none";
    img.style.zIndex = "9999";

    // Start at random position
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    const startX = Math.random() * maxWidth;
    const startY = Math.random() * maxHeight;
    img.style.left = `${startX}px`;
    img.style.top = `${startY}px`;

    // Random transform
    const scale = 0.5 + Math.random() * 1.5; // between 0.5x and 2x
    img.style.transform = `scale(${scale})`;

    document.body.appendChild(img);

    // Move to a random end point
    const endX = Math.random() * maxWidth;
    const endY = Math.random() * maxHeight;

    const duration = 2000 + Math.random() * 3000; // 2–5 seconds
    const start = performance.now();

    // Easing function: ease-in-out with sine
    const ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t);

    const animate = (now) => {
      const t = (now - start) / duration;
      if (t < 1) {
        const progress = ease(t);
        const x = startX + (endX - startX) * progress;
        const y = startY + (endY - startY) * progress;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        requestAnimationFrame(animate);
      } else {
        img.remove();
      }
    };

    requestAnimationFrame(animate);
  };

  const interval = setInterval(spawnDoge, 300 + Math.random() * 500); // 300–800ms

  source.onended = () => {
    clearInterval(interval);
    dogeSprites.forEach(URL.revokeObjectURL);
  };
};
