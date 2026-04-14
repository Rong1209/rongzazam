document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
});

document.addEventListener("keydown", function (e) {

    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.key.toLowerCase() === "u")
    ) {
        e.preventDefault();
        return false;
    }
});