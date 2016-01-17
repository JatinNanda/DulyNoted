function saveAsText() {
    var a = document.createElement("a");
    var file = new Blob([final_transcript], {type: "text/plain"});
    a.href = URL.createObjectURL(file);
    a.download = "textFile";
    a.click();
}
function saveAsMD() {
    var a = document.createElement("a");
    var file = new Blob([final_transcript], {type: "md"});
    a.href = URL.createObjectURL(file);
    a.download = "textFile";
    a.click();
}
