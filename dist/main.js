(()=>{"use strict";const e=function(){return{board:function(){let e=function(){let e=new Map;for(let t=0;t<10;t++)for(let n=0;n<10;n++)e.set(JSON.stringify([t,n]),{attacked:!1,occupied:!1,ship:null});return e}(),t=new Map;return{coordinates:e,placeShip:function(n,o,s,i){let r=JSON.parse(o),c=JSON.parse(o),a=JSON.parse(o),l=function(e){return{hit:function(){this.hits++},isSunk:function(){return this.hits==this.length},length:e,hits:0}}(n);if(a[1]=l.length-1+r[1],a[0]=l.length-1+r[0],s&&a[1]<10){t.set(i,l),e.get(JSON.stringify(c)).occupied=!0,e.get(JSON.stringify(c)).name=i;for(let t=1;t<n;t++)c[1]++,e.get(JSON.stringify(c)).occupied=!0,e.get(JSON.stringify(c)).name=i}else if(!s&&a[0]<10){t.set(i,l),e.get(JSON.stringify(c)).occupied=!0,e.get(JSON.stringify(c)).name=i;for(let t=1;t<n;t++)c[0]++,e.get(JSON.stringify(c)).occupied=!0,e.get(JSON.stringify(c)).name=i}},shipCount:function(){return t.size},ships:t,receiveAttack:function(n){if(1==e.get(n).occupied&&0==e.get(n).attacked){e.get(n).attacked=!0;let o=e.get(n).name;t.get(o).hit(),t.get(o).isSunk()&&t.delete(o)}else 0==e.get(n).occupied&&0==e.get(n).attacked&&(e.get(n).attacked=!0)}}}(),attack:function(e,t){null!=e.coordinates.get(t)&&e.receiveAttack(t)},computerAI:function(){let e=[],t=Math.floor(10*Math.random()),n=Math.floor(10*Math.random());return e.push(t,n),JSON.stringify(e)}}},t=function(e,t){const o=document.getElementById(e);n(o,t)},n=function(e,t){for(let n=9;n>-1;n--){let o=document.createElement("div");o.setAttribute("class",`row-${n}`),o.style.height="10%",o.style.display="flex",0!==n&&(o.style.borderBottom="1px solid black"),e.append(o);for(let e=0;e<10;e++){let s=document.createElement("div");s.setAttribute("class",`x${e}-${n}`),s.classList.add(t),s.style.flexGrow="1",9!==e&&(s.style.borderRight="1px solid black"),o.append(s)}}},o=function(e,t,n){let o=e.target.className,s=o.split(" ");s=s.join("."),console.log(s);let i=`[${o.slice(1,2)},${o.slice(3,4)}]`;if(t.receiveAttack(i),console.log(t.coordinates.get(i).occupied),console.log(t),1==t.coordinates.get(i).occupied)document.querySelector(`.${s}`).classList.add("hit"),document.getElementById("message").innerText="Message: HIT",n.disconnect();else{for(let e=0;e<10;e++)n.observe(document.querySelector(`#map-enemy > .row-${e}`),{subtree:!0,attributes:!0});document.querySelector(`.${s}`).classList.add("miss"),document.getElementById("message").innerText="Message: MISS"}},s=e(),i=e();t("map-enemy","enemy"),t("map-user","player"),i.board.placeShip(5,"[0,5]",!0,"destoyer"),i.board.placeShip(5,"[1,5]",!0,"destoyer"),i.board.placeShip(5,"[2,5]",!0,"destoyer"),i.board.placeShip(5,"[3,5]",!0,"destoyer"),s.board.placeShip(5,"[0,5]",!0,"steve"),s.board.placeShip(5,"[1,5]",!0,"joe"),s.board.placeShip(5,"[2,5]",!0,"naur"),s.board.placeShip(5,"[3,5]",!0,"hmm"),s.board.placeShip(5,"[4,5]",!0,"destoyer");const r=new MutationObserver((()=>{let e=s.computerAI();s.attack(i.board,e),async function(e,t){function n(e){return new Promise((t=>setTimeout(t,e)))}document.querySelector(".blocker").style.display="block",await n(1500);let o=e.split(""),s=o[1];console.log(s);let i=o[3];const r=document.querySelector(`.x${s}-${i}.player`);document.getElementById("message").innerText="Message: Computer thinking...",await n(1e3),1==t.coordinates.get(e).occupied?(r.classList.add("hit"),document.getElementById("message").innerText="Message: Computer HIT"):(r.classList.add("miss"),document.getElementById("message").innerText="Message: Computer MISS"),document.querySelector(".blocker").style.display="none"}(e,i.board)}));for(let e=0;e<10;e++)r.observe(document.querySelector(`#map-enemy > .row-${e}`),{subtree:!0,attributes:!0});!function(e,t){for(let n=9;n>-1;n--)for(let s=0;s<10;s++)document.querySelector(`.x${n}-${s}.enemy`).addEventListener("click",(function n(s){o(s,e,t),this.removeEventListener("click",n)}))}(s.board,r)})();