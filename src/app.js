import './app.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


var btn = document.querySelector('#btn');

btn.onclick = function () {
    var elemCopy = document.querySelector('#copy').innerHTML;
    var elemPast = document.querySelector('#past');

    elemPast.innerHTML += elemCopy;
};

