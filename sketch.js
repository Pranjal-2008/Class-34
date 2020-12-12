var ball;
var database, position;
function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballRef = database.ref('Ball/Position');
    ballRef.on("value",ReadPosition);

    database.ref('Ball/Position').on("value" , (da) => {
        position = da.val();
        ball.x = position.x;
        ball.y = position.y;
    })
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    if (keyDown("S")){
        changePosition(2,2);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('Ball/Position').update({
        x:ball.x + x,
        y: ball.y + y,
    });


}

function ReadPosition(da){
    position = da.val();
    ball.x = position.x;
    ball.y = position.y;
}
