var tooltip;
function movePopup(e) {
    if (tooltip == null || tooltip == 'undefined')
return;
var x = (e.clientX + 10);
var y = (e.clientY + 5);
var w = $(window).width();
var h = $(window).height();
    var popupHeight = tooltip.offsetHeight;
    var popupWidth = tooltip.offsetWidth;
if (x + popupWidth > w)
x = w - popupWidth - 1;
if (y + popupHeight > h)
y = h - popupHeight - 1;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}
function showPopup(e) {
    if (tooltip != null)
hidePopup();
    tooltip = document.getElementById(e.id + '-tooltip');
    if (tooltip != null)
    tooltip.style.display = 'block';
}
function hidePopup() {
    if (tooltip == null)
        return; tooltip.style.display = 'none';
    tooltip = null;
}
if (window.Event && document.captureEvents && Event.MOUSEMOVE)
document.captureEvents(Event.MOUSEMOVE);
document.onmousemove = movePopup;