    const yearEl = document.getElementById('year');
    yearEl.textContent = new Date().getFullYear();

    // Sample data (thumbs from Unsplash, video demo from samplelib)
    const sampleVideo = '/(1) Title.mp4';
    const thumbs = {
      Haldi: '/DSC_4108.JPG',
      Mehendi: '/DSC_3474.webp',
      Sangeet: '/DSC_7682.webp',
      Baraat: '/DSC_8401.webp',
      Wedding: '/DSC_8401.webp',
     Highlight : '/DSC_5354.JPG'
    };

    const data = [
      { id: 1, event: 'Haldi', couple: 'Pragya ❤️ Navneet', caption: 'Haldi Highlights', src: sampleVideo },
      { id: 2, event: 'Mehendi', couple: 'Pragya ❤️ Navneet', caption: 'Mehendi Moments', src: sampleVideo },
      { id: 3, event: 'Sangeet', couple: 'Pragya ❤️ Navneet', caption: 'Dance Night', src: sampleVideo },
      { id: 4, event: 'Baraat', couple: 'Pragya ❤️ Navneet', caption: 'Grand Entry', src: sampleVideo },
      { id: 5, event: 'Wedding', couple: 'Pragya ❤️ Navneet', caption: 'Varmala & Pheras', src: sampleVideo },
      { id: 6, event: 'Highlight', couple: 'Pragya ❤️ Navneet', caption: 'Teasers', src: sampleVideo }
    ];

    const grid = document.getElementById('grid');
    const filters = document.getElementById('filters');
    const modal = document.getElementById('modal');
    const video = document.getElementById('video');
    const videoSrc = document.getElementById('videoSrc');
    const playlist = document.getElementById('playlist');
    const guestbook = document.getElementById('guestbook');
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('commentInput');

    const EVENTS = ['All','Haldi','Mehendi','Sangeet','Baraat','Wedding','Highlight'];
    let currentFilter = 'All';
    let activeVideoId = null;
    let comments = {}; // {videoId: [{name, text}]}

    renderGrid()

    function renderFilters(){
      filters.innerHTML = '';
      EVENTS.forEach(e => {
        const b = document.createElement('button');
        b.className = 'pill' + (currentFilter===e ? ' active' : '');
        b.textContent = e;
        b.onclick = () => { currentFilter = e; renderGrid(); };
        filters.appendChild(b);
      });
    }

    function renderGrid(){
      grid.innerHTML = '';
      const list = currentFilter==='All' ? data : data.filter(d=>d.event===currentFilter);
      list.forEach(d => {
        const card = document.createElement('div'); card.className='card';
        card.innerHTML = `
          <div class="thumb">
            <img src="${thumbs[d.event]}" alt="${d.event} thumbnail"/>
            <div class="play"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7-11-7z" fill="#fff"/></svg> Play</div>
          </div>
          <div class="meta">
            <div class="title">${d.couple}</div>
            <div class="caption">${d.event} • ${d.caption}</div>
          </div>`;
        card.onclick = ()=> openPlayer(d.id);
        grid.appendChild(card);
      });
    }

    function openPlayer(id){
      const vid = data.find(v=>v.id===id);
      if(!vid) return;
      activeVideoId = id;
      video.pause();
      videoSrc.src = vid.src;
      video.poster = thumbs[vid.event];
      video.load();
      renderPlaylist(id);
      renderComments();
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
    }

    function closePlayer(){
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      video.pause();
    }

    function renderPlaylist(activeId){
      playlist.innerHTML='';
      data.forEach(d=>{
        const el = document.createElement('div');
        el.className='item';
        el.innerHTML = `
          <div style="width:96px; height:64px; overflow:hidden; border-radius:10px"><img src="${thumbs[d.event]}" style="width:100%; height:100%; object-fit:cover" alt="${d.event}"/></div>
          <div>
            <div class="t">${d.event}</div>
            <div class="muted" style="font-size:12px">${d.caption}</div>
          </div>`;
        el.onclick = ()=> openPlayer(d.id);
        if(d.id===activeId){ el.style.background = '#faf7f2'; }
        playlist.appendChild(el);
      })
    }

    function renderComments(){
      guestbook.innerHTML='';
      const list = comments[activeVideoId] || [
        { name: 'AM', text: 'May your life together be filled with love and laughter! ❤️' },
        { name: 'DK', text: 'Beautiful moments, God bless you both.' }
      ];
      list.forEach(c=>{
        const row = document.createElement('div'); row.className='row';
        row.innerHTML = `
          <div class="avatar">${c.name}</div>
          <div class="bubble">${c.text}</div>`;
        guestbook.appendChild(row);
      })
    }

    document.getElementById('closeModal').onclick = closePlayer;
    modal.addEventListener('click', (e)=>{ if(e.target===modal) closePlayer(); });

    // Comment handling
    commentForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const text = commentInput.value.trim();
      if(!text) return;
      comments[activeVideoId] = comments[activeVideoId] || [];
      const initials = 'You';
      comments[activeVideoId].push({ name: initials, text });
      commentInput.value='';
      renderComments();
    });

    // Upload simulation
    const drop = document.getElementById('drop');
    const file = document.getElementById('file');
    const bar = document.getElementById('bar');
    const uploadMsg = document.getElementById('uploadMsg');
    const coupleName = document.getElementById('coupleName');
    const caption = document.getElementById('caption');
    const eventType = document.getElementById('eventType');

    ;['dragenter','dragover'].forEach(ev=> drop.addEventListener(ev, e=>{ e.preventDefault(); drop.classList.add('drag'); }));
    ;['dragleave','drop'].forEach(ev=> drop.addEventListener(ev, e=>{ e.preventDefault(); drop.classList.remove('drag'); }));

    drop.addEventListener('drop', (e)=>{
      const f = e.dataTransfer.files[0];
      if(f) handleFile(f);
    });
    file.addEventListener('change', (e)=>{
      const f = e.target.files[0];
      if(f) handleFile(f);
    });

    function handleFile(f){
      uploadMsg.textContent = `Uploading: ${f.name}`;
      simulateProgress(() => {
        const id = Date.now();
        const ev = eventType.value;
        const c = coupleName.value || 'New Couple';
        const cap = caption.value || 'New Upload';
        const src = URL.createObjectURL(f);
        data.unshift({ id, event: ev, couple: c, caption: cap, src });
        renderGrid();
        uploadMsg.textContent = 'Upload complete! 🎉 Added to your gallery.';
      });
    }

    function simulateProgress(done){
      bar.style.width = '0%';
      let p = 0;
      const t = setInterval(()=>{
        p += Math.random()*18 + 5; if(p>100) p=100;
        bar.style.width = p + '%';
        if(p>=100){ clearInterval(t); setTimeout(done, 300); }
      }, 220);
    }

    // Header CTAs
    document.getElementById('ctaWatch').onclick = ()=>{
      window.location.hash = '#gallery';
      const first = data[0];
      setTimeout(()=> openPlayer(first.id), 50);
    };
    document.getElementById('ctaUpload').onclick = ()=>{
      document.getElementById('file').click();
    };
    document.getElementById('primaryUploadTop').onclick = ()=>{
      window.location.hash = '#upload';
      document.getElementById('file').click();
    };

    // Init
    renderFilters();
    renderGrid();
  