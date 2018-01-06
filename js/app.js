var imageFileSelected = function () {

    var oInputImageFile = document.getElementById('inputImageFile');

    var aImageFiles = oInputImageFile.files;
    var oImageFile;

    var oElementCanvasImage = document.getElementById('canvasImage');

    if (aImageFiles.length === 1) {

        oImageFile = aImageFiles[0];

        var oCanvasContext = oElementCanvasImage.getContext('2d');

        var oElementImg = document.getElementById('elementImage');
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
            oCanvasContext.drawImage(oElementImg, 0, 0);
        };

        oFileReader.readAsDataURL(oImageFile);
    }
};

var bodyLoaded = function () {

    var prevX = -31;
    var prevY = -31;

    var oElementCanvasImage = document.getElementById('canvasImage');

    var nElementLeft = oElementCanvasImage.offsetLeft;
    var nElementTop = oElementCanvasImage.offsetTop;

    oElementCanvasImage.addEventListener('click', function (event) {

        var x = event.pageX - nElementLeft;
        var y = event.pageY - nElementTop;
        var nRadius = 30;

        var oCanvasContext = oElementCanvasImage.getContext('2d');

        var oElementImg = document.getElementById('elementImage');

        oCanvasContext.drawImage(oElementImg, 0, 0);

        prevX = x;
        prevY = y;

        oCanvasContext.strokeStyle = 'red';
        oCanvasContext.beginPath();
        oCanvasContext.arc(x, y, nRadius, 0, 3 * Math.PI);
        oCanvasContext.stroke();

        var oButtonSubmit = document.getElementById('buttonSubmit');
        if (!oButtonSubmit) {
            oButtonSubmit = document.createElement('button');
            oButtonSubmit.id = 'buttonSubmit';
            oButtonSubmit.innerHTML = 'Submit your guess';
            document.body.insertBefore(oButtonSubmit, null);
        }
    });

};
