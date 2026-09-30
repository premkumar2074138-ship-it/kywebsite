const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const menuBtn=$("#menuBtn"),menu=$("#menu"),closeMenu=$("#closeMenu"),world=$("#world"),stage=$("#stage");
const panel=$("#placePanel"),back=$("#back"),guide=$("#guide"),toast=$("#toast"),splash=$("#splash");
let current="gate";

const data={
temple:{title:"Vishwanath Temple",events:false},
sb:{title:"Swatantrata Bhavan",events:true},
lt3:{title:"LT-3",events:true},
lt2:{title:"LT-2",events:true},
lt1:{title:"LT-1",events:true},
ee:{title:"Electrical Engineering",events:true},
cse:{title:"CSE Department",events:true},
sac:{title:"Student Activity Center (SAC)",events:true},
gym:{title:"Gymkhana Ground",events:true},
raj:{title:"Rajputana Ground",events:true},
adv:{title:"ADV Ground",events:true},
gate:{title:"Hyderabad Gate",events:false},
satish:{title:"Satish Dhawan Hostel",events:false},
arya:{title:"Aryabhatta Hostel",events:false},
limbdi:{title:"Limbdi Corner",events:false},
caf:{title:"IIT(BHU) Cafeteria",events:false}
};

const events={
sb:[["Debate Forum","Open debate rounds and student perspectives.","10:00 AM — 01:00 PM"],["Theatre Workshop","Movement, stagecraft and performance exercises.","02:00 PM — 05:00 PM"],["Literary Hour","Poetry, essays and spoken word.","04:00 PM — 07:00 PM"],["Case Challenge","Teams solve a live case study.","10:00 AM — 02:00 PM"],["Talk Series","Short talks from campus voices.","03:00 PM — 06:00 PM"],["Culture Night","Music, storytelling and cultural performances.","06:00 PM — 09:00 PM"],["Closing Circle","A final gathering before the last night.","05:00 PM — 07:00 PM"]],
lt3:[["Photography Walk","The campus becomes the subject of a visual hunt.","08:00 AM — 11:00 AM"],["Film Screening","Short films and visual stories after sunset.","06:00 PM — 09:00 PM"],["Design Jam","A timed challenge for visual thinkers.","11:00 AM — 02:00 PM"],["Panel Talk","Technology, culture and the people building both.","03:00 PM — 05:00 PM"],["Workshop Day","Hands-on sessions for curious makers.","10:00 AM — 04:00 PM"],["Open Studio","Student creators open their process.","12:00 PM — 06:00 PM"],["Spotlight","Selected works take the final stage.","06:00 PM — 08:00 PM"]],
lt2:[["Robotics Lab","Build, test, break and rebuild.","10:00 AM — 01:00 PM"],["Code Relay","A programming relay where every second counts.","02:00 PM — 05:00 PM"],["AI Showcase","Student projects take over the space.","11:00 AM — 03:00 PM"],["Gaming League","Competitive rounds and qualifiers.","04:00 PM — 08:00 PM"],["Innovation Pitch","Ideas move from notebook to stage.","11:00 AM — 02:00 PM"],["Cyber Hunt","A trail of logic, code and security clues.","03:00 PM — 07:00 PM"],["Demo Night","The strongest builds get their final spotlight.","05:00 PM — 08:00 PM"]],
lt1:[["Opening Session","The festival begins here with the first gathering of the week.","10:00 AM — 12:00 PM"],["Design Sprint","A timed creative challenge built around a surprise brief.","11:00 AM — 02:00 PM"],["Quiz Arena","Fast questions and a final campus showdown.","03:00 PM — 06:00 PM"],["Acoustic Evening","An intimate night of live music.","06:30 PM — 08:30 PM"],["Tech Talks","Short talks from students and invited speakers.","11:00 AM — 01:00 PM"],["Open Mic","Poetry, comedy, music and everything between.","05:00 PM — 08:00 PM"],["Grand Finale","The final showcase closes the chapter here.","06:00 PM — 09:00 PM"]],
ee:[["Circuit Sprint","Rapid circuit design and debugging.","10:00 AM — 01:00 PM"],["Drone Lab","Flight demonstrations and challenges.","02:00 PM — 05:00 PM"],["Power Talk","A student-led conversation about future energy.","11:00 AM — 01:00 PM"],["Electro Hunt","Solve clues hidden inside an electrical maze.","03:00 PM — 06:00 PM"],["Hardware Jam","Prototype a working hardware idea.","10:00 AM — 04:00 PM"],["Tech Trivia","Fast rounds of engineering trivia.","05:00 PM — 07:00 PM"],["Light Up","A visual finale built around light and sound.","07:00 PM — 09:00 PM"]],
cse:[["Code Rush","A timed programming challenge across multiple rounds.","09:00 AM — 12:00 PM"],["Bug Bash","Find it. Understand it. Fix it.","02:00 PM — 05:00 PM"],["AI Arena","A rapid-fire machine learning challenge.","10:00 AM — 01:00 PM"],["Hack Sprint","A focused mini-hackathon.","10:00 AM — 08:00 PM"],["Web Battle","Build an original web experience from a prompt.","11:00 AM — 03:00 PM"],["CP Duel","Head-to-head competitive programming rounds.","03:00 PM — 06:00 PM"],["Tech Showcase","The best student builds become the closing exhibit.","04:00 PM — 08:00 PM"]],
sac:[["Club Expo","Student clubs introduce themselves to the campus.","10:00 AM — 02:00 PM"],["Board Game Arena","Casual competitive board games.","02:00 PM — 06:00 PM"],["Creator Meet","Meet, collaborate and build.","11:00 AM — 03:00 PM"],["Treasure Hunt","The campus clue trail starts here.","03:00 PM — 07:00 PM"],["Art Corner","Interactive student art installations.","12:00 PM — 05:00 PM"],["Meme Night","A light-hearted campus culture session.","06:00 PM — 08:00 PM"],["Community Meet","Participating clubs meet one last time.","04:00 PM — 07:00 PM"]],
gym:[["Opening Parade","The festival officially spills into the open air.","05:00 PM — 07:00 PM"],["Football Challenge","Fast-paced inter-team matches.","07:00 AM — 11:00 AM"],["Athletics Meet","Track events and campus competitions.","08:00 AM — 01:00 PM"],["Battle of Bands","Live bands take over the ground.","06:00 PM — 09:00 PM"],["Sports Carnival","Open games and team challenges.","08:00 AM — 02:00 PM"],["DJ Evening","Music under the campus lights.","07:00 PM — 10:00 PM"],["Grand Celebration","The week closes here with everyone together.","06:00 PM — 10:00 PM"]],
raj:[["Cricket Cup","The festival cricket tournament begins.","07:00 AM — 12:00 PM"],["Relay Races","Fast team relay rounds.","04:00 PM — 06:00 PM"],["Football Cup","Knockout fixtures across the afternoon.","07:00 AM — 11:00 AM"],["Throwdown","Casual sports and challenge matches.","03:00 PM — 06:00 PM"],["Tug of War","Department versus department.","04:00 PM — 06:00 PM"],["Night Match","Floodlit sport after dark.","06:00 PM — 09:00 PM"],["Final Match","Tournament finals and awards.","05:00 PM — 08:00 PM"]],
adv:[["Fun Run","An open campus run for festival participants.","06:30 AM — 08:30 AM"],["Frisbee League","Quick outdoor team rounds.","04:00 PM — 06:00 PM"],["Open Sports","Casual games and challenges.","08:00 AM — 12:00 PM"],["Obstacle Run","A timed outdoor obstacle course.","03:00 PM — 06:00 PM"],["Volleyball","Inter-team volleyball matches.","04:00 PM — 07:00 PM"],["Outdoor Cinema","A film under the night sky.","07:00 PM — 09:30 PM"],["Sunset Session","Music and an informal festival gathering.","05:00 PM — 08:00 PM"]]
};

