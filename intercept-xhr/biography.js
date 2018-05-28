var page = require('webpage').create();
var system = require('system');

//Evaluate this function inside Chrome console (Ctrl+Shift+J) to enable Enter key in Web Inspector console:
//function isEnterKey(event) { return (event.keyCode !== 229 && event.keyIdentifier === "Enter") || event.keyCode === 13; }

page.onConsoleMessage = function(msg) {
    system.stdout.write(msg);
    phantom.exit();
};

page.open(system.args[1], function(status) {
    if (status !== 'success') {
        console.log('PhantomJS pageload failed.');
    } else {
        captureAjaxResponsesToConsole();
        page.evaluate(function () {
            document.getElementsByClassName('ui_qtext_more_link').item(0).click();
        });
    }
});

//modification of https://gist.github.com/gllist/3668037
function captureAjaxResponsesToConsole() {
    // logs ajax response contents to console so sublime's onConsoleMessage can use the contents
    // credit to Ionuț G. Stan
    // http://stackoverflow.com/questions/629671/how-can-i-intercept-xmlhttprequests-from-a-greasemonkey-script
    page.evaluate(function() {
        (function(open) {
            XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
                this.addEventListener("readystatechange", function() {
                    if (this.readyState === 4) {
                        if (this.responseText.includes('expanded_content')) {
                            document.write(JSON.parse(this.responseText)["value"]["html"]);
                            console.log(document.getElementsByClassName('ui_qtext_rendered_qtext').item(0).innerHTML);
                        }
                    }
                }, false);
                open.call(this, method, url, async, user, pass);
            };
        })(XMLHttpRequest.prototype.open);
        return 1;
    });
}

page.onError = function(msg, trace) {};