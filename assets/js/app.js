
function toggleMenu(){
  const m=document.getElementById('mobileMenu');
  m.style.display = (m.style.display==='flex') ? 'none' : 'flex';
}
function goCalendly(e){
  e.preventDefault();
  const url = document.getElementById('calendlyLink').value || 'https://calendly.com/safemed/consult';
  window.location.href = url;
}
