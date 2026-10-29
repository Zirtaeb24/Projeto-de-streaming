(function(){
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id'));   // <-- FORÇA A SER NÚMERO
  const panel = document.getElementById('player-panel');
  const sidebar = document.getElementById('watch-sidebar');

  function findShow(id) {
    return window.VIKI_SHOWS.find(s => Number(s.id) === id) || window.VIKI_SHOWS[0];
  }

  const show = findShow(id);

  // Player
  panel.innerHTML = `
    <div style="margin-bottom:12px">
      <div style="font-weight:800;font-size:20px">${show.title}</div>
      <div style="color:var(--muted);margin-top:6px">${show.year} • ${show.lang}</div>
    </div>
    <div class="embed">
      <iframe src="https://www.youtube.com/embed/${show.youtube}?autoplay=0&rel=0" 
      allowfullscreen 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>
    <div style="margin-top:12px;color:var(--muted)">
      ${show.title} — reprodução via YouTube.
    </div>
  `;

  // Sidebar (mantém o mesmo)
})();
