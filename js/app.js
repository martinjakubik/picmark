var imageFileSelected = function () {

    var oInputImageFile = document.getElementById('inputImageFile');

    var aImageFiles = oInputImageFile.files;
    var oImageFile;

    var oElementCanvasImage = document.getElementById('canvasImage');

    if (aImageFiles.length === 1) {

        oImageFile = aImageFiles[0];

        var oCanvasContext = oElementCanvasImage.getContext('2d');

        var oElementImg = document.createElement('img');
        oElementImg.file = oImageFile;

        var oFileReader = new FileReader();

        // sets the image source to the image data once the data is loaded
        oFileReader.onload = (
            function (oImage) {
                return function (e) {
                    oImage.src = e.target.result;
                };
            }(oElementImg)
        );

        // draws the images once it's loaded
        oElementImg.onload = function () {
            oCanvasContext.drawImage(oElementImg, 0, 0, 200, 150);
        };

        oFileReader.readAsDataURL(oImageFile);
    }
};

var bodyLoaded = function () {

    var prevX = -1;
    var prevY = -1;

    var oElementCanvasImage = document.getElementById('canvasImage');

    var nElementLeft = oElementCanvasImage.offsetLeft;
    var nElementTop = oElementCanvasImage.offsetTop;

    oElementCanvasImage.addEventListener('click', function (event) {

        var x = event.pageX - nElementLeft;
        var y = event.pageY - nElementTop;
        var nRadius = 30;

        var oCanvasContext = oElementCanvasImage.getContext('2d');

        oCanvasContext.strokeStyle = 'white';
        oCanvasContext.beginPath();
        oCanvasContext.arc(prevX, prevY, nRadius, 0, 3 * Math.PI);
        oCanvasContext.stroke();

        prevX = x;
        prevY = y;

        oCanvasContext.strokeStyle = 'red';
        oCanvasContext.beginPath();
        oCanvasContext.arc(x, y, nRadius, 0, 3 * Math.PI);
        oCanvasContext.stroke();

        console.log('canvas clicked at: x = \'' + x + '\' y = \'' + y + '\'');
    });

};
