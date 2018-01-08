class Picmark {

    constructor () {

        this.user = null;

    };

    static handleAuthenticationStateChange (oUser) {

        if (oUser) {

            // user is signed in
            var sDisplayName = oUser.displayName;
            var sEmail = oUser.email;
            var bEmailVerified = oUser.emailVerified;
            var oPhotoUrl = oUser.photoURL;
            var bIsAnonymous = oUser.isAnonymous;
            var sUid = oUser.uid;
            var oProviderData = oUser.providerData;

        } else {
            // user is signed out

        }
    };

    signIn (oEvent) {

        var oAuth = firebase.auth();

        oAuth.onAuthStateChanged(Picmark.handleAuthenticationStateChange);

        var oAuthenticationProvider = new firebase.auth.GoogleAuthProvider();

        oAuth.signInWithRedirect(oAuthenticationProvider);

        oAuth.getRedirectResult().then(function (oResult) {

            var oToken = oResult.credential.accessToken;
            var oUser = oResult.user;

        }).catch(function (oError) {

            var sErrorCode = oError.code;
            var sErrorMessage = oError.message;
            var sEmail = oError.email;
            var sCredential = oError.credential;

        });

    };

    imageFileSelected () {

        var oInputImageFile = document.getElementById('inputImageFile');

        var aImageFiles = oInputImageFile.files;
        var oImageFile;

        var oElementCanvasImage = document.getElementById('canvasImage');

        var oStorageRef = firebase.storage().ref();

        var fnPushFileToStorage = function (oImageFile, oUser) {

            var oCustomMetadata = {
                'maker': oUser.id
            };

            var oMetadata = {
                'contentType': oImageFile.type,
                'customMetadata': oCustomMetadata
            };

            // pushes file to storage at child path
            oStorageRef.child('images/' + oImageFile.name).put(oImageFile, oMetadata).then(function(oSnapshot) {

                var sUrl = oSnapshot.downloadURL;

                var oElementMessage = document.getElementById('elementMessage');
                oElementMessage.innerHTML = 'You successfully uploaded the file: \'' + oImageFile.name + '\' to: ' + sUrl;

            }).catch(function(oError) {

                var oElementMessage = document.getElementById('elementMessage');
                oElementMessage.innerHTML = 'The upload failed:  + oError + ';

            });
        };

        var fnDrawImageOnCanvas = function (oImageFile) {

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
        };

        if (aImageFiles.length === 1) {

            oImageFile = aImageFiles[0];

            var oUser = firebase.auth().currentUser;

            if (oUser) {

                fnDrawImageOnCanvas(oImageFile);
                fnPushFileToStorage(oImageFile, oUser);

            } else {

                var oElementMessage = document.getElementById('elementMessage');
                oElementMessage.innerHTML = 'You are not signed in. Did you click Sign in?';

            }

        }
    };

    static start () {

        var picmark = new Picmark();

        // var oElementMessage = document.getElementById('elementMessage');
        // oElementMessage.innerHTML = 'Welcome, ' + sDisplayName + '. You\'re signed in.';

        var prevX = -31;
        var prevY = -31;

        var oElementSignIn = document.getElementById('inputSignIn');
        oElementSignIn.addEventListener('click', picmark.signIn);

        var oElementImageFile = document.getElementById('inputImageFile');
        oElementImageFile.addEventListener('change', picmark.imageFileSelected);

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
};
