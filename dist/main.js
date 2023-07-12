(()=>{"use strict";const e=function(){return{board:function(){let e=function(){let e=new Map;for(let t=0;t<10;t++)for(let o=0;o<10;o++)e.set(JSON.stringify([t,o]),{attacked:!1,occupied:!1,ship:null});return e}(),t=new Map;return{coordinates:e,placeShip:function(o,i,c,n){let r=JSON.parse(i),s=JSON.parse(i),a=JSON.parse(i),l=function(e){return{hit:function(){this.hits++},isSunk:function(){return this.hits==this.length},length:e,hits:0}}(o);if(a[1]=l.length-1+r[1],a[0]=l.length-1+r[0],c&&a[1]<10){t.set(n,l),e.get(JSON.stringify(s)).occupied=!0,e.get(JSON.stringify(s)).name=n;for(let t=1;t<o;t++)s[1]++,e.get(JSON.stringify(s)).occupied=!0,e.get(JSON.stringify(s)).name=n}else if(!c&&a[0]<10){t.set(n,l),e.get(JSON.stringify(s)).occupied=!0,e.get(JSON.stringify(s)).name=n;for(let t=1;t<o;t++)s[0]++,e.get(JSON.stringify(s)).occupied=!0,e.get(JSON.stringify(s)).name=n}},shipCount:function(){return t.size},ships:t,receiveAttack:function(o){if(1==e.get(o).occupied&&0==e.get(o).attacked){e.get(o).attacked=!0;let i=e.get(o).name;t.get(i).hit(),t.get(i).isSunk()&&t.delete(i)}else 0==e.get(o).occupied&&0==e.get(o).attacked&&(e.get(o).attacked=!0)}}}(),attack:function(e,t){null!=e.coordinates.get(t)&&e.receiveAttack(t)},computerAI:function(){let e=[],t=Math.floor(10*Math.random()),o=Math.floor(10*Math.random());return e.push(t,o),JSON.stringify(e)}}},t=function(e,t){const i=document.getElementById(e);o(i,t)},o=function(e,t){for(let o=9;o>-1;o--){let i=document.createElement("div");i.setAttribute("class",`row-${o}`),i.style.height="10%",i.style.display="flex",0!==o&&(i.style.borderBottom="1px solid black"),e.append(i);for(let e=0;e<10;e++){let c=document.createElement("div");c.setAttribute("class",`x${e}-${o}`),c.classList.add(t),c.style.flexGrow="1",9!==e&&(c.style.borderRight="1px solid black"),i.append(c)}}},i=function(e,t){let o=e.target.className,i=o.split(" ");i=i.join("."),console.log(i);let c=`[${o.slice(1,2)},${o.slice(3,4)}]`;t.receiveAttack(c),console.log(t.coordinates.get(c).occupied),console.log(t),1==t.coordinates.get(c).occupied?document.querySelector(`.${i}`).classList.add("hit"):document.querySelector(`.${i}`).classList.add("miss")},c=e(),n=e();t("map-enemy","enemy"),t("map-user","player"),n.board.placeShip(5,"[0,5]",!0,"destoyer"),n.board.placeShip(5,"[1,5]",!0,"destoyer"),n.board.placeShip(5,"[2,5]",!0,"destoyer"),n.board.placeShip(5,"[3,5]",!0,"destoyer"),c.board.placeShip(5,"[0,5]",!0,"steve"),c.board.placeShip(5,"[1,5]",!0,"joe"),c.board.placeShip(5,"[2,5]",!0,"naur"),c.board.placeShip(5,"[3,5]",!0,"hmm"),c.board.placeShip(5,"[4,5]",!0,"destoyer"),function(e,t){for(let t=9;t>-1;t--)for(let o=0;o<10;o++)document.querySelector(`.x${t}-${o}.enemy`).addEventListener("click",(t=>{i(t,e)}))}(c.board),console.log(n.board),new MutationObserver((()=>{let e=c.computerAI();c.attack(n.board,e),function(e,t){let o=e.split(""),i=o[1];console.log(i);let c=o[3];const n=document.querySelector(`.x${i}-${c}.player`);1==t.coordinates.get(e).occupied?n.classList.add("hit"):n.classList.add("miss")}(e,n.board)})).observe(document.querySelector("#map-enemy > .row-9"),{subtree:!0,attributes:!0})})();