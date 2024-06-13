document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("grid-size").addEventListener("input", function() {
        createGrid();
    });

    let isDrawing = false;
    let rainbowMode = false;

    let container = document.querySelector(".flex-container");
   
   
    function createGrid() {
        let gridSize = parseInt(document.getElementById("grid-size").value);
        
        container.innerHTML = '';  // Clear existing grid

        if (!gridSize || gridSize <= 0 || gridSize > 100) return;  // Exit if grid size is not valid

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let div = document.createElement("div");
                div.style.flex = `1 0 calc(100% / ${gridSize})`;
                div.style.height = `calc(100% / ${gridSize})`;
                div.addEventListener('mouseup', stopDrawing);
                div.addEventListener('mousedown', startDrawing);
                div.addEventListener('mousemove', draw);

                container.appendChild(div);

            }
        }
    }

    function getRandomColor(){
        var letters = '0123456789ABCDEF';
        color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
    }

    document.querySelector(".blackButton").addEventListener('click', function(){
        rainbowMode = false;
        color = '#000000';
    }
    );

    document.querySelector(".eraseButton").addEventListener('click', function(){
        rainbowMode = false;
        color = '#fff';
        
    }
    );

    document.querySelector(".rainbowButton").addEventListener('click', function(){
        rainbowMode = true;
    }
    );

    document.querySelector(".resetButton").addEventListener('click', function(){
        location.reload();
    });


    function startDrawing(x){
        isDrawing = true;
        
        x.target.style.backgroundColor = color;
        if (rainbowMode) {
            color = getRandomColor();
        }
    }

    function stopDrawing(){
        isDrawing = false;
    }


    function draw(e){
        if (isDrawing){
            e.target.style.backgroundColor = color;
        }
        if (isDrawing && rainbowMode){
            e.target.style.backgroundColor = getRandomColor();
        }
    }
    
    container.addEventListener('mousedown', (x) => x.preventDefault());
    container.addEventListener('mouseup', (x) => x.preventDefault());

});
