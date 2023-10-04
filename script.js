let canvas = document.getElementById("gsim").getContext('2d')
let truecanvas = document.getElementById("gsim")
const MSIZE = 4000
const G = 0.01
//kwadrat :)
drawRect = (x,y,c,c2,s) => {
    canvas.fillStyle = c
    canvas.fillRect(x+5,y+5,s,s)
    canvas.fillStyle = c2
    canvas.fillRect(x,y,s,s)
}
// kolko
drawCrc = (x,y,c,c2,s) => {
   canvas.beginPath()
   canvas.arc(x, y, s, 0, 2 * Math.PI, true)
   canvas.fillStyle = c
   canvas.fill()
   canvas.strokeStyle = c2
   canvas.lineWidth = 10
   canvas.stroke()

}
//linia
drawVec = (x, y, vx, vy) => {
    canvas.beginPath()
    canvas.moveTo(x, y)
    canvas.lineTo(x + vx, y + vy)
    canvas.strokeStyle = "white"
    canvas.stroke()
}
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
particles = []
particle = (x,y,c,c2,s,vx,vy) => { 
    return { x: x, y: y, vx: vx, vy: vy, ax: 0, ay: 0, color: c, color2: c2, size: s, m: Math.PI*s*s}
}
random = (min, max) => {
    return Math.round(Math.random()*max+min)
}
create = (count, color, color2, size, x, y, vx, vy) => {
    for (i=0; i<count; i++) {
        particles.push(particle(x, y, color, color2, size, vx, vy))
    }
}
updatePhysics = () => {
    for (let i=0; i < particles.length; i++) {
        let p = particles[i]
        let fx = 0
        let fy = 0
        for (let j=0; j<particles.length; j++) {
            let p2 = particles[j]
            if (i===j) {continue}
            //roznica x1, x2; y1, y2
            dx = (p2.x - p.x)
            dy = (p2.y - p.y)
            d = Math.sqrt(dx * dx + dy * dy) // odleglosc partikli
            f = G * (p.m * p2.m) / (d) // sila przyciagania sie
            // wektory sily
            fx += dx/d * f
            fy += dy/d * f
            // let momentum = Math.sqrt(Math.pow(fx,2) + Math.pow(fy,2));
            //     // kolizje
            // if (d <= p.size + p2.size)
            // {
                                //              J U T R O   D O K O N C Z E                //  
            // }
        }
        // rysowanie wektora sily
        // drawVec(p.x, p.y, fx, fy)  
        //przyspieszenie
        p.ax = fx / p.m
        p.ay = fy / p.m
        //predkosc
        p.vx += p.ax
        p.vy += p.ay
        //pozycja
        p.x += p.vx
        p.y += p.vy
        //odbicie od mapy
        if (p.x < 0 || p.x > MSIZE) {p.vx *= -0.5}
        if (p.y < 0 || p.y > MSIZE) {p.vy *= -0.5}
    }

}
//  - - -    partikle    - - -
let FillColor = document.getElementById("fc");
let OutlineColor = document.getElementById("oc");
let Size = document.getElementById("sz");
let MotionX = document.getElementById("mx");
let MotionY = document.getElementById("my");
let fc = "#aa3333";
let oc = "#ff0000";
let sz = 60;
let mx = 0;
let my = 0;

FillColor.addEventListener("input", (e) => {
    fc = e.target.value;
});
OutlineColor.addEventListener("input", (e) => {
    oc = e.target.value;
});
Size.addEventListener("input", (e) => {
    sz = e.target.value;
});
// MotionX.addEventListener("input", (e) => {
//     mx = e.target.value;
// });
// MotionY.addEventListener("input", (e) => {
//     my = e.target.value;
// });
truecanvas.onmousedown = (e) => {
    let rect = truecanvas.getBoundingClientRect();
    let scaleX = truecanvas.width / rect.width;
    let scaleY = truecanvas.height / rect.height;
    let mouseX = (e.clientX - rect.left) * scaleX;
    let mouseY = (e.clientY - rect.top) * scaleY;
    create(1, fc, oc, sz, mouseX, mouseY, mx, my)
}
// create(1, "#4ab8ff", "#3380b2", 60, 2000, 3000, 15, 0)
// create(1, "#ffb226", "#f48225", 60, 2000, 2000, 0, 0)
// create(1, "#1ff226", "#f48225", 60, 3000, 2000, -15, 0)
// - - - koniec partikli - - -
window.addEventListener("keydown", (event) => {
    if(event.key.toLowerCase() === 'r') {
        particles = [];
    }
    if(event.key.toLowerCase() === 'q') {
        window.close();
    }
})
update=()=>{
    // resetowanie canvas
    canvas.clearRect(0, 0, MSIZE, MSIZE)
    canvas.fillStyle = "black"
    canvas.fillRect(0, 0, MSIZE, MSIZE)
    updatePhysics() // script.js:45
    for (i=0; i<particles.length; i++) {
        drawCrc(particles[i].x, particles[i].y, particles[i].color, particles[i].color2, particles[i].size)
        // # Wektor ruchu
        // drawVec(particles[i].x, particles[i].y, particles[i].vx, particles[i].vy)
    }
    requestAnimationFrame(update)
}
update(); // :)