function flash(text){toast.textContent=text;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1200)}

$$(".marker").forEach(el=>{
  el.addEventListener("click",()=>openPlace(el));
});

function openPlace(el){
  const rect=el.getBoundingClientRect();
  splash.style.left=rect.left+rect.width/2+"px";
  splash.style.top=rect.top+rect.height/2+"px";
  splash.classList.remove("play");void splash.offsetWidth;splash.classList.add("play");

  current=el.dataset.id;
  const x=parseFloat(el.style.left),y=parseFloat(el.style.top);
  world.style.transform=`translate(${(50-x)*0.10}%,${(50-y)*0.10}%) scale(1.10)`;
  const item=data[current];
  $("#panelTitle").textContent=item.title;
  $("#panelKicker").textContent=item.events?"FESTIVAL LOCATION":"CAMPUS LANDMARK";
  $("#panelSub").textContent=item.events?"Seven days unfold from this place.":"A useful landmark for navigating the campus.";
  $("#routeTo").textContent=item.title.toUpperCase();
  $("#routeDistance").textContent=item.events?"FESTIVAL VENUE":"CAMPUS LANDMARK";
  $("#eventSwitch").style.display=item.events?"flex":"none";
  $("#eventDetail").style.display=item.events?"grid":"none";
  $("#noEvent").classList.toggle("show",!item.events);
  if(item.events){$$(".day").forEach((d,i)=>d.classList.toggle("active",i===0));showEvent(current,1)}
  setTimeout(()=>panel.classList.add("open"),380);
}
function showEvent(id,n){
  const e=events[id]?.[n-1];if(!e)return;
  $("#eventDay").textContent=`DAY ${String(n).padStart(2,"0")}`;
  $("#eventTitle").textContent=e[0];$("#eventText").textContent=e[1];$("#eventTime").textContent=e[2];
}
$$(".day").forEach(d=>d.addEventListener("click",()=>{$$(".day").forEach(x=>x.classList.remove("active"));d.classList.add("active");showEvent(current,+d.dataset.day)}));

back.addEventListener("click",()=>{panel.classList.remove("open");setTimeout(()=>{world.style.transform="translate(0,0) scale(1)"},300)});

menuBtn.addEventListener("click",()=>{menu.classList.toggle("open");menuBtn.classList.toggle("open")});
closeMenu.addEventListener("click",()=>{menu.classList.remove("open");menuBtn.classList.remove("open")});
$$(".menu button[data-open]").forEach(b=>b.addEventListener("click",()=>{
  menu.classList.remove("open");menuBtn.classList.remove("open");
  if(b.dataset.open==="guide")guide.classList.add("open");
  if(b.dataset.open==="events")document.querySelector(".gym").click();
}));
document.querySelector(".close-overlay").addEventListener("click",()=>guide.classList.remove("open"));

stage.addEventListener("mousemove",e=>{
  if(panel.classList.contains("open"))return;
  const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
  world.style.marginLeft=(-x*7)+"px";world.style.marginTop=(-y*4)+"px";
});
stage.addEventListener("mouseleave",()=>{if(!panel.classList.contains("open")){world.style.marginLeft="0";world.style.marginTop="0"}});

window.addEventListener("load",()=>setTimeout(()=>$("#preloader").style.display="none",2200));
