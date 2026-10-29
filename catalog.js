(function(){
  const grid = document.getElementById('catalog-grid');
  const search = document.getElementById('search');

  function render() {
    grid.innerHTML = '';
    const q = (search && search.value || '').toLowerCase();
    window.VIKI_SHOWS.forEach(s => {
      if (q && !s.title.toLowerCase().includes(q)) return;
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="thumb"><img src="${s.thumb}" alt="${s.title}" style="width:100%;height:100%;object-fit:cover"></div>
        <div class="body">
          <div class="title">${s.title}</div>
          <div class="meta">${s.year} • ${s.lang}</div>
          <div class="actions">
            <button class="play" data-id="${s.id}">Assistir</button>
            <button class="save" data-id="${s.id}">+ Lista</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
    attachHandlers();
  }

  function attachHandlers(){
    document.querySelectorAll('.card .play').forEach(btn=>{
      btn.addEventListener('click', (e)=> {
        const id = e.target.dataset.id;
        window.location = 'watch.html?id=' + encodeURIComponent(id);
      });
    });
    document.querySelectorAll('.card .save').forEach(btn=>{
      btn.addEventListener('click', (e)=> {
        const id = e.target.dataset.id;
        const list = JSON.parse(localStorage.getItem('viki_watchlist')||'[]');
        if(!list.includes(id)) list.push(id);
        localStorage.setItem('viki_watchlist', JSON.stringify(list));
        btn.textContent = 'Salvo';
        setTimeout(()=>btn.textContent = '+ Lista', 1200);
      });
    });
  }

  if (search) {
    search.addEventListener('input', render);
  }

  // initial render
  render();
})();
