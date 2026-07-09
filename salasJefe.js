var bossRooms = [

    {
    id: 1,

    left: 0,
    top: 820,

    right: 1100,
    bottom: 1450,

    cameraX: 575,
    cameraY: 1125,

    bosses: [0],

    activated: false,
    consejoMostrado: false,
    
    doors: [
    {
        
        x: 620, 
        y: 1420, 
        width: 80, 
        height: 20,

        active: false,

        color: "#663300"
    },
    {
        
        x: 320, 
        y: 800, 
        width: 80, 
        height: 20,

        active: false,

        color: "#663300"
    }
    
    ]
    
    },

{
    id: 2,

    left: 850,
    top: 0,

    right: 2000,
    bottom: 580,

    cameraX: 1420,
    cameraY: 325,

    bosses: [1, 2],

    activated: false,

doors: [
    {

        x: 1400,
        y: 620,
        width: 100,
        height: 20,

        active: false,

        color: "#663300"

    }
    ]

}

];


function playerInsideBossRoom(room) {

    return (
        player.x >= room.left &&
        player.x <= room.right &&
        player.y >= room.top &&
        player.y <= room.bottom
    );

}

function iniciarSalaJefe(room) {
    console.log("Entró a iniciarSalaJefe", room.id);

    room.doors.forEach(door => {

        door.active = true;

    });

    currentBossRoom = room;
    
    if (
    room.id === 1 &&
    !room.consejoMostrado
) {

    room.consejoMostrado = true;

    mostrarConsejo("primeraSalaJefe");

}

    const jefeConDialogo = room.bosses
        .map(id => bosses.find(b => b.id === id))
        .find(b => b && b.dialogos && b.dialogos.length > 0);

if (jefeConDialogo) {

    npcPendiente = jefeConDialogo;

    if (
        room.id === 1 &&
        !consejos.primeraSalaJefe.visto
    ) {

        mostrarConsejo("primeraSalaJefe");

    } else {

        mostrarDialogo(jefeConDialogo);

    }

}

}


function quedanJefesActivos(room) {
    

    return room.bosses.some(id => {

        const boss = bosses.find(b => b.id === id);

        return boss && boss.hp > 0;

    });

}

function drawBossDoors() {

    bossRooms.forEach(room => {

        if (!room.doors) return;

        room.doors.forEach(door => {

            if (!door.active) return;

            if (!dentroDeVision(door)) return;

            context.fillStyle = door.color;

            context.fillRect(
                door.x - camera.x,
                door.y - camera.y,
                door.width,
                door.height
            );

        });

    });

}
