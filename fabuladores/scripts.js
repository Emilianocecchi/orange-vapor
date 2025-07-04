function startCountdown(endDate) {
  const countdownEl = document.getElementById('countdown');
  function update() {
    const now = new Date().getTime();
    const distance = endDate - now;
    if (distance < 0) {
      countdownEl.textContent = '00d 00h 00m 00s';
      clearInterval(interval);
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  update();
  const interval = setInterval(update, 1000);
}
// Countdown to 3 days from now
const target = new Date();
target.setDate(target.getDate() + 3);
startCountdown(target.getTime());